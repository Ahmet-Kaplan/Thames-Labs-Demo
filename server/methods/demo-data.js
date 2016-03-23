Meteor.methods({
  setDemoDataFlag: function(val) {
    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      return;
    }
    ServerSession.set('populatingDemoData', val);
  },
  setProgress: function(step, total) {
    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      return;
    }
    ServerSession.set('demoDataProgress', {completed: step, total: total});
  }
});
