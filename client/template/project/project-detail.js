Template.projectDetail.onCreated(function() {
  // Redirect if data doesn't exist
  this.autorun(function() {
     var project = Projects.findOne(FlowRouter.getParam('id'));
     if (FlowRouter.subsReady() && project === undefined) {
       FlowRouter.go('projects');
     }
  });

  // Redirect if read permission changed - we also check the initial load in the router
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadProjects');
  });
});

Template.projectDetail.onRendered(function() {
  // Affix sidebar
  var sidebar = $('.sidebar');
  if (sidebar) {
    if (!bowser.mobile && !bowser.tablet) {
      sidebar.affix({
        offset: {
          top: sidebar.offset().top
        }
      });
    }
  }
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
  // nextActionName: function() {
  //   return Meteor.users.find({
  //     _id: this.nextActionBy
  //   }).fetch()[0].profile.name;
  // },
  contactName: function() {
    var c = Contacts.find({
      _id: this.contactId
    }).fetch()[0];
    return c.forename + " " + c.surname;
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
