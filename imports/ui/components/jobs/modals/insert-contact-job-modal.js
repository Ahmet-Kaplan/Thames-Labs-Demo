import '/imports/ui/components/autosuggest/autosuggest.js';
import './insert-contact-job-modal.html';
import { Companies, Contacts, Tenants } from '/imports/api/collections.js';

Template.insertContactJobModal.helpers({
  jobTypes: function() {
    return Tenants.findOne({
      _id: Meteor.user().group
    }).settings.job.types.map(function(type) {
      return {
        'label': type.name,
        'value': type.id
      };
    });
  },
  currentDateTime: function() {
    return moment();
  },
  currentUser: function() {
    return Meteor.userId();
  },
  usersAsOptions: function() {
    return Meteor.users.find({}).map(function(user) {
      return {
        'label': user.profile.name,
        'value': user._id
      };
    });
  },
  companyName: function() {
    return Companies.findOne({
      _id: this.companyId
    }).name;
  },
  contactName: function() {
    var contact = Contacts.findOne({
      _id: this.contactId
    });
    return `${contact.forename} ${contact.surname}`;
  }
});