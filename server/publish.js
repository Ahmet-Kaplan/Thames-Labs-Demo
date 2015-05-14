Meteor.publish("companies", function() {
  return Companies.find({});
});

Meteor.publish("contacts", function() {
  return Contacts.find({});
});

Meteor.publish("activities", function() {
  return Activities.find({});
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
      fields: {'group': true, 'username': true, 'emails': true, 'profile': true}
    });
  } else {
    // User not superadmin, do not publish
    this.ready();
  }

});
