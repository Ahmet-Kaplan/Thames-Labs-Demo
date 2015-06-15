Meteor.methods({
  calculatePurchaseOrderItemTotalValue: function(price, quantity) {
    return parseFloat(price * quantity).toFixed(2);
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
        name: doc.name
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
      to: 'damien.robson@cambridgesoftware.co.uk',
      from: 'admin@realtimecrm.co.uk',
      subject: 'Your RealtimeCRM details',
      text:docText
    });
  }
});

GetRoutedPageTitle = function(currentName){
  var title = currentName;
  return title.charAt(0).toUpperCase() + title.slice(1);
};
