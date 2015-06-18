Template.nav.onRendered(function() {
  $('#feedback-link').click(function() {
    Modal.show('feedbackModal');
  });
});

Template.nav.helpers({
  loggedIn: function() {
    return (Meteor.userId() ? true : false);
  },
  userName: function() {
    var sName = '';
    if (!Roles.userIsInRole(Meteor.user(), ['superadmin'])) {
      sName = Meteor.users.find({
        _id: Meteor.userId()
      }).fetch()[0].profile.name;
    }

    return sName;
  }

  // currentTenant: function() {
  //   var groupId = Meteor.users.find({
  //     _id: Meteor.userId()
  //   }).fetch()[0].group;
  //
  //   return g_Tenants.find({
  //     _id: groupId
  //   }).fetch()[0].TenantName;
  // }
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
  }
});
