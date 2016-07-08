import './insert-project-type.html';

Template.insertProjectType.events({
  "click #submit-new-project-type": function(event, template) {
    event.preventDefault();
    if ($('#project-type-name').val() === "") {
      toastr.error('Project type name required.');
    }

    Meteor.call('addProjectType', $('#project-type-name').val(), function(err, res) {
      if (err) throw new Meteor.Error(err);
      if (res.exitCode === 0) {
        toastr.success('Project type created successfully.');
        Modal.hide();
      } else {
        toastr.error('Project type not created: ' + res.exitStatus);
      }
    });
  }
});
