import './job-milestone.html';
import './modals/update-job-milestone.js';
import bootbox from 'bootbox';

Template.jobMilestone.events({
  'click .job-milestone-link': function(event, template) {

    event.preventDefault();

    const data = this;
    data.parentTypeId = Template.parentData().id;
    Modal.show('updateJobMilestone', data);
  },
  'click #delete': function(event, template) {
    event.preventDefault();

    const typeId = Template.parentData().id;
    const milestoneId = template.data.id;

    bootbox.confirm("Are you sure you wish to delete this job milestone?", function(result) {
      if (result === true) {

        Meteor.call('milestoneIsInUse', typeId, milestoneId, function(err, res) {
          if (err) throw new Meteor.Error(err);
          if (res.exitStatus === true) {
            toastr.error('This job milestone is currently in use, and cannot be deleted.');
          } else {
            Meteor.call('removeJobMilestone', typeId, milestoneId, function(error, result) {
              if (error) throw new Meteor.Error(error);
              if (result.exitCode === 0) {
                toastr.success('Job milestone deleted successfully.');
              } else {
                toastr.error(`Job milestone not deleted: ${result.exitStatus}`);
              }
            });
          }
        });

        bootbox.hideAll();
      }
    });
  }

});