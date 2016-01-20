Meteor.methods({
  setDemoDataFlag: function(val) {
    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      return;
    }
    ServerSession.set('populatingDemoData', val);
  },
  setProgress: function(step){
    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      return;
    }
    ServerSession.set('demoDataProgress', step/100);
  }
});
