import './milestone-admin.html';
import './milestone-modals.js';


Template.projectAdmin.helpers({
  projectTypes: function() {
    //if (!Meteor.user()) return;
    return Tenants.findOne({
      _id: Meteor.user().group
    }).settings.project.types;
  }
});

Template.projectType.onRendered(function() {

});

Template.projectAdmin.events({
  'click #addProjectType': function(event) {
    event.preventDefault();

    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To create your own project types');
      return;
    }

    Modal.show('createProjectType');
  }
});

Template.projectType.events({
  'click #addMilestone': function(event) {
    event.preventDefault();
    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To create your own project type milestones');
      return;
    }

    Modal.show('createProjectMilestone', this);
  },
  'click #editType': function(event) {
    event.preventDefault();
    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To edit your project types');
      return;
    }
    Modal.show('updateProjectType', this);
  },
  'click #removeType': function(event) {
    event.preventDefault();
    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To delete your project types');
      return;
    }

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
  'click .projectMilestoneEntry': function(event, template) {

    event.preventDefault();
    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To edit your project milestones');
      return;
    }

    var data = this;
    data.parentTypeId = Template.parentData().id;
    Modal.show('updateProjectMilestone', data);
  },
  'click #removeMilestone': function(event, template) {
    event.preventDefault();
    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To delete your project types');
      return;
    }

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