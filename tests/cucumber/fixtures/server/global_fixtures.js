Meteor.methods({
  'reset': function() {
    ServerSession.set('maintenance', false);
    Partitioner.directOperation(function() {
      Tasks.remove({});
      Companies.remove({});
      Meteor.tags.remove({});
      Products.remove({});
      Contacts.remove({});
    });

    Meteor.users.remove({
      emails: {
        $elemMatch: {
          address: "test3@domain.com"
        }
      }
    });
    Tenants.remove({
      name: "Company Name"
    });
  },
  'getUserByEmail': function(email) {
    return Meteor.users.findOne({
      emails: {
        $elemMatch: {
          address: email
        }
      }
    });
  },
  'createTestCompany': function() {
    var data = "";
    Companies.insert({
      name: 'test company',
      address: 'test address',
      city: 'test city',
      country: 'test country',
      postcode: 'test postcode',
      website: 'http://www.test-company.test',
      createdBy: Meteor.userId()
    }, function(err, id) {
      if (err) {
        data = err;
      } else {
        data = id;
      }
    });
    return data;
  },
  'createTestContact': function() {
    var data = "";
    Contacts.insert({
      title: 'Dr',
      forename: 'test forename',
      surname: 'test surname',
      address: 'Cowley Road',
      city: 'Cambridge',
      postcode: 'CB4 0WS',
      country: 'England',
      createdBy: Meteor.userId()
    }, function(err, id) {
      if (err) {
        data = err;
      } else {
        data = id;
      }
    });
    return data;
  },
  'createTestCustomField': function() {
    var cfName = 'velocity';
    var cfValue = 'cucumber';
    var cfType = 'text';
    var cfMaster = {};
    var company = Companies.findOne({
      name: 'test company'
    });

    var settings = {
      "dataValue": cfValue,
      "dataType": cfType
    }

    cfMaster[cfName] = settings;

    Companies.update(company._id, {
      $set: {
        customFields: cfMaster
      }
    });
  },
  'createTestProduct': function() {
    var data = "";
    Products.remove({});
    Products.insert({
      name: 'test product',
      description: 'test description',
      createdBy: Meteor.userId()
    }, function(err, id) {
      if (err) {
        data = err;
      } else {
        data = id;
      }
    });
    return data;
  },
  'getProductByName': function(name) {
    return Products.findOne({
      name: name
    });
  },
  'createTestOpportunityStages': function(stage) {
    var data = "";
    OpportunityStages.remove({});
    OpportunityStages.insert({
      title: 'Stage 1',
      description: 'test description',
      order: 0
    });
    OpportunityStages.insert({
      title: 'Stage 2',
      description: 'test description',
      order: 1
    }, function(err, id) {
      if (err) {
        data = err;
      } else {
        data = id;
      }
    });
    return data;
  },
  'createTestOpportunity': function() {
    var stage = OpportunityStages.findOne({order: 0});
    var data = "";
    var date = new Date();
    var companyId = Companies.findOne({})._id;
    Opportunities.remove({});
    Opportunities.insert({
      name: 'test opportunity',
      description: 'test description',
      date: date,
      currentStageId: stage._id,
      companyId: companyId,
      createdBy: Meteor.userId()
    }, function(err, id) {
      if (err) {
        data = err;
      } else {
        data = id;
      }
    });
    return data;
  },
  'getOpportunityByName': function(name) {
    return Opportunities.findOne({name: name});
  },
});

Meteor.startup(function() {
  Meteor.users.remove({});

  var userId = Accounts.createUser({
    username: "test user",
    email: "test@domain.com",
    password: "goodpassword",
    profile: {
      name: "test user"
    }
  });

  // Important! Otherwise subs manager fails to load things and you get a lot of "loading..." screens
  Partitioner.setUserGroup(userId, 'tenant 1');

  var userId2 = Accounts.createUser({
    username: "test user 2",
    email: "test2@domain.com",
    password: "goodpassword",
    profile: {
      name: "test user 2"
    }
  });
  Partitioner.setUserGroup(userId2, 'tenant 2');

  var superadminId = Accounts.createUser({
    username: 'superadmin',
    email: 'admin@cambridgesoftware.co.uk',
    password: 'admin',
    profile: {
      name: 'superadmin'
    },
    admin: true
  });
  Roles.addUsersToRoles(superadminId, 'superadmin');

});
