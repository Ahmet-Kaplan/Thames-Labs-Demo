import { UserSchema } from '/imports/api/users/schema.js';
import { isTenantOverFreeUserLimit } from '/imports/api/tenants/helpers.js';

Meteor.methods({

  'users.export': function(collectionName, searchDefinition, searchOptions) {
    const userArray = [];

    // We require a user as we make find calls on partitioned collections
    if (!this.userId) throw new Meteor.Error('401', 'Must be a logged in user to perform export');

    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      throw new Meteor.Error(403, 'Only admins may export user data');
    }

    if (!Collections[collectionName] || !Collections[collectionName].index) {
      throw new Meteor.Error('500', 'Search index not found');
    }

    searchOptions.limit = 99999;
    if (!searchOptions.props) searchOptions.props = {};
    searchOptions.props.export = true;
    const index = Collections[collectionName].index;
    const results = index.search(searchDefinition, searchOptions).fetch();

    _.each(results, function(tenant) {
      const users = Meteor.users.find({
        group: tenant._id
      }).fetch();
      _.each(users, function(user) {
        const data = {
          name: user.profile.name,
          createdAt: moment(user.createdAt).format('DD/MM/YYYY HH:mm'),
          lastLogin: moment(user.profile.lastLogin).format('DD/MM/YYYY HH:mm'),
          email: user.emails[0].address,
          tenant: tenant.name,
          administrator: (_.includes(user.roles, 'Administrator') ? 'Yes' : 'No')
        };
        userArray.push(data);
      });
    });

    return userArray;
  },

  'user.checkPassword': function(userId, digest) {
    if (typeof digest !== 'string') {
      return false;
    }
    const user = Meteor.users.findOne({_id: userId});
    const password = {
      digest: digest,
      algorithm: 'sha-256'
    };

    const passOK = Accounts._checkPassword(user, password);
    if (passOK.error) return false;
    return true;
  },

  isEmailAvailable: function(emailAddress) {
    return !Accounts.findUserByEmail(emailAddress);
  },

  setUserAuthLevel: function(userId, level) {
    Meteor.users.update(userId, {
      $set: {
        'profile.poAuthLevel': parseFloat(level)
      }
    });
  },

  removeUser: function(userId) {
    if (!Roles.userIsInRole(this.userId, ['superadmin', 'Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may remove users');
    }
    if (Roles.userIsInRole(this.userId, 'Administrator')) {
      // Check user is in same tenant as admin
      if (Partitioner.getUserGroup(userId) !== Partitioner.getUserGroup(this.userId)) {
        throw new Meteor.Error(403, 'Admins may only remove users from their company');
      }

      //Check if Admin tries to remove itself
      if (userId === this.userId) {
        throw new Meteor.Error(403, 'You cannot remove your own account. Please contact us to do so.');
      }
    }
    Grouping.remove({
      _id: userId
    });
    Meteor.users.remove({
      _id: userId
    });

    if (Roles.userIsInRole(this.userId, 'Administrator')) {
      Meteor.call('stripe.updateQuantity', function(err, res) {
        if(err) {
          throw new Meteor.Error(403, err.reason);
        } else if(!res) {
          throw new Meteor.Error(403, 'Unable to update your subscription');
        }
      });
    } else if (Roles.userIsInRole(this.userId, 'superadmin')) {
      Meteor.call('stripe.updateQuantity', Partitioner.getUserGroup(userId));
    }
    LogServerEvent('warning', 'User removed', 'user', userId);
  },

  deleteAllTenantUsers: function(tenantId) {
    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      throw new Meteor.Error(403, 'Only superadmins may delete all users');
    }
    Meteor.users.find({
      group: tenantId
    }).forEach(function(user) {
      Meteor.call('removeUser', user.id, function(err, result) {
        if (err) {
          LogServerEvent('error', 'Unable to remove user while calling \'deleteAllTenantUsers\'', 'user', user.id);
        }
      });
    });
  },

  addUser: function(doc) {
    // This method is called by superadmins to create users
    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      throw new Meteor.Error(403, 'Only admins may create users');
    }

    // Important - do server side schema check
    check(doc, UserSchema);

    Partitioner.bindGroup(doc.group, function() {
      // Create user account
      if (!doc.password) {
        const userId = Accounts.createUser({
          email: doc.email.toLowerCase(),
          profile: {
            name: doc.name,
            watchlist: [],
            lastLogin: null,
            lastActivity: {
              page: null,
              url: null
            },
            poAuthLevel: 100000
          }
        });

        // Add user to a group (partition) based on customer id
        Partitioner.setUserGroup(userId, doc.group);

        Roles.addUsersToRoles(userId, defaultPermissionsList);

        Accounts.sendEnrollmentEmail(userId);

        LogServerEvent('verbose', 'User created', 'user', userId);
      } else {
        const userId = Accounts.createUser({
          email: doc.email.toLowerCase(),
          password: doc.password,
          profile: {
            name: doc.name,
            watchlist: [],
            lastLogin: null,
            lastActivity: {
              page: null,
              url: null
            },
            poAuthLevel: 100000
          }
        });

        const user = Meteor.users.findOne({
          _id: userId
        });

        // Add user to a group (partition) based on customer id
        Partitioner.setUserGroup(userId, doc.group);

        if (user) {
          Roles.addUsersToRoles(userId, defaultPermissionsList);
        }

        LogServerEvent('verbose', 'User created', 'user', userId);
      }
    });

    Meteor.call('stripe.updateQuantity', doc.group, function(err, res) {
      if(err) {
        throw new Meteor.Error(403, err.reason);
      } else if(!res) {
        throw new Meteor.Error(403, 'Unable to update subscription. Tenant may have reached the limit of free accounts.');
      }
    });


  },

  addTenantUser: function(doc) {
    // This method is called by tenant admins to create users
    const adminId = this.userId;
    const admin = Meteor.users.findOne({
      _id: adminId
    });
    if (!Roles.userIsInRole(adminId, ['Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may create users');
    }

    if(admin && !isProTenant(admin.group) && isTenantOverFreeUserLimit(admin.group)) {
      throw new Meteor.Error(403, 'Users limit reached');
    }

    // Important - do server side schema check
    check(doc, UserSchema);

    // Create user account
    const userId = Accounts.createUser({
      email: doc.email.toLowerCase(),
      profile: {
        name: doc.name,
        watchlist: [],
        lastLogin: null,
        lastActivity: {
          page: null,
          url: null
        }
      }
    });

    Roles.addUsersToRoles(userId, defaultPermissionsList);

    // Add user to a group (partition) based on customer id
    Partitioner.setUserGroup(userId, Partitioner.getUserGroup(adminId));

    Accounts.sendEnrollmentEmail(userId);

    LogServerEvent('verbose', 'User created', 'user', userId);

    Meteor.call('stripe.updateQuantity', function(err, res) {
      if(err) {
        throw new Meteor.Error(403, err.reason);
      } else if (!res) {
        throw new Meteor.Error(403, 'Unable to update subscription');
      }
    });
  },

  "user.changeEmail": function(newEmailAddress) {
    var userId = this.userId;
    if(Accounts.findUserByEmail(newEmailAddress)) return false;
    Meteor.users.update({_id: userId}, {$set: {'emails.0.address': newEmailAddress}});
    return true;
  },
  "user.changeUsername": function(newUsername) {
    const userId = this.userId;
    const colleagues = Meteor.users.find({
      _id: {$ne: userId},
      group: Partitioner.getUserGroup(userId)
    }).fetch();

    let state = true;

    _.each(colleagues, function(user) {
      if(user.profile.name === newUsername) state = false;
    });
    Meteor.users.update({_id: userId}, {$set: {'profile.name': newUsername}});
    return state;
  }

});
