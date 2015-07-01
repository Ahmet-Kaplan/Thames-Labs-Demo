// Super secret server only methods
Meteor.methods({
    sendFeedback: function (doc) {
        //    check(doc, Schemas.Feedback);
        //    this.unblock();
        //    var asanaApiKey = '7U5d5HNS.9gBvXvNdFeaiNoajrOvchS7',
        //      asanaWorkspace = '20585633191816',
        //      asanaProject = '36900399110512';
        //
        //    HTTP.post('https://app.asana.com/api/1.0/tasks', {
        //      auth: asanaApiKey + ':',
        //      data: {
        //        data: {
        //          name: _.trunc(doc.message),
        //          projects: asanaProject,
        //          workspace: asanaWorkspace,
        //          notes: doc.message + '\n\nurl: ' + doc.url + '\nname: ' + doc.name
        //        }
        //      }
        //    }, function(error, result) {
        //      if (error) console.log(error);
        //    });
    },

    switchTenancy: function (user, target) {
        Partitioner.clearUserGroup(user);
        Partitioner.setUserGroup(user, target);
    },

    addUser: function (doc) {

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

        var docText = "Dear " + doc.name + ",\r\n" +
            "Thank you for choosing to use RealTimeCRM. We hope you will enjoy the simple yet powerful functionality of the system. To login please go to https://app.RealTimeCRM.co.uk and use the following credentials:\r\n\r\n" +
            "Username: " + doc.email + "\r\n" +
            "Password: " + doc.password + "\r\n\r\n" +
            "We would really appreciate it if you could change your password to secure password of your own choosing by logging into the system, clicking your name at the top right hand cover and selecting Change Password.\r\n\r\n" +
            "Should you have any questions or comments please use the “Give Feedback” link just above Change Password.\r\n\r\n" +
            "We hope that you enjoy your RealTimeCRM experience." + "\r\n\r\n" +
            "Yours sincerely,\r\n" +
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