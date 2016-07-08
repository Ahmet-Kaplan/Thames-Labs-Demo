Template.milestoneControl.helpers({
  milestones: function() {
    var projectId = FlowRouter.getParam('id');

    var typeId = Projects.findOne({
      _id: projectId
    }).projectTypeId;
    return getMilestones(typeId);
  },
  isFirstStep: function() {
    var projectId = FlowRouter.getParam('id');
    var project = Projects.findOne({
      _id: projectId
    });
    var typeId = project.projectTypeId;
    var milestoneId = project.projectMilestoneId;
    var milestones = getMilestones(typeId);
    return milestones[0].id === milestoneId;
  },
  isLastStep: function() {
    var projectId = FlowRouter.getParam('id');
    var project = Projects.findOne({
      _id: projectId
    });
    var typeId = project.projectTypeId;
    var milestoneId = project.projectMilestoneId;
    var milestones = getMilestones(typeId);
    var lastIndex = milestones.length - 1;
    return milestones[lastIndex].id === milestoneId;
  }
});

Template.milestoneControl.events({
  'click #prevMilestone': function() {
    var projectId = FlowRouter.getParam('id');
    var userTenant = Tenants.findOne({
      _id: Meteor.user().group
    });

    Meteor.call('moveMilestone', projectId, "backward", function(err, res) {
      if (err) throw new Meteor.Error(err);
      if (res.exitCode === 0) {
        Projects.update({
          _id: projectId
        }, {
          $set: {
            projectMilestoneId: res.exitStatus
          }
        });
        toastr.success('Project milestone successfully updated.');
        var user = Meteor.user();

        var project = Projects.findOne({
          _id: projectId
        });
        var projectTypes = userTenant.settings.project.types;
        var projectType = null;
        _.each(projectTypes, function(pt) {
          if (pt.id == project.projectTypeId) projectType = pt;
        });

        if (projectType) {
          var milestones = projectType.milestones;
          var note = user.profile.name + ' moved this project to milestone "' + milestones[res.exitStatus].name + '"';
          var date = new Date();
          Activities.insert({
            type: 'Note',
            notes: note,
            createdAt: date,
            activityTimestamp: date,
            projectId: project._id,
            primaryEntityId: project._id,
            primaryEntityType: 'projects',
            primaryEntityDisplayData: project.name,
            createdBy: user._id
          });
        }

      } else {
        toastr.error('Project milestone could not be updated: ' + res.exitStatus);
      }
    });
  },
  'click #nextMilestone': function() {
    var projectId = FlowRouter.getParam('id');
    var userTenant = Tenants.findOne({
      _id: Meteor.user().group
    });

    Meteor.call('moveMilestone', projectId, "forward", function(err, res) {
      if (err) throw new Meteor.Error(err);
      if (res.exitCode === 0) {
        Projects.update({
          _id: projectId
        }, {
          $set: {
            projectMilestoneId: res.exitStatus
          }
        });
        toastr.success('Project milestone successfully updated.');

        var user = Meteor.user();

        var project = Projects.findOne({
          _id: projectId
        });
        var projectTypes = userTenant.settings.project.types;
        var projectType = null;
        _.each(projectTypes, function(pt) {
          if (pt.id == project.projectTypeId) projectType = pt;
        });

        if (projectType) {
          var milestones = projectType.milestones;
          var note = user.profile.name + ' moved this project to milestone "' + milestones[res.exitStatus].name + '"';
          var date = new Date();
          Activities.insert({
            type: 'Note',
            notes: note,
            createdAt: date,
            activityTimestamp: date,
            projectId: project._id,
            primaryEntityId: project._id,
            primaryEntityType: 'projects',
            primaryEntityDisplayData: project.name,
            createdBy: user._id
          });
        }

      } else {
        toastr.error('Project milestone could not be updated: ' + res.exitStatus);
      }
    });
  }
});

getMilestones = function(typeId) {
  var typeIndex = -1;
  var currentTypes = Tenants.findOne({
    _id: Meteor.user().group
  }).settings.project.types;
  for (var i = 0, len = currentTypes.length; i < len; i++) {
    if (currentTypes[i].id === typeId) {
      typeIndex = i;
      break;
    }
  }
  if (typeIndex !== -1) {
    return currentTypes[typeIndex].milestones;
  }
};
