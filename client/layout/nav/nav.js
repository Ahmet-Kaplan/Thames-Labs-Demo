Template.nav.helpers({
  loggedIn: function() {
    return (Meteor.userId() ? true : false);
  },
  userName: function() {
    if (!Meteor.userId()) {
      return false;
    }

    var sName = '';
    if (!Roles.userIsInRole(Meteor.user(), ['superadmin'])) {
      sName = Meteor.users.find({
        _id: Meteor.userId()
      }).fetch()[0].profile.name;
    }

    return sName;
  }
});

Template.nav.events({
  "click #tenancy-one": function() {
    Meteor.call('switchTenancy', Meteor.userId(), 'JsdTxQCWWoDxNFnbf');
    window.location.reload();
  },
  "click #tenancy-two": function() {
    Meteor.call('switchTenancy', Meteor.userId(), 'PBXf8D4FLTZaPsJjg');
    window.location.reload();
  },
  "click #tenancy-three": function() {
    Meteor.call('switchTenancy', Meteor.userId(), '5yzHfQ96PuhuETdho');
    window.location.reload();
  },
  'click #feedback-link': function() {
    Modal.show('feedbackModal');
  },
  'click #btnChangePassword': function() {
    Modal.show('changePassword');
  },
  'click #sign-out': function() {
    Meteor.logout();
  }
});
