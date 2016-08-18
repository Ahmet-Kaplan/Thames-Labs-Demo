import './feedback.html';

Template.feedbackModal.helpers({
  'userName': function() {
    let sName = "Super Admin";
    if (!Roles.userIsInRole(Meteor.user(), ['superadmin'])) {
      sName = Meteor.user().profile.name;
    }
    return sName;
  },
  'emailAddress': function() {
    let eAdd = "admin@cambridgesoftware.co.uk";
    if (!Roles.userIsInRole(Meteor.user(), ['superadmin'])) {
      eAdd = Meteor.user().emails[0].address;
    }
    return eAdd;
  },
  'currentUrl': function() {
    return FlowRouter.current().path;
  }
});