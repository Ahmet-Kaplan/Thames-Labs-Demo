import './milestone-control.html';

import { Projects } from '/imports/api/collections.js';

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
    const projectId = FlowRouter.getParam('id'),
          project = Projects.findOne({
            _id: projectId
          }),
          milestones = getMilestones(project.projectTypeId),
          currentIndex = _.findIndex(milestones, { id: project.projectMilestoneId }),
          newIndex = currentIndex - 1,
          newMilestoneId = milestones[newIndex].id;

    Meteor.call('setMilestone', projectId, newMilestoneId);

  },
  'click #nextMilestone': function() {
    const projectId = FlowRouter.getParam('id'),
          project = Projects.findOne({
            _id: projectId
          }),
          milestones = getMilestones(project.projectTypeId),
          currentIndex = _.findIndex(milestones, { id: project.projectMilestoneId }),
          newIndex = currentIndex + 1,
          newMilestoneId = milestones[newIndex].id;

    Meteor.call('setMilestone', projectId, newMilestoneId);

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
