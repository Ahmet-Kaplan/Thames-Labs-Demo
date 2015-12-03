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
      } else {
        toastr.error('Project milestone could not be updated: ' + res.exitStatus);
      }
    });
  },
  'click #nextMilestone': function() {
    var projectId = FlowRouter.getParam('id');
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
      } else {
        toastr.error('Project milestone could not be updated: ' + res.exitStatus);
      }
    });
  }
});

Template.milestone.helpers({
  isCurrentStep: function() {
    var projectId = FlowRouter.getParam('id');

    var milestoneId = Projects.findOne({
      _id: projectId
    }).projectMilestoneId;
    return this.id === milestoneId;
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
