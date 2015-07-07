Template.feedbackModal.helpers({
  'userName': function() {
    var sName = "Super Admin";
    if (!Roles.userIsInRole(Meteor.user(), ['superadmin'])) {
      sName = Meteor.user().profile.name;
    }
    return sName;
  },
  'emailAddress': function() {
    var eAdd = "admin@cambridgesoftware.co.uk";
    if (!Roles.userIsInRole(Meteor.user(), ['superadmin'])) {
      eAdd = Meteor.user().emails[0].address;
    }
    return eAdd;
  },
  'currentUrl': function() {
    return Router.current().url;
  }
});
