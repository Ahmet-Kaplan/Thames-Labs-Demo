import './project-milestone.html';
import './modals/update-project-milestone.js';
import bootbox from 'bootbox';

Template.projectMilestone.events({
  'click .project-milestone-link': function(event, template) {

    event.preventDefault();

    const data = this;
    data.parentTypeId = Template.parentData().id;
    Modal.show('updateProjectMilestone', data);
  },
  'click #delete': function(event, template) {
    event.preventDefault();

    const typeId = Template.parentData().id;
    const milestoneId = template.data.id;

    bootbox.confirm("Are you sure you wish to delete this project milestone?", function(result) {
      if (result === true) {

        Meteor.call('milestoneIsInUse', typeId, milestoneId, function(err, res) {
          if (err) throw new Meteor.Error(err);
          if (res.exitStatus === true) {
            toastr.error('This project milestone is currently in use, and cannot be deleted.');
          } else {
            Meteor.call('removeProjectMilestone', typeId, milestoneId, function(error, result) {
              if (error) throw new Meteor.Error(error);
              if (result.exitCode === 0) {
                toastr.success('Project milestone deleted successfully.');
              } else {
                toastr.error(`Project milestone not deleted: ${result.exitStatus}`);
              }
            });
          }
        });

        bootbox.hideAll();
      }
    });
  }

});