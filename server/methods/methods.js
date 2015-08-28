Meteor.methods({


  sendFeedback: function(doc) {
    check(doc, Schemas.Feedback);
    this.unblock();
    var asanaApiKey = '7U5d5HNS.9gBvXvNdFeaiNoajrOvchS7',
      asanaWorkspace = '20585633191816',
      asanaProject = '36900399110512';

    HTTP.post('https://app.asana.com/api/1.0/tasks', {
      auth: asanaApiKey + ':',
      data: {
        data: {
          name: _.trunc(doc.message),
          projects: asanaProject,
          workspace: asanaWorkspace,
          notes: doc.message + '\n\nurl: ' + doc.url + '\nname: ' + doc.name + '\nemail: ' + doc.email
        }
      }
    }, function(error) {
      if (error) console.log(error);
    });
  },

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

    // See server/startup.js for MAIL_URL environment variable
  },

  setMaintenanceMode: function(val) {
    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      return;
    }
    ServerSession.set('maintenance', val);
    if (val === true) {
      LogServerEvent('warning', 'Maintenance mode enabled');
    } else {
      LogServerEvent('info', 'Maintenance mode disabled');
    }
  },

  remainingConversions: function(count) {
    ServerSession.set('DocxToPdfRemaining', count);

    if (count == 100 || count == 50 || count == 25 || count < 15) {
      var txt = 'Running out of doc to pdf conversions. We have ' + count + ' left';
      Email.send({
        to: 'jason.mashinchi@cambridgesoftware.co.uk',
        from: 'admin@realtimecrm.co.uk',
        subject: 'Running out of doc to pdf conversions...',
        text: txt
      });
    }
  },

  getClearbitData: function(entityName, entityId) {

    var clearbitApiKey = process.env.CLEARBITAPIKEY;
    if (typeof(clearbitApiKey) == 'undefined') {
      throw new Meteor.Error('No-clearbit-api-key', 'Error 500: Not found', 'No clearbit API key set');
    }

    if (entityName === 'company') {
      var url = Meteor.npmRequire('url');
      var company = Companies.findOne(entityId);
      var domain = url.parse(company.website).hostname;
      var requestUrl = 'https://company-stream.clearbit.com/v1/companies/domain/' + domain;
      var authToken = "Bearer " + clearbitApiKey;
      Meteor.http.get(requestUrl, {
         headers: {
            "Authorization": authToken
         }
      }, function(err, res) {
        if (err) {
          Companies.update(entityId, { $unset: { 'metadata.clearbit': "" }});
        } else {
          var clearbitData = _.clone(res.data, true);
          Companies.update(
            entityId,
            { $set: { 'metadata.clearbit': clearbitData }}
          );
        }
      });

    } else if (entityName === 'contact') {
        var url = Meteor.npmRequire('url');
        var contact = Contacts.findOne(entityId);
        var requestUrl = 'https://person-stream.clearbit.com/v1/people/email/' + contact.email;
        var authToken = "Bearer " + clearbitApiKey;
        Meteor.http.get(requestUrl, {
           headers: {
              "Authorization": authToken
           }
        }, function(err, res) {
          if (err) {
            Contacts.update(entityId, { $unset: { 'metadata.clearbit': "" }});
          } else {
            var clearbitData = _.clone(res.data, true);
            Contacts.update(
              entityId,
              { $set: { 'metadata.clearbit': clearbitData }}
            );
          }
        });

    } else {
      throw new Meteor.Error('Not-supported', 'Error 500: Not found', 'Only company or contact lookup supported');
    }
  },
  createOpportunityStages: function() {
    var count = OpportunityStages.find({}).count();
    if (count == 0) {
      OpportunityStages.insert({
        title: "Exploration",
        description: "Exploring whether there is a need that your product or service can fulfill",
        order: 0
      });
      OpportunityStages.insert({
        title: "Fact finding",
        description: "Finding the key people, whether a budget exists, timescales, competitors pitching",
        order: 1
      });
      OpportunityStages.insert({
        title: "Solution",
        description: "Preparing your solution based on what you know from your fact finding",
        order: 2
      });
      OpportunityStages.insert({
        title: "Negotiation",
        description: "Negotiating the sale of the solution, confirming price, delivery and other out-of-contract aspects",
        order: 3
      });
      OpportunityStages.insert({
        title: "Objections",
        description: "Dealing with any objections to the negotiated solution in order to win the business",
        order: 4
      });
    }
  }
});
