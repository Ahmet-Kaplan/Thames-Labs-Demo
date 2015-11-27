Meteor.methods({
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
    Meteor.users.remove({_id: userId});

    if (Roles.userIsInRole(this.userId, 'Administrator')) {
      Meteor.call('updateStripeQuantity');
    } else if (Roles.userIsInRole(this.userId, 'superadmin')) {
      Meteor.call('updateStripeQuantity', Partitioner.getUserGroup(this.userId));
    }
    LogServerEvent('warning', 'User removed', 'user', userId);
  },

  deleteAllTenantUsers: function(tenantId) {
    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      throw new Meteor.Error(403, 'Only superadmins may delete all users');
    }
    Meteor.users.find({group: tenantId}).forEach(function(user) {
      Meteor.call('removeUser', user.id, function(err, result) {
        if(err) {
          LogServerEvent('error', 'Unable to remove user while calling \'deleteAllTenantUsers\'', 'user', user.id);
        }
      });
    });
  },

  addUser: function(doc) {
    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      throw new Meteor.Error(403, 'Only admins may create users');
    }

    // Important - do server side schema check
    check(doc, Schemas.User);
    // Create user account
    var userId = Accounts.createUser({
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

    Roles.addUsersToRoles(userId, defaultPermissionsList);

    // Add user to a group (partition) based on customer id
    if (doc.group) {
      Partitioner.setUserGroup(userId, doc.group);
    }

    SSR.compileTemplate('emailText', Assets.getText('email-template.html'));
    Template.emailText.helpers({
      getDoctype: function() {
        return '!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
      },
      subject: function() {
        return 'Your RealTimeCRM details';
      },
      name: function() {
        return doc.name;
      },
      email: function() {
        return doc.email;
      },
      password: function() {
        return doc.password;
      }
    });
    var html = '<' + SSR.render("emailText");

    // See server/startup.js for MAIL_URL environment variable

    Email.send({
      to: doc.email,
      from: 'RealTimeCRM <admin@realtimecrm.co.uk>',
      subject: 'Your RealTimeCRM details',
      html: html
    });

    LogServerEvent('verbose', 'User created', 'user', userId);

    Meteor.call('updateStripeQuantity', doc.group);
  },

  addTenantUser: function(doc) {
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

    Accounts.emailTemplates.from = "RealTimeCRM Team <admin@realtimecrm.co.uk>";
    Accounts.emailTemplates.siteName = "RealtimeCRM";
    Accounts.emailTemplates.enrollAccount.subject = function(user) {
      return 'Your RealTimeCRM details';
    };
    Accounts.emailTemplates.enrollAccount.text = function(user, url) {
      return "Dear " + user.profile.name + "\n\n" +
             "Thank you for choosing to use RealTimeCRM.\n\n" +
             "We hope you will enjoy the simple yet powerful functionality of the system." +
             " To set your password and login please go to:\n\n" +
             url +
             "\n\nShould you have any questions or comments please use the \"Give Feedback\" link just above Change Password.\n\n" +
             "We hope that you enjoy your RealTimeCRM experience.\n\n" +
             "Yours sincerely,\n" +
             "The RealtimeCRM Team";
    };
    Accounts.emailTemplates.enrollAccount.html = function(user, url) {
      SSR.compileTemplate('emailText', Assets.getText('email-enroll-template.html'));
      Template.emailText.helpers({
        getDoctype: function() {
          return '!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">';
        },
        subject: function() {
          return 'Your RealTimeCRM details';
        },
        url: function() {
          return url;
        },
        name: function() {
          return user.profile.name;
        }
      });
      var html = '<' + SSR.render("emailText");
      return html;
    };

    Accounts.sendEnrollmentEmail(userId);

    LogServerEvent('verbose', 'User created', 'user', userId);

    Meteor.call('updateStripeQuantity');
    return true;
  }

});
