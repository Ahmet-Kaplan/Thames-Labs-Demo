Template.projectAdmin.helpers({
  projectTypes: function() {
    return Tenants.findOne({
      _id: Meteor.user().group
    }).settings.project.types;
  }
});

Template.projectType.helpers({
  milestones: function() {
    var typeIndex = -1;
    var currentTypes = Tenants.findOne({
      _id: Meteor.user().group
    }).settings.project.types;
    for (var i = 0, len = currentTypes.length; i < len; i++) {
      if (currentTypes[i].id === this.id) {
        typeIndex = i;
        break;
      }
    }
    return currentTypes[typeIndex].milestones;
  }
});
