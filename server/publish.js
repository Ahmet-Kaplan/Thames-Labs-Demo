Meteor.publish("companies", function() {
  return Companies.find({});
});

Meteor.publish("customers", function() {
  
  if (Roles.userIsInRole(this.userId, ['superadmin'])) {
    return Customers.find({});
  } else {
    // User not superadmin, do not publish
    this.stop();
    return;
  }

});
