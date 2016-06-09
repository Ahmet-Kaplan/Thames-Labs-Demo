Meteor.methods({

  'users.export': function(collectionName, searchDefinition, searchOptions) {
    var userArray = [];

    // We require a user as we make find calls on partitioned collections
    if (!this.userId) throw new Meteor.Error('401', 'Must be a logged in user to perform export');

    if (!Collections[collectionName] || !Collections[collectionName].index) {
      throw new Meteor.Error('500', 'Search index not found');
    }

    searchOptions.limit = 99999;
    if (!searchOptions.props) searchOptions.props = {};
    searchOptions.props.export = true;
    var index = Collections[collectionName].index;
    var results = index.search(searchDefinition, searchOptions).fetch();

    _.each(results, function(tenant) {
      var users = Meteor.users.find({
        group: tenant._id
      }).fetch();
      _.each(users, function(user) {
        var data = {
          name: user.profile.name,
          createdAt: moment(user.createdAt).format('DD/MM/YYYY HH:mm'),
          lastLogin: moment(user.profile.lastLogin).format('DD/MM/YYYY HH:mm'),
          email: user.emails[0].address,
          tenant: tenant.name,
          administrator: (_.contains(user.roles, 'Administrator') ? 'Yes' : 'No')
        }
        userArray.push(data);
      });
    });

    return userArray;
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
      Meteor.call('stripe.updateQuantity');
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
    check(doc, Schemas.User);

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

        Meteor.call('stripe.updateQuantity', doc.group);
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

        var user = Meteor.users.findOne({
          _id: userId
        });

        // Add user to a group (partition) based on customer id
        Partitioner.setUserGroup(userId, doc.group);

        if (user) {
          if (!isProTenant(user.group)) {
            Roles.addUsersToRoles(userId, ["Administrator"]);
          }
          Roles.addUsersToRoles(userId, defaultPermissionsList);
        }

        LogServerEvent('verbose', 'User created', 'user', userId);

        Meteor.call('stripe.updateQuantity', doc.group);
      }
    });

  },

  addTenantUser: function(doc) {
    // This method is called by tenant admins to create users
    var adminId = this.userId;
    if (!Roles.userIsInRole(adminId, ['Administrator'])) {
      throw new Meteor.Error(403, 'Only admins may create users');
    }

    // Important - do server side schema check
    check(doc, Schemas.User);

    // Create user account
    var userId = Accounts.createUser({
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

    var admin = Meteor.users.findOne({
      _id: adminId
    });
    if (admin) {
      if (!isProTenant(admin.group)) {
        Roles.addUsersToRoles(userId, 'Administrator');
      }
    }
    Roles.addUsersToRoles(userId, defaultPermissionsList);

    // Add user to a group (partition) based on customer id
    Partitioner.setUserGroup(userId, Partitioner.getUserGroup(adminId));

    Accounts.sendEnrollmentEmail(userId);

    LogServerEvent('verbose', 'User created', 'user', userId);

    Meteor.call('stripe.updateQuantity', Partitioner.getUserGroup(adminId));
  }

});