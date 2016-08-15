import multer from 'multer';
import bodyParser from 'body-parser';

var upload = multer();

Picker.middleware(upload.single());
Picker.middleware(bodyParser.urlencoded({
  extended: true
}));
Picker.middleware(bodyParser.json());

Picker
  .filter(function(req, res) {
    return req.method == "POST";
  })
  .route('/mailbox', function(params, req, res) {
    if (Object.keys(req.body).length === 0) {
      console.log('Email linkage: no body data found');
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Message received and parsed.');
    } else {
      var data = req.body;

      if (data) {
        Meteor.call('mailgun.createActivityFromBodyData', data);

        res.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        res.end('Message received and parsed.');
      } else {
        res.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        res.end('No body found in request.');
      }
    }
  });

Meteor.methods({
  'mailgun.createActivityFromBodyData': function(bodyData) {
    var subject = bodyData.Subject;
    var mailText = bodyData["body-html"];
    var timestamp = bodyData.timestamp;
    var sendDate = new Date(0);
    sendDate.setUTCSeconds(timestamp);

    var notesFieldData = "<h4><strong>Subject: " + subject + "</strong></h4><p>" + mailText + "</p>";

    var emailPattern = /([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,})/g;
    var userEmail = bodyData.From.match(emailPattern);

    // if (userEmail[0].indexOf('@cambridgesoftware.co.uk') === -1) {
    //   console.log('Email sent but not from Cambridge Software account, ignoring...');
    //   return;
    // }

    if (!userEmail) return;

    var MeteorUser = Meteor.users.findOne({
      'emails.address': userEmail[0]
    });

    if (!MeteorUser) {
      return;
    }

    var TheTenant = Tenants.findOne({
      _id: MeteorUser.group
    });
    if (!TheTenant) {
      return;
    }

    Partitioner.bindGroup(TheTenant._id, function() {
      var toAddresses = bodyData.To.match(emailPattern);
      var involvedParties = bodyData["body-plain"].match(emailPattern);
      var addresses = _.union(toAddresses, involvedParties);

      _.each(addresses, function(address) {
        var contact = Contacts.findOne({
          email: address
        });

        if (contact) {
          Activities.insert({
            type: 'Email',
            notes: notesFieldData,
            createdAt: Date.now(),
            activityTimestamp: sendDate,
            contactId: contact._id,
            createdBy: MeteorUser._id,
            primaryEntityId: contact._id,
            primaryEntityType: 'contacts',
            primaryEntityDisplayData: contact.name(),
            tags: ['Automated']
          });
        }
      });
    });
  }
});
