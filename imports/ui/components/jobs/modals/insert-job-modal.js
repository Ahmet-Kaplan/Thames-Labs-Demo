import '/imports/ui/components/autosuggest/autosuggest.js';
import '/imports/ui/components/autosuggest/company-contact.js';
import './insert-job-modal.html';
import { Tenants } from '/imports/api/collections.js';

Template.insertJobModal.helpers({
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
  }
});

AutoForm.hooks({
  insertJobForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Job created.');
    },
    after: {
      insert: function(error, result) {
        if (error) {
          toastr.error('Job creation error: ' + error);
          return false;
        }
        FlowRouter.go('/jobs/' + result);
      }
    },
    onError: function(formType, error) {
      toastr.error('Job creation error: ' + error);
    }
  }
});