import './insert-project-milestone.html';

Template.insertProjectMilestone.events({
  "click #submit-new-milestone": function(event, template) {
    event.preventDefault();

    if ($('#project-milestone-name').val() === "") {
      toastr.error('Project milestone name required.');
    }

    Meteor.call('addProjectMilestone', template.data.id, $('#project-milestone-name').val(), $('#project-milestone-description').val(), function(err, res) {
      if (err) throw new Meteor.Error(err);
      if (res.exitCode === 0) {
        toastr.success('Project milestone created successfully.');
        Modal.hide();
      } else {
        toastr.error('Project milestone not created: ' + res.exitStatus);
      }
    });
  }
});