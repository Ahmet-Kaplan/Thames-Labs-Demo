import '/imports/ui/components/autosuggest/autosuggest.js';
import './update-project-modal.html';

Template.updateProjectModal.helpers({
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
  updateProjectForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project details updated.');
    },
    onError: function(formType, error) {
      toastr.error(`Project update error: ${error}`);
    }
  }
});
