import './insert-job-type.html';

Template.insertJobType.events({
  "click #submit-new-job-type": function(event, template) {
    event.preventDefault();
    if ($('#job-type-name').val() === "") {
      toastr.error('Job type name required.');
    }

    Meteor.call('addJobType', $('#job-type-name').val(), function(err, res) {
      if (err) throw new Meteor.Error(err);
      if (res.exitCode === 0) {
        toastr.success('Job type created successfully.');
        Modal.hide();
      } else {
        toastr.error('Job type not created: ' + res.exitStatus);
      }
    });
  }
});
