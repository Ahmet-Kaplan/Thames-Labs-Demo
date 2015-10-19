Meteor.methods({
  setDemoDataFlag: function(val) {
    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      return;
    }
    ServerSession.set('populatingDemoData', val);
  }
});
