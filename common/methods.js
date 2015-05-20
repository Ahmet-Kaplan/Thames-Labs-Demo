Meteor.methods({

  addRandomCompany: function() {
    Companies.insert({
      name: faker.company.companyName()
    });
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
        var usersArray = Meteor.users.find({}).fetch();
        var randomIndex = Math.floor( Math.random() * usersArray.length );
        var randomUser = usersArray[randomIndex];

        var randomName = faker.company.companyName();
        var companyId = Companies.insert({
          name: faker.company.companyName(),
          address: faker.address.streetAddress(),
          city: faker.address.city(),
          county: faker.address.county(),
          postcode: faker.address.zipCode(),
          country: faker.address.country(),
          website: 'http://' + faker.internet.domainName(),
          phone: faker.phone.phoneNumber(),
          createdBy: randomUser._id
        });

        contacts = [];

        _.each(_.range(_.random(1, 10)), function() {
          var contactId = Contacts.insert({
            title: _.sample(Schemas.Contact._schema.title.allowedValues),
            forename: faker.name.firstName(),
            surname: faker.name.lastName(),
            phone: faker.phone.phoneNumber(),
            mobile: faker.phone.phoneNumber(),
            companyId: companyId,
            createdBy: randomUser._id
          });

          contacts.push(contactId);

          _.each(_.range(_.random(0, 2)), function() {
            var activityId = Activities.insert({
              type: _.sample(Schemas.Activity._schema.type.allowedValues),
              notes: faker.lorem.paragraphs(_.random(1, 3)),
              createdAt: faker.date.recent(100),
              companyId: companyId,
              contactId: contactId,
              createdBy: randomUser._id
            });
          });
        });

        _.each(_.range(_.random(0, 2)), function() {
          var array = Meteor.users.find({}).fetch();
          var randomIndex = Math.floor( Math.random() * array.length );
          var element = array[randomIndex];

          var projectId = Projects.insert({
            description: faker.lorem.sentence(),
            companyId: companyId,
            contactId: contacts[Math.floor(Math.random()*contacts.length)],
            userId: randomUser._id,
            status:  _.sample(Schemas.Project._schema.status.allowedValues),
            value: _.random(100, 3000),
            probability:  _.random(0, 100),
            lastActionDate: faker.date.past(100),
            nextActionBy: element._id,
            createdBy: randomUser._id
          });
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
