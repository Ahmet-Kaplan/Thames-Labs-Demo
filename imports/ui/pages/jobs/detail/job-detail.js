import { Jobs, Tenants } from '/imports/api/collections.js';
import { StageChart } from '/imports/ui/components/charts/stage-chart.js';
import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';
import '/imports/ui/components/jobs/job-details-panel.js';
import '/imports/ui/components/jobs/milestones/milestone-control.js';
import '/imports/ui/components/custom-fields/custom-field-panel.js';
import '/imports/ui/components/tags/tag-input/tag-input.js';
import '/imports/ui/components/tasks/panel/task-panel.js';
import '/imports/ui/components/fab/fab-edit.js';
import '/imports/ui/components/activity/activity-timeline.js';
import '/imports/ui/components/watchlist/watchlist.js';
import './job-detail.html';

Template.jobDetail.onCreated(function() {
  var self = this;
  // Redirect if data doesn't exist
  this.autorun(function() {
    var job = Jobs.findOne(FlowRouter.getParam('id'));
    if (FlowRouter.subsReady() && typeof job === "undefined") {
      FlowRouter.go('jobs');
    }
    if (job) {
      self.subscribe('companyById', job.companyId);
      self.subscribe('contactById', job.contactId);
    }
  });

  // Redirect if read permission changed
  this.autorun(function() {
    permissionHelpers.redirectWithoutPermission(Meteor.userId(), 'CanReadJobs');
  });

  // Subscribe to necessary data
  var jobId = FlowRouter.getParam('id');
  this.subscribe('activityByJobId', jobId);
  this.subscribe('tasksByEntityId', jobId);
});

Template.jobDetail.onRendered(function() {
  this.chart = new StageChart('#d3-stage-chart');

  var job = Jobs.findOne(FlowRouter.getParam('id'));

  const tenant = Tenants.findOne(Meteor.user().group),
        types = tenant.settings.job.types,
        type = types[job.jobTypeId],
        milestones = type.milestones;

  milestones.forEach( (d) => {
    d.title = d.name;
  });

  job.currentStageIndex = _.findIndex(milestones, {id: job.jobMilestoneId});

  this.chart.draw(job, milestones);

  var resize = () => {
    this.chart.resize(job, milestones);
  };

  this.chartResizeEventHandler = window.addEventListener("resize", resize);

  this.autorun( () => {
    job = Jobs.findOne(FlowRouter.getParam('id'));
    job.currentStageIndex = _.findIndex(milestones, {id: job.jobMilestoneId});
    this.chart.setForce(job, milestones);
  });

  //Update job milestone when dragged
  this.chart._dragCallBack = (jobId, closestStageId) => {
    Meteor.call('setMilestone', jobId, closestStageId);
  };

});

Template.jobDetail.helpers({
  breadcrumbName: function() {
    return (this.sequencedIdentifier ? "Job #" + this.sequencedIdentifier : "Job");
  },
  inverseState: function() {
    if(this.active)return "inactive";
    return "active";
  },
  jobType: function() {
    var typeIndex = -1;
    var currentTypes = Tenants.findOne({
      _id: Meteor.user().group
    }).settings.job.types;

    if (currentTypes.length === 0) {
      var data = [];
      var jobType = {
        id: 0,
        name: "Standard Job",
        milestones: [{
          name: "Inception",
          description: "This is a newly-created job",
          id: 0
        }, {
          name: "Completion",
          description: "This job has been completed",
          id: 1
        }]
      };
      data.push(jobType);
      Tenants.update({
        _id: Meteor.user().group
      }, {
        $set: {
          'settings.job.types': data
        }
      });
    }

    for (var i = 0, len = currentTypes.length; i < len; i++) {
      if (currentTypes[i].id === this.jobTypeId) {
        typeIndex = i;
        break;
      }
    }
    if (typeIndex !== -1) {
      return currentTypes[typeIndex].name;
    }
  },
  jobData: function() {
    var jobId = FlowRouter.getParam('id');
    var job = Jobs.findOne(jobId);
    if (job && job.tags) {
      job.tags.sort();
    }
    return job;
  }
});

Template.jobDetail.events({
  'click #invertJobState': function(e, t) {
    event.preventDefault();
    Meteor.call('job.invertState', this._id);
  },
  'click #add-activity': function(event) {
    event.preventDefault();
    Modal.show('insertJobActivityModal', {
      job: this
    });
  }
});

Template.jobDetail.onDestroyed(function() {
  window.removeEventListener("resize", this.chartResizeEventHandler);
});
