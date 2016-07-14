import './update-project-milestone.html';

Template.updateProjectMilestone.onRendered(function() {
  $('#project-milestone-name').val(this.data.name);
  $('#project-milestone-description').val(this.data.description);
});

Template.updateProjectMilestone.events({
  'click #update-milestone': function(event, template) {
    event.preventDefault();

    var typeId = template.data.parentTypeId;
    var milestoneId = template.data.id;

    if ($('#project-milestone-name').val() === "") {
      toastr.error('Project milestone name required.');
    }

    Meteor.call('updateProjectMilestone', typeId, milestoneId, $('#project-milestone-name').val(), $('#project-milestone-description').val(), function(err, res) {
      if (err) throw new Meteor.Error(err);
      if (res.exitCode === 0) {
        toastr.success('Project milestone updated successfully.');
        Modal.hide();
      } else {
        toastr.error('Project milestone not updated: ' + res.exitStatus);
      }
    });
  }

});
