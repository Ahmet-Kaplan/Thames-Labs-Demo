import { Meteor } from 'meteor/meteor';
import denodeifyDefault from 'es6-denodeify';

const denodeify = denodeifyDefault(Promise);

function createTenant(name, plan) {
  const defaultTenant = {
    name: name,
    plan: plan,
    settings: {
      extInfo: {
        company: [],
        contact: [],
        project: [],
        product: []
      },
      activity: {
        defaultNumber: 1,
      },
      task: {
        defaultNumber: 1,
      },
      company: {
        defaultNumber: 1,
      },
      contact: {
        defaultNumber: 1,
      },
      opportunity: {
        defaultNumber: 1,
        stages: []
      },
      project: {
        defaultNumber: 1,
        types: []
      },
      purchaseorder: {
        defaultPrefix: "",
        defaultNumber: 1,
      },
      product: {
        defaultNumber: 1,
      }
    },
    stripe: {},

    createdAt: new Date()
  };

  return Tenants.insert(defaultTenant);
}

function createUser(tenantId, name, email) {
  // we should make this use our actual user creation method for better accuracy
  const userId = Accounts.createUser({
    username: name,
    email: email,
    password: "goodpassword",
    profile: {
      name: name
    }
  });

  Partitioner.setUserGroup(userId, tenantId);

  Meteor.users.update({
    _id: userId
  }, {
    $set: {
      "emails.0.verified": true,
      "profile.welcomeTour": true
    }
  });

  return userId;
}

Meteor.methods({
  generateFixtures: function generateFixturesMethod() {
    const tenantId = createTenant('test tenant', 'free');
    createUser(tenantId, 'test user', 'test@domain.com');
  }
});

let generateData;
if (Meteor.isClient) {
  const testConnection = Meteor.connect(Meteor.absoluteUrl());
  generateData = denodeify( (cb) => {
    testConnection.call('generateFixtures', cb);
  });
}

export { generateData };
