Template.projectDetail.onCreated(function() {
  var self = this;
  // Redirect if data doesn't exist
  this.autorun(function() {
     var project = Projects.findOne(FlowRouter.getParam('id'));
     if (FlowRouter.subsReady() && project === undefined) {
       FlowRouter.go('projects');
     }
     if (project) {
       self.subscribe('companyById', project.companyId);
       self.subscribe('contactById', project.contactId);
     }
  });

  // Redirect if read permission changed - we also check the initial load in the router
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadProjects');
  });

  // Subscribe to necessary data
  var projectId = FlowRouter.getParam('id');
  this.subscribe('activityByProjectId', projectId);
  this.subscribe('tasksByEntityId', projectId);
  this.subscribe('opportunitiesByProjectId', projectId);
});

Template.projectDetail.helpers({
  projectData: function() {
    var projectId = FlowRouter.getParam('id');
    var project = Projects.findOne(projectId);
    if (project.tags !== undefined) {
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
    var opp = Opportunities.findOne({projectId: this._id});
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
  }
});
