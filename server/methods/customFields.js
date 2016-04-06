Meteor.methods({
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
  }
});