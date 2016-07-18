import { StageChart } from '/imports/ui/components/charts/stage-chart.js';
import '/imports/ui/components/custom-fields/custom-field-panel.js';

Template.projectDetail.onCreated(function() {
  var self = this;
  // Redirect if data doesn't exist
  this.autorun(function() {
    var project = Projects.findOne(FlowRouter.getParam('id'));
    if (FlowRouter.subsReady() && typeof project === "undefined") {
      FlowRouter.go('projects');
    }
    if (project) {
      self.subscribe('companyById', project.companyId);
      self.subscribe('contactById', project.contactId);
    }
  });

  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadProjects');
  });

  // Subscribe to necessary data
  var projectId = FlowRouter.getParam('id');
  this.subscribe('activityByProjectId', projectId);
  this.subscribe('tasksByEntityId', projectId);
  this.subscribe('opportunitiesByProjectId', projectId);
});

Template.projectDetail.onRendered(function() {
  this.chart = new StageChart('#d3-stage-chart');

  var project = Projects.findOne(FlowRouter.getParam('id'));

  const tenant = Tenants.findOne(Meteor.user().group),
        types = tenant.settings.project.types,
        type = types[project.projectTypeId],
        milestones = type.milestones;

  milestones.forEach( (d) => {
    d.title = d.name;
  });

  project.currentStageIndex = _.findIndex(milestones, {id: project.projectMilestoneId});

  this.chart.draw(project, milestones);

  var resize = () => {
    this.chart.resize(project, milestones);
  };

  this.chartResizeEventHandler = window.addEventListener("resize", resize);

  this.autorun( () => {
    project = Projects.findOne(FlowRouter.getParam('id'));
    project.currentStageIndex = _.findIndex(milestones, {id: project.projectMilestoneId});
    this.chart.setForce(project, milestones);
  });

  //Update project milestone when dragged
  this.chart._dragCallBack = (projectId, closestStageId) => {
    Meteor.call('setMilestone', projectId, closestStageId);
  };

});

Template.projectDetail.helpers({
  inverseState: function() {
    if(this.active)return "inactive";
    return "active";
  },
  projectType: function() {
    var typeIndex = -1;
    var currentTypes = Tenants.findOne({
      _id: Meteor.user().group
    }).settings.project.types;

    if (currentTypes.length === 0) {
      var data = [];
      var projectType = {
        id: 0,
        name: "Standard Project",
        milestones: [{
          name: "Inception",
          description: "This is a newly-created project",
          id: 0
        }, {
          name: "Completion",
          description: "This project has been completed",
          id: 1
        }]
      };
      data.push(projectType);
      Tenants.update({
        _id: Meteor.user().group
      }, {
        $set: {
          'settings.project.types': data
        }
      });
    }

    for (var i = 0, len = currentTypes.length; i < len; i++) {
      if (currentTypes[i].id === this.projectTypeId) {
        typeIndex = i;
        break;
      }
    }
    if (typeIndex !== -1) {
      return currentTypes[typeIndex].name;
    }
  },
  projectData: function() {
    var projectId = FlowRouter.getParam('id');
    var project = Projects.findOne(projectId);
    if (project && project.tags) {
      project.tags.sort();
    }
    return project;
  },
  managerName: function() {
    return Meteor.users.find({
      _id: this.userId
    }).fetch()[0].profile.name;
  },
  opportunityId: function() {
    var opp = Opportunities.findOne({
      projectId: this._id
    });
    if (opp) return opp._id;
  },
  friendlyDueDate: function() {
    return moment(this.dueDate).format('MMMM Do YYYY, h:mma');
  },
  staffList: function() {
    var staffList = "";
    for (var i = 0; i < this.staff.length; i++) {
      var name = Meteor.users.find({
        _id: this.staff[i]
      }).fetch()[0].profile.name;
      staffList = staffList + name + ", ";
    }
    staffList = staffList.substring(0, staffList.length - 2);
    return staffList;
  }
});

Template.projectDetail.events({
  'click #invertProjectState': function(e, t) {
    event.preventDefault();
    Meteor.call('project.invertState', this._id);
  },
  'click #add-activity': function(event) {
    event.preventDefault();
    Modal.show('insertProjectActivityModal', {
      project: this
    });
  },
  'click #edit-project': function(event) {
    event.preventDefault();
    Modal.show('updateProjectForm', this);
  },
  'click #remove-project': function(event) {
    event.preventDefault();
    var projectId = this._id;

    bootbox.confirm("Are you sure you wish to delete this project?", function(result) {
      if (result === true) {
        Projects.remove(projectId);
      }
    });
  },
  'click #fab': function(event) {
    event.preventDefault();
    Modal.show('updateProjectForm', this);
  }
});

Template.projectDetail.onDestroyed(function() {
  window.removeEventListener("resize", this.chartResizeEventHandler);
});
