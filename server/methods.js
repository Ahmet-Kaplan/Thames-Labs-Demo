// Super secret server only methods
Meteor.methods({
  checkUserRole: function(userId, roleName) {
    var user = Meteor.users.findOne(userId);
    if (user) {
      if (Roles.userIsInRole(userId, "Administrator")) {
        return true;
      }

      if (Roles.userIsInRole(userId, roleName)) {
        return true;
      } else {
        return false;
      }
    }
  },
  getMaxPermission: function(userId, permissionName) {
    var user = Meteor.users.findOne(userId);
    if (user) {
      var returnedValue = 'Restricted';

      if (Roles.userIsInRole(userId, "Administrator")) {
        return 'CanDelete' + permissionName;
      }

      if (Roles.userIsInRole(userId, 'CanRead' + permissionName)) {
        returnedValue = 'CanRead' + permissionName;
      }

      if (Roles.userIsInRole(userId, 'CanCreate' + permissionName)) {
        returnedValue = 'CanCreate' + permissionName;
      }

      if (Roles.userIsInRole(userId, 'CanEdit' + permissionName)) {
        returnedValue = 'CanEdit' + permissionName;
      }

      if (Roles.userIsInRole(userId, 'CanDelete' + permissionName)) {
        returnedValue = 'CanDelete' + permissionName;
      }

      return returnedValue;
    }
  },
  setUserRole: function(userId, roleName, value) {
    var user = Meteor.users.findOne(userId);
    if (user) {
      if (value === true && !Roles.userIsInRole(userId, roleName)) {
        Roles.addUsersToRoles(userId, roleName);
      }

      if (value === false && Roles.userIsInRole(userId, roleName)) {
        Roles.removeUsersFromRoles(userId, roleName);
      }
    }
  },
  clearAuditLog: function() {
    AuditLog.remove({});
  },

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

    Roles.addUsersToRoles(userId, [
      "CanReadContacts",
      "CanReadCompanies",
      "CanCreateCompanies",
      "CanEditCompanies",
      "CanDeleteCompanies",
      "CanCreateContacts",
      "CanEditContacts",
      "CanDeleteContacts",
      "CanReadProjects",
      "CanCreateProjects",
      "CanEditProjects",
      "CanDeleteProjects",
      "CanReadProducts",
      "CanCreateProducts",
      "CanEditProducts",
      "CanDeleteProducts",
      "CanReadTasks",
      "CanCreateTasks",
      "CanEditTasks",
      "CanDeleteTasks",
      "CanReadPurchaseOrders",
      "CanCreatePurchaseOrders",
      "CanEditPurchaseOrders",
      "CanDeletePurchaseOrders",
      "CanReadDataManagement",
      "CanCreateDataManagement",
      "CanEditDataManagement",
      "CanDeleteDataManagement",
      "CanReadEventLog",
      "CanCreateEventLog",
      "CanEditEventLog",
      "CanDeleteEventLog"
    ]);

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
  }
});

LogServerEvent = function(logLevel, logMessage, logEntityType, logEntityId) {
  logEntityType = (typeof logEntityType === 'undefined') ? undefined : logEntityType;
  logEntityId = (typeof logEntityId === 'undefined') ? undefined : logEntityId;

  AuditLog.insert({
    date: new Date(),
    source: 'server',
    level: logLevel,
    message: logMessage,
    user: undefined,
    entityType: logEntityType,
    entityId: logEntityId
  });
};
