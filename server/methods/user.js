Meteor.methods({

  switchTenancy: function(user, target) {
    Partitioner.clearUserGroup(user);
    Partitioner.setUserGroup(user, target);
  },

  removeUser: function(userId) {
    Grouping.remove({
      _id: userId
    });
    Meteor.users.remove({_id: userId});
    LogServerEvent('warning', 'User removed', 'user', userId);
  },

  addUser: function(doc) {
    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      return;
    }

    // Important - do server side schema check
    check(doc, Schemas.User);
    // Create user account
    var userId = Accounts.createUser({
      email: doc.email.toLowerCase(),
      password: doc.password,
      profile: {
        name: doc.name,
        lastLogin: null,
        lastActivity: {
          page: null,
          url: null
        }
      }
    });

    Roles.addUsersToRoles(userId, ALL_PERMISSIONS);

    // Add user to a group (partition) based on customer id
    if (doc.group) {
      Partitioner.setUserGroup(userId, doc.group);
    }

    LogServerEvent('verbose', 'User created', 'user', userId);

    SSR.compileTemplate('emailText', Assets.getText('emailtemplate.html'));
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
      from: 'admin@realtimecrm.co.uk',
      subject: 'Your RealTimeCRM details',
      html: html
    });
  },

  addTenantUser: function(doc) {
    var adminId = this.userId;
    if (!Roles.userIsInRole(adminId, ['Administrator'])) {
      return '';
    }

    // Important - do server side schema check
    check(doc, Schemas.User);

    // Create user account
    var userId = Accounts.createUser({
      email: doc.email.toLowerCase(),
      profile: {
        name: doc.name,
        lastLogin: null,
        lastActivity: {
          page: null,
          url: null
        }
      }
    });

    Roles.addUsersToRoles(userId, ALL_PERMISSIONS);

    // Add user to a group (partition) based on customer id
    Partitioner.setUserGroup(userId, Partitioner.getUserGroup(adminId));

    LogServerEvent('verbose', 'User created', 'user', userId);

    Accounts.emailTemplates.from = "RealTimeCRM Team <admin@realtimecrm.co.uk>";
    Accounts.emailTemplates.siteName = "RealtimeCRM";
    Accounts.emailTemplates.enrollAccount.subject = function(user) {
      return 'Your RealTimeCRM details';
    };
    Accounts.emailTemplates.enrollAccount.text = function(user, url) {
      return "Dear " + user.profile.name + "\n\n"
             + "Thank you for choosing to use RealTimeCRM.\n\n"
             + "We hope you will enjoy the simple yet powerful functionality of the system."
             + " To set your password and login please go to:\n\n"
             + url
             + "\n\nShould you have any questions or comments please use the \"Give Feedback\" link just above Change Password.\n\n"
             + "We hope that you enjoy your RealTimeCRM experience.\n\n"
             + "Yours sincerely,\n"
             + "The RealtimeCRM Team";
    };
    Accounts.emailTemplates.enrollAccount.html = function(user, url) {
      SSR.compileTemplate('emailText', Assets.getText('emailenrolltemplate.html'));
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
  }

});
