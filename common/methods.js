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

  },

  generateDemoData: function(customerDoc) {

    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      return
    }

    Partitioner.bindGroup(customerDoc._id, function() {

      // generate fake customer data
      _.each(_.range(100), function() {
        var randomName = faker.company.companyName();
        Companies.insert({ 
          name: faker.company.companyName(),
          address: faker.address.streetAddress(),
          city: faker.address.city(),
          county: faker.address.county(),
          postcode: faker.address.zipCode(),
          country: faker.address.country(),
          website: 'http://' + faker.internet.domainName(),
          phone: faker.phone.phoneNumber()
        });
      });
    
    });

  },

  sendFeedback: function(doc) {
    check(doc, Schemas.Feedback);
    this.unblock();
    Email.send({
      to: 'jamie@cambridgesoftware.co.uk',
      from: 'admin@elitebms.net',
      subject: 'new user feedback',
      text: JSON.stringify(doc)
    });
  }

});
