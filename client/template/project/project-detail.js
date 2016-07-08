import { StageChart } from '/imports/ui/components/charts/stage-chart.js';
import { Meteor } from 'meteor/meteor';

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

  const id = FlowRouter.getParam('id');

  var typeId = Projects.findOne({_id: id}).projectTypeId;

  var typeIndex = -1;
  var currentTypes = Tenants.findOne(Meteor.user().group).settings.project.types;
  for (var i = 0, len = currentTypes.length; i < len; i++) {
    if (currentTypes[i].id === typeId) {
      typeIndex = i;
      break;
    }
  }
  if(typeIndex !== -1) {
    var stages = currentTypes[typeIndex].milestones;
  }

  stages.forEach( (d) => {
    d.title = d.name;
  });

  var project = Projects.findOne(id);

  this.chart.draw(project, stages);
  // this.chartResizeEventHandler = window.addEventListener("resize", this.chart.draw(opportunity, stages));

  this.autorun( () => {
    project = Projects.findOne(id);
    project.currentStageIndex = _.findIndex(stages, {id: project.projectMilestoneId});
    this.chart.update(project, stages);
  });

  //Update opp stage when dragged
  this.chart._dragCallBack = (projectId, closestStageId) => {
    if (closestStageId > project.currentStageIndex) {
      var direction = "forward";
    }

    Meteor.call('moveMilestone', projectId, direction, (err, res) => {
      if (err) toastr.error(err.error);
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
      }
    });
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
