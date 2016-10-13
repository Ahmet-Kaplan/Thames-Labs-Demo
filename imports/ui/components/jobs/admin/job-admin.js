import './job-admin.html';
import './types/modals/insert-job-type.js';
import './types/job-type.js';
import { Tenants } from '/imports/api/collections.js';

Template.jobAdmin.helpers({
  jobTypes: function() {
    //if (!Meteor.user()) return;
    return Tenants.findOne({
      _id: Meteor.user().group
    }).settings.job.types;
  }
});

Template.jobAdmin.events({
  'click #addJobType': function(event) {
    event.preventDefault();
    Modal.show('insertJobType');
  }
});
