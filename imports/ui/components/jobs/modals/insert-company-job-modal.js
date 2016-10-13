import '/imports/ui/components/autosuggest/autosuggest.js';
import './insert-company-job-modal.html';
import { Companies, Tenants } from '/imports/api/collections.js';

Template.insertCompanyJobForm.helpers({
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
  },
  companyName: function() {
    return Companies.findOne({
      _id: this.companyId
    }).name;
  }
});