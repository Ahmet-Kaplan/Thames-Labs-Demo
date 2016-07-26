Meteor.methods({
  'customFields.getGlobalsByTenantEntity': function(tenantId, entityType) {
    var res = CustomFields.find({
      entityId: tenantId,
      target: entityType,
      global: true
    }).fetch();
    return res;
  },
  'customFields.create': function(cfName, cfValue, cfType, maxValue, entityType, entityId) {
    var newId = CustomFields.insert({
      name: cfName,
      value: cfValue,
      defaultValue: '',
      type: cfType,
      global: false,
      order: maxValue + 1,
      target: entityType,
      listValues: '',
      entityId: entityId
    });
    return newId;
  },
  "extInfo.deleteLocal": function(id) {
    CustomFields.remove({
      _id: id
    });
  },
  "extInfo.getTenantGlobals": function(collectionType) {
    var user = Meteor.users.findOne({
      _id: this.userId
    });
    if (!user) return [];

    var data = [];

    Partitioner.bindGroup(user.group, function() {
      data = CustomFields.find({
        target: collectionType,
        global: true
      }).fetch();
    });

    return _.uniqBy(data, 'name');
  },
  "extInfo.deleteGlobal": function(self) {
    if (!Roles.userIsInRole(this.userId, ['Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may delete global fields.');
    }

    var user = Meteor.users.findOne({
      _id: this.userId
    });
    if (user) {
      Partitioner.bindGroup(user.group, function() {
        CustomFields.remove({
          target: self.target,
          name: self.name
        });
      });
    }
  },
  "extInfo.addNewGlobal": function(cfName, cfType, cfValue, cfEntity, userId) {
    if (!Roles.userIsInRole(this.userId, ['Administrator'])) {
      return 1;
    }

    var user = Meteor.users.findOne(this.userId);
    var duplicateFlag = false;

    if (user) {
      Partitioner.bindGroup(user.group, function() {

        var exData = CustomFields.find({
          target: cfEntity
        }).fetch();
        var maxValue = -1;
        _.each(exData, function(x) {
          if (x.order > maxValue) maxValue = x.order;
        });

        var targets = [];
        if (cfEntity === 'company') {
          targets = Companies.find({}).fetch();
        } else if (cfEntity === 'contact') {
          targets = Contacts.find({}).fetch();
        } else if (cfEntity === 'project') {
          targets = Projects.find({}).fetch();
        } else if (cfEntity === 'product') {
          targets = Products.find({}).fetch();
        }

        if (CustomFields.findOne({
          name: cfName,
          target: cfEntity
        })) {
          duplicateFlag = true;
        }

        if (duplicateFlag === false) {
          CustomFields.insert({
            name: cfName,
            value: cfValue,
            defaultValue: (cfType === 'picklist' ? '' : cfValue),
            type: cfType,
            global: true,
            order: maxValue + 1,
            target: cfEntity,
            listValues: (cfType !== 'picklist' ? '' : cfValue),
            entityId: user.group
          });

          var totalCount = targets.length;

          _.each(targets, function(ox, iter) {

            var percDone = (( iter / totalCount) * 100).toFixed(2);
            UserSession.set("globalFieldProgress", percDone, userId);

            CustomFields.insert({
              name: cfName,
              value: cfValue,
              defaultValue: (cfType === 'picklist' ? '' : cfValue),
              type: cfType,
              global: true,
              order: maxValue + 1,
              target: cfEntity,
              listValues: (cfType !== 'picklist' ? '' : cfValue),
              entityId: ox._id
            });
          });
        }
      });

      if (duplicateFlag === true) return 2;

      return 0;
    }

    return 3;
  },
  changeExtInfoOrder: function(extInfoObj, direction) {
    if (!Roles.userIsInRole(this.userId, ['Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may edit global fields.');
    }

    var value = (direction === "up" ? -1 : 1);
    var user = Meteor.users.findOne({
      _id: this.userId
    });

    if (!user) {
      return {
        exitCode: 1,
        exitStatus: "Failure: no user."
      };
    }

    var data = [];

    Partitioner.bindGroup(user.group, function() {
      data = CustomFields.find({
        entityId: extInfoObj.entityId,
        target: extInfoObj.target,
        global: true
      }).fetch();
    });

    var currentOrder = _.uniqBy(data, 'name');
    currentOrder = currentOrder.sort(function(a, b) {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });

    var index = -1;
    _.each(currentOrder, function(co, i) {
      if (extInfoObj._id === co._id) index = i;
    });
    var recToMove = currentOrder[index];
    var switchA = recToMove.order + value;
    CustomFields.update({
      _id: recToMove._id
    }, {
      $set: {
        order: switchA
      }
    });

    _.each(currentOrder, function(co, i) {
      if (extInfoObj._id !== co._id) {
        if (co.order === switchA) {
          var switchB = co.order - value;
          CustomFields.update({
            _id: co._id
          }, {
            $set: {
              order: switchB
            }
          });
        }
      }
    });

    var updatedOrder = [];
    Partitioner.bindGroup(user.group, function() {
      updatedOrder = CustomFields.find({
        entityId: extInfoObj.entityId,
        target: extInfoObj.target,
        global: true
      }).fetch().sort(function(a, b) {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
      });

      _.each(updatedOrder, function(field, i) {
        CustomFields.update({
          target: field.target,
          global: true,
          name: field.name
        }, {
          $set: {
            order: i
          }
        }, {
          multi: true
        });
      });
    });

    return {
      exitCode: 0,
      exitStatus: "Success."
    };
  }
});
