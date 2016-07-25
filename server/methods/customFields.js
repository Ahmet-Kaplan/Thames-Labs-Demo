Meteor.methods({
  'customFields.getGlobalsByTenantEntity': function(tenantId, entityType) {
    const res = CustomFields.find({
      entityId: tenantId,
      target: entityType,
      global: true
    }).fetch();
    return res;
  },
  'customFields.create': function(cfName, cfValue, cfType, maxValue, entityType, entityId) {
    const newId = CustomFields.insert({
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
  'customFields.deleteLocal': function(id) {
    CustomFields.remove({
      _id: id
    });
  },
  'customFields.deleteGlobal': function(self) {
    if (!Roles.userIsInRole(this.userId, ['Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may delete global fields.');
    }

    const user = Meteor.users.findOne({
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
  'customFields.addNewGlobal': function(cfName, cfType, cfValue, cfEntity, maxValue, userId) {
    if (!Roles.userIsInRole(this.userId, ['Administrator'])) {
      return 1;
    }

    const user = Meteor.users.findOne(this.userId);

    if (user) {
      Partitioner.bindGroup(user.group, function() {

        let targets = [];
        if (cfEntity === 'company') {
          targets = Companies.find({}).fetch();
        } else if (cfEntity === 'contact') {
          targets = Contacts.find({}).fetch();
        } else if (cfEntity === 'project') {
          targets = Projects.find({}).fetch();
        } else if (cfEntity === 'product') {
          targets = Products.find({}).fetch();
        }

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

        const totalCount = targets.length;

        _.each(targets, function(ox, iter) {

          const percDone = (( iter / totalCount) * 100).toFixed(2);
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
      });

      return 0;
    }

    return 2;
  },
  'customFields.changeOrder': function(fieldId, fieldTarget, newIndex, group) {

    const fields = CustomFields.find({
            target: fieldTarget,
            global: true,
            entityId: group
          }, {
            sort: { order: 1 }
          }).fetch(),
          currentField = _.find(fields, { '_id': fieldId }),
          currentIndex = _.findIndex(fields, { '_id': currentField._id });

    _.pullAt(fields, currentIndex);
    fields.splice(newIndex, 0, currentField);

    _.each(fields, function(value, key) {
      value.order = key;
    });

    _.each(fields, function(value, key) {
      CustomFields.update({
        name: value.name,
        target: value.target
      }, {
        $set: {
          order: value.order
        }
      }, {
        multi: true
      });
    });
  }
});
