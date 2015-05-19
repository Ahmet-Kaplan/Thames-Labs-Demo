Meteor.publish("companies", function() {
  return Companies.find({});
});

Meteor.publish("companyById", function(companyId) {
  return Companies.find({
    _id: companyId
  });
});

Meteor.publish("contacts", function() {
  return Contacts.find({});
});

Meteor.publish("contactById", function(contactId) {
  return Contacts.find({
    _id: contactId
  });
});

Meteor.publish("contactByCompanyId", function(companyId) {
  return Contacts.find({
    companyId: companyId
  });
});

Meteor.publish("activities", function() {
  return Activities.find({});
});

Meteor.publish("activityByContactId", function(contactId) {
  return Activities.find({
    contactId: contactId
  });
});

Meteor.publish("activityByCompanyId", function(companyId) {
  return Activities.find({
    companyId: companyId
  });
});

Meteor.publish("customers", function() {

  if (Roles.userIsInRole(this.userId, ['superadmin'])) {
    return Customers.find({});
  } else {
    // User not superadmin, do not publish
    this.ready();
  }

});

Meteor.publish("userData", function() {

  if (Roles.userIsInRole(this.userId, ['superadmin'])) {
    return Meteor.users.find({}, {
      fields: {
        'group': true,
        'username': true,
        'emails': true,
        'profile': true
      }
    });
  } else {
    // User not superadmin, do not publish
    this.ready();
  }

});
