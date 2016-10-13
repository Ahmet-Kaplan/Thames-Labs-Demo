import './update-job-milestone.html';

Template.updateJobMilestone.onRendered(function() {
  $('#job-milestone-name').val(this.data.name);
  $('#job-milestone-description').val(this.data.description);
});

Template.updateJobMilestone.events({
  'click #update-milestone': function(event, template) {
    event.preventDefault();

    var typeId = template.data.parentTypeId;
    var milestoneId = template.data.id;

    if ($('#job-milestone-name').val() === "") {
      toastr.error('Job milestone name required.');
    }

    Meteor.call('updateJobMilestone', typeId, milestoneId, $('#job-milestone-name').val(), $('#job-milestone-description').val(), function(err, res) {
      if (err) throw new Meteor.Error(err);
      if (res.exitCode === 0) {
        toastr.success('Job milestone updated successfully.');
        Modal.hide();
      } else {
        toastr.error('Job milestone not updated: ' + res.exitStatus);
      }
    });
  }

});
