Meteor.methods({

  'user.checkPassword': function(userId, digest) {
    if (typeof digest !== 'string') {
      return false;
    }
    var user = Meteor.users.findOne({_id: userId});
    var password = {
      digest: digest,
      algorithm: 'sha-256'
    };

    var passOK = Accounts._checkPassword(user, password);
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
