Meteor.methods({
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
        target: collectionType
      }).fetch();
    });

    return _.uniq(data, 'name');
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
  "extInfo.addNewGlobal": function(cfName, cfType, cfValue, cfEntity) {
    if (!Roles.userIsInRole(this.userId, ['Administrator'])) {
      return 1;
    }

    var user = Meteor.users.findOne(this.userId);

    if (user) {
      Partitioner.bindGroup(user.group, function() {
        var collectionName = '';

        var exData = CustomFields.find({
          target: collectionType
        }).fetch();
        var maxValue = _.max(_.map(exData, function(r) {
          return r.dataOrder;
        }))

        if (cfEntity === 'company') {
          collectionName === 'companies';
        } else if (cfEntity === 'contact') {
          collectionName === 'contacts';
        } else if (cfEntity === 'project') {
          collectionName === 'projects';
        } else if (cfEntity === 'product') {
          collectionName === 'products';
        }

        _.each(Collections[collectionName].find({}).fetch(), function(ox) {
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
      });

    }

    return 0;
  },
  changeExtInfoOrder: function(type, name, direction) {
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

    var currentOrder = Tenants.findOne({
      _id: user.group
    }).settings.extInfo[type].sort(function(a, b) {
      if (a.dataOrder < b.dataOrder) return -1;
      if (a.dataOrder > b.dataOrder) return 1;
      return 0;
    });

    var index = -1;
    _.each(currentOrder, function(co, i) {
      if (co.name === name) index = i;
    });
    var GaiaRecord = currentOrder[index];

    GaiaRecord.dataOrder = GaiaRecord.dataOrder + value;
    if (GaiaRecord.dataOrder < 0 || GaiaRecord.dataOrder > currentOrder.length - 1) {
      return {
        exitCode: 2,
        exitStatus: "Failure: beyond bounds."
      };
    }

    _.each(currentOrder, function(co, i) {
      if (co.name !== name) {
        if (co.dataOrder === GaiaRecord.dataOrder) {
          co.dataOrder = co.dataOrder - value;
        }
      }
    });
    if (type === 'company') {
      Tenants.update({
        _id: user.group
      }, {
        $set: {
          'settings.extInfo.company': currentOrder
        }
      });
    }
    if (type === 'contact') {
      Tenants.update({
        _id: user.group
      }, {
        $set: {
          'settings.extInfo.contact': currentOrder
        }
      });
    }
    if (type === 'project') {
      Tenants.update({
        _id: user.group
      }, {
        $set: {
          'settings.extInfo.project': currentOrder
        }
      });
    }
    if (type === 'product') {
      Tenants.update({
        _id: user.group
      }, {
        $set: {
          'settings.extInfo.product': currentOrder
        }
      });
    }

    return {
      exitCode: 0,
      exitStatus: "Success."
    };
  }
});