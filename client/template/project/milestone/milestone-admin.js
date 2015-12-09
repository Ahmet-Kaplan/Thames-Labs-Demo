Template.projectAdmin.helpers({
  projectTypes: function() {
    return Tenants.findOne({
      _id: Meteor.user().group
    }).settings.project.types;
  }
});

Template.projectType.helpers({
  milestones: function() {
    var typeIndex = -1;
    var currentTypes = Tenants.findOne({
      _id: Meteor.user().group
    }).settings.project.types;
    for (var i = 0, len = currentTypes.length; i < len; i++) {
      if (currentTypes[i].id === this.id) {
        typeIndex = i;
        break;
      }
    }
    return currentTypes[typeIndex].milestones;
  }
});

Template.projectAdmin.events({
  'click #addProjectType': function() {
    Modal.show('createProjectType');
  }
});

Template.projectType.events({
  'click #addMilestone': function() {
    Modal.show('createProjectMilestone', this);
  },
  'click #editType': function() {
    Modal.show('updateProjectType', this);
  },
  'click #removeType': function() {
    var typeId = this.id;

    bootbox.confirm("Are you sure you wish to delete this project type?", function(result) {
      if (result === true) {

        Meteor.call('typeIsInUse', typeId, function(err, res) {
          if (err) throw new Meteor.Error(err);
          if (res.exitStatus === true) {
            toastr.error('This project type is currently in use, and cannot be deleted.');
          } else {
            Meteor.call('removeProjectType', typeId, function(error, result) {
              if (error) throw new Meteor.Error(error);
              if (result.exitCode === 0) {
                toastr.success('Project type deleted successfully.');
              } else {
                toastr.error('Project type not deleted: ' + result.exitStatus);
              }
            });
          }
        });

        bootbox.hideAll();
      }
    });
  }
});

Template.projectMilestone.events({
  'click #editMilestone': function(event, template) {
    var data = this;
    data.parentTypeId = Template.parentData().id;
    Modal.show('updateProjectMilestone', data);
  },
  'click #removeMilestone': function(event, template) {
    var typeId = Template.parentData().id;
    var milestoneId = template.data.id;

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
                toastr.error('Project milestone not deleted: ' + result.exitStatus);
              }
            });
          }
        });

        bootbox.hideAll();
      }
    });
  }

});