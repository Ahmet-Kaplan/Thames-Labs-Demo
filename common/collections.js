Meteor.users.helpers({
  emailsToString: function() {
    return _.map(this.emails, 'address').join(', ');
  }
});

Companies = new Mongo.Collection("companies");
Partitioner.partitionCollection(Companies);
Companies.helpers({
  contacts: function() {
    return Contacts.find({ companyId: this._id });
  }
})
Companies.initEasySearch('name', {
  limit: 50
});

Customers = new Mongo.Collection("customers");
Customers.helpers({
  users: function() {
    return Meteor.users.find({ group: this._id });
  }
});

Contacts = new Mongo.Collection("contacts");
Partitioner.partitionCollection(Contacts);
Contacts.helpers({
  name: function() {
    return [this.title, this.forename, this.surname].join(' ');
  },
  company: function() {
    return Companies.findOne(this.companyId);
  }
});

Activities = new Mongo.Collection("activities");
Partitioner.partitionCollection(Activities);
Activities.helpers({
  company: function() {
    return Companies.findOne(this.companyId);
  },

})
