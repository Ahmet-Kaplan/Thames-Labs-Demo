Template.feedbackModal.helpers({
  'userName': function() {
    var sName = "Super Admin";
    if (!Roles.userIsInRole(Meteor.user(), ['superadmin'])) {
      sName = Meteor.user().profile.name;
    }
    return sName;
  },
  'currentUrl': function() {
    return Router.current().url;
  }
});
