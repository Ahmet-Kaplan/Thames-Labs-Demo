Companies = new Mongo.Collection("companies");
Partitioner.partitionCollection(Companies);
Companies.initEasySearch('name', {
  limit: 50
});

Customers = new Mongo.Collection("customers");
Customers.helpers({
  users: function() {
    return Meteor.users.find({ group: this._id });
  }
})

Meteor.users.helpers({
  emailsToString: function() {
    return _.map(this.emails, 'address').join(', ');
  }
})
