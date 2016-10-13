import './update-job-type.html';

Template.updateJobType.onRendered(function() {
  $('#job-type-name').val(this.data.name);
});

Template.updateJobType.events({
  "click #update-job-type": function(event, template) {
    event.preventDefault();

    if ($('#job-type-name').val() === "") {
      toastr.error('Job type name required.');
    }

    Meteor.call('updateJobType', template.data.id, $('#job-type-name').val(), function(err, res) {
      if (err) throw new Meteor.Error(err);
      if (res.exitCode === 0) {
        toastr.success('Job type updated successfully.');
        Modal.hide();
      } else {
        toastr.error('Job type not updated: ' + res.exitStatus);
      }
    });
  }
});
