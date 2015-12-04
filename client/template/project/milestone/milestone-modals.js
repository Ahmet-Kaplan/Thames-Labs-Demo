Template.createProjectType.events({
  "click #submit-new-project-type": function(event, template) {
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

Template.updateProjectType.onRendered(function() {
  $('#project-type-name').val(this.data.name);
});

Template.updateProjectType.events({
  "click #update-project-type": function(event, template) {
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

Template.createProjectMilestone.events({
  "click #submit-new-milestone": function(event, template) {
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

Template.updateProjectMilestone.onRendered(function() {
  $('#project-milestone-name').val(this.data.name);
  $('#project-milestone-description').val(this.data.description);
});

Template.updateProjectMilestone.events({
  'click #update-milestone': function(event, template) {
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
