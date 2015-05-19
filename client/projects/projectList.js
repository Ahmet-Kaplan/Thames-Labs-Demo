Template.projectsList.onRendered(function() {
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
    }
  });
});

Template.projectsList.helpers({
  hasProjects: function() {
    return Projects.find({}).count() > 0;
  }
});

Template.projectsList.events({
  'click #add-project': function() {
    Modal.show('newProjectForm', this);
  },
})

Template.projectListItem.helpers({
  companyName: function() {
    var project = this;
    var comp = Companies.findOne({
      _id: project.companyId
    });

    if (comp) {
      return comp.name;
    } else {
      return null;
    }
  }
});
