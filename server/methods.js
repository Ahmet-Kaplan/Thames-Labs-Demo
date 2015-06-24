// Super secret server only methods
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
          notes: doc.message + '\n\nurl: ' + doc.url + '\nname: ' + doc.name
        }
      }
    }, function(error, result) {
      if (error) console.log(error);
    });
  },

  switchTenancy: function(user, target) {
    Partitioner.clearUserGroup(user);
    Partitioner.setUserGroup(user, target);
  },

  addUser: function(doc) {

    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      return;
    }

    // Important - do server side schema check
    check(doc, Schemas.User);
    // Create user account
    var userId = Accounts.createUser({
      email: doc.email,
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
    // Add user to a group (partition) based on customer id
    if (doc.group) {
      Partitioner.setUserGroup(userId, doc.group);
    }

    var docText = "Hi, " + doc.name + ",\r\n" +
      "Please find your RealtimeCRM login details below:\r\n\r\n" +
      "Email address: " + doc.email + "\r\n" +
      "Password: " + doc.password + "\r\n\r\n" +
      "Kind regards,\r\n" +
      "The RealtimeCRM Team";

    // See server/startup.js for MAIL_URL environment variable

    Email.send({
      to: doc.email,
      from: 'admin@realtimecrm.co.uk',
      subject: 'Your RealtimeCRM details',
      text: docText
    });
  }
});
