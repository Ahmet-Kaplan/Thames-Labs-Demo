Meteor.publish("companies", function() {
  return Companies.find({});
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
      fields: {'group': 1, 'username': 1, 'emails': 1}
    });
  } else {
    // User not superadmin, do not publish
    this.ready();
  }

});
