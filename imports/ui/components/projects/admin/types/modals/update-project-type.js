import './update-project-type.html';

Template.updateProjectType.onRendered(function() {
  $('#project-type-name').val(this.data.name);
});

Template.updateProjectType.events({
  "click #update-project-type": function(event, template) {
    event.preventDefault();

    if ($('#project-type-name').val() === "") {
      toastr.error('Project type name required.');
    }

    Meteor.call('updateProjectType', template.data.id, $('#project-type-name').val(), function(err, res) {
      if (err) throw new Meteor.Error(err);
      if (res.exitCode === 0) {
        toastr.success('Project type updated successfully.');
        Modal.hide();
      } else {
        toastr.error('Project type not updated: ' + res.exitStatus);
      }
    });
  }
});
