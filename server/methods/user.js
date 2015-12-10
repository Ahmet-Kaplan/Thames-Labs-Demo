Meteor.methods({

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
        },
        poAuthLevel: 100000
      }
    });

    Roles.addUsersToRoles(userId, defaultPermissionsList);

    // Add user to a group (partition) based on customer id
    if (doc.group) {
      Partitioner.setUserGroup(userId, doc.group);
    }

    Accounts.sendEnrollmentEmail(userId);

    LogServerEvent('verbose', 'User created', 'user', userId);

    Meteor.call('stripe.updateQuantity', doc.group);
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

    Roles.addUsersToRoles(userId, defaultPermissionsList);

    // Add user to a group (partition) based on customer id
    Partitioner.setUserGroup(userId, Partitioner.getUserGroup(adminId));

    Accounts.sendEnrollmentEmail(userId);

    LogServerEvent('verbose', 'User created', 'user', userId);

    Meteor.call('stripe.updateQuantity');
  }

});
