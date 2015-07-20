Template.projectDetail.onCreated(function() {
  // Redirect if data doesn't exist
  this.autorun(function() {
     var project = Projects.findOne(FlowRouter.getParam('id'));
     if (project) return
     FlowRouter.go('projects');
  });
});

Template.projectDetail.onRendered(function() {
  // Affix sidebar
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
    }
  });
});

Template.projectDetail.helpers({
  projectData: function() {
    var projectId = FlowRouter.getParam('id');
    return Projects.findOne(projectId);
  },
  managerName: function() {
    return Meteor.users.find({
      _id: this.userId
    }).fetch()[0].profile.name;
  },
  nextActionName: function() {
    return Meteor.users.find({
      _id: this.nextActionBy
    }).fetch()[0].profile.name;
  },
  contactName: function() {
    var c = Contacts.find({
      _id: this.contactId
    }).fetch()[0];
    return c.forename + " " + c.surname;
  }
});

Template.projectDetail.events({
  'click #add-activity': function() {
    Modal.show('insertProjectActivityModal', {
      project: this
    });
  },
  'click #edit-project': function() {
    Modal.show('updateProjectForm', this);
  },
});
