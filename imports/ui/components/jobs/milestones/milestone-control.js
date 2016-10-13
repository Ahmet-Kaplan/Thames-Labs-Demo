import './milestone-control.html';

import { Jobs, Tenants } from '/imports/api/collections.js';

Template.milestoneControl.helpers({
  milestones: function() {
    var jobId = FlowRouter.getParam('id');

    var typeId = Jobs.findOne({
      _id: jobId
    }).jobTypeId;
    return getMilestones(typeId);
  },
  isFirstStep: function() {
    var jobId = FlowRouter.getParam('id');
    var job = Jobs.findOne({
      _id: jobId
    });
    var typeId = job.jobTypeId;
    var milestoneId = job.jobMilestoneId;
    var milestones = getMilestones(typeId);
    return milestones[0].id === milestoneId;
  },
  isLastStep: function() {
    var jobId = FlowRouter.getParam('id');
    var job = Jobs.findOne({
      _id: jobId
    });
    var typeId = job.jobTypeId;
    var milestoneId = job.jobMilestoneId;
    var milestones = getMilestones(typeId);
    var lastIndex = milestones.length - 1;
    return milestones[lastIndex].id === milestoneId;
  }
});

Template.milestoneControl.events({
  'click #prevMilestone': function() {
    const jobId = FlowRouter.getParam('id'),
          job = Jobs.findOne({
            _id: jobId
          }),
          milestones = getMilestones(job.jobTypeId),
          currentIndex = _.findIndex(milestones, { id: job.jobMilestoneId }),
          newIndex = currentIndex - 1,
          newMilestoneId = milestones[newIndex].id;

    Meteor.call('setMilestone', jobId, newMilestoneId);

  },
  'click #nextMilestone': function() {
    const jobId = FlowRouter.getParam('id'),
          job = Jobs.findOne({
            _id: jobId
          }),
          milestones = getMilestones(job.jobTypeId),
          currentIndex = _.findIndex(milestones, { id: job.jobMilestoneId }),
          newIndex = currentIndex + 1,
          newMilestoneId = milestones[newIndex].id;

    Meteor.call('setMilestone', jobId, newMilestoneId);

  }
});

getMilestones = function(typeId) {
  var typeIndex = -1;
  var currentTypes = Tenants.findOne({
    _id: Meteor.user().group
  }).settings.job.types;
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
