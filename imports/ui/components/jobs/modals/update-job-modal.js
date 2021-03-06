import '/imports/ui/components/autosuggest/autosuggest.js';
import './update-job-modal.html';
import { Companies, Contacts } from '/imports/api/collections.js';

Template.updateJobModal.helpers({
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
    const contact = Contacts.findOne({
      _id: this.contactId
    });
    return `${contact.forename} ${contact.surname}`;
  }
});

AutoForm.hooks({
  updateJobForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Job details updated.');
    },
    onError: function(formType, error) {
      toastr.error(`Job update error: ${error}`);
    }
  }
});
