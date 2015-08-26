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
  'checkUserHasPermission': function(username, permissionName) {
    var user = Meteor.users.findOne({
      username: username
    });
    return Roles.userIsInRole(user, permissionName)
    /*if (Roles.userIsInRole(user, permissionName)) {
      return true;
    } else {
      return false;
    }*/
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
    var id = Companies.insert({
      name: 'test company',
      address: 'test address',
      city: 'test city',
      country: 'test country',
      postcode: 'test postcode',
      website: 'http://www.test-company.test',
      createdBy: Meteor.userId()
    });

    return id;
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
});

Meteor.startup(function() {
  Tenants.remove({});
  Meteor.users.remove({});

  //****************   USER PERMISSION TEST ITEMS   ****************//
  var tenantId = Tenants.insert({
    name: 'Test Ltd',
    settings: {
      PurchaseOrderPrefix: 'T',
      PurchaseOrderStartingValue: 1
    },
    createdAt: new Date()
  });


  var santaClaus = Accounts.createUser({
    username: "Chris Cringle",
    email: "santa@domain.com",
    password: "hohoho",
    profile: {
      name: "Chris Cringle"
    }
  });
  Partitioner.setUserGroup(santaClaus, tenantId);
  Roles.removeUsersFromRoles(santaClaus, 'Administrator');
  Roles.addUsersToRoles(santaClaus, ['CanReadCompanies', 'CanCreateCompanies', 'CanEditCompanies', 'CanDeleteCompanies']);

  var userId3 = Accounts.createUser({
    username: "dummy",
    email: "dummy@domain.com",
    password: "goodpassword",
    profile: {
      name: "dummy"
    }
  });
  Partitioner.setUserGroup(userId3, tenantId);
  Roles.removeUsersFromRoles(userId3, ['Administrator', 'CanReadCompanies', 'CanCreateCompanies', 'CanEditCompanies', 'CanDeleteCompanies']);
  //**************** END USER PERMISSION TEST ITEMS ****************//

  var tenantId2 = Tenants.insert({
    name: 'Zulu Ltd',
    settings: {
      PurchaseOrderPrefix: 'Z',
      PurchaseOrderStartingValue: 1
    },
    createdAt: new Date()
  });

  var userId = Accounts.createUser({
    username: "test user",
    email: "test@domain.com",
    password: "goodpassword",
    profile: {
      name: "test user"
    }
  });

  // Important! Otherwise subs manager fails to load things and you get a lot of "loading..." screens
  Partitioner.setUserGroup(userId, tenantId2);
  Roles.addUsersToRoles(userId, ['Administrator']);

  var userId2 = Accounts.createUser({
    username: "test user 2",
    email: "test2@domain.com",
    password: "goodpassword",
    profile: {
      name: "test user 2"
    }
  });
  Partitioner.setUserGroup(userId2, 'tenant 2');
  Roles.addUsersToRoles(userId2, ['Administrator']);


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
