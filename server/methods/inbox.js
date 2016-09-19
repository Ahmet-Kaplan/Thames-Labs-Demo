import { Activities, Contacts, Tenants } from '/imports/api/collections.js';

import multer from 'multer';
import bodyParser from 'body-parser';

const upload = multer();

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
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Message received: no body data found.');
    } else {
      const data = req.body;

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
    const subject = bodyData.Subject;
    const mailText = bodyData["body-html"];
    const timestamp = bodyData.timestamp;
    const sendDate = new Date(0);
    sendDate.setUTCSeconds(timestamp);

    const notesFieldData = "<h4><strong>Subject: " + subject + "</strong></h4><p>" + mailText + "</p>";

    const emailPattern = /([A-Za-z0-9_\.-]+)@([\dA-Za-z\.-]+)\.([A-Za-z\.]{2,})/g;
    const userEmail = bodyData.From.match(emailPattern);

    if (!userEmail) return;

    const MeteorUser = Meteor.users.findOne({
      'emails.address': { $regex: new RegExp(userEmail[0], "i") }
    });

    if (!MeteorUser) {
      return;
    }

    const TheTenant = Tenants.findOne({
      _id: MeteorUser.group
    });
    if (!TheTenant) {
      return;
    }

    Partitioner.bindGroup(TheTenant._id, function() {
      const toAddresses = bodyData.To.match(emailPattern);
      const involvedParties = bodyData["body-plain"].match(emailPattern);
      const addresses = _.union(toAddresses, involvedParties);
      const missingContacts = [];

      _.each(addresses, function(address) {
        const contact = Contacts.findOne({
          email: address
        });

        if (contact) {
          Activities.insert({
            type: 'Email',
            notes: notesFieldData,
            createdAt: Date.now(),
            activityTimestamp: sendDate,
            contactId: contact._id,
            companyId: contact.companyId,
            createdBy: MeteorUser._id,
            primaryEntityId: contact._id,
            primaryEntityType: 'contacts',
            primaryEntityDisplayData: contact.name(),
            tags: ['Automated']
          });
        } else {
          missingContacts.push(address);
        }
      });

      if (missingContacts.length > 0) {
        SSR.compileTemplate('htmlEmail', Assets.getText('email-link-fail.html'));
        let contactsBody = "";
        _.each(missingContacts, function(contact) {
          if (contact !== "inbox@realtimecrm.co.uk") {
            contactsBody = contactsBody + " - " + contact + "<br><br>";
          }
        });

        const emailData = {
          name: MeteorUser.profile.name,
          issues: contactsBody
        };

        Email.send({
          to: userEmail[0],
          from: 'realtimecrm-notifications@cambridgesoftware.co.uk',
          subject: `Email link failure notification`,
          html: SSR.render('htmlEmail', emailData)
        });
      }
    });
  }
});