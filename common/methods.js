Meteor.methods({

  addRandomCompany: function() {
    Companies.insert({ name: faker.company.companyName() });
  },

  addUser: function(doc) {

    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      return
    }

    // Important - do server side schema check
    check(doc, Schemas.User);
    // Create user account
    var userId = Accounts.createUser({
      email: doc.email,
      password: doc.password,
      profile: {
        name: doc.name
      }
    });
    // Add user to a group (partition) based on customer id
    if (doc.group) {
      Partitioner.setUserGroup(userId, doc.group);
    }

  }

});
