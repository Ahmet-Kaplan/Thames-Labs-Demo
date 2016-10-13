import './insert-job-milestone.html';

Template.insertJobMilestone.events({
  "click #submit-new-milestone": function(event, template) {
    event.preventDefault();

    if ($('#job-milestone-name').val() === "") {
      toastr.error('Job milestone name required.');
    }

    Meteor.call('addJobMilestone', template.data.id, $('#job-milestone-name').val(), $('#job-milestone-description').val(), function(err, res) {
      if (err) throw new Meteor.Error(err);
      if (res.exitCode === 0) {
        toastr.success('Job milestone created successfully.');
        Modal.hide();
      } else {
        toastr.error('Job milestone not created: ' + res.exitStatus);
      }
    });
  }
});