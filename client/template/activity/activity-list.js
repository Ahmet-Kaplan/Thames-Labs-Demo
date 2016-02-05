Template.activityList.onCreated(function() {
  // Redirect if read permission changed
  // this.autorun(function() {
  //   redirectWithoutPermission(Meteor.userId(), 'CanReadCompanies');
  // });

    if (!IsTenantPro(Meteor.user().group)) {
      ShowUpgradeToastr('To access the Activity List view');
      FlowRouter.go('/');
    }
});

Template.activityList.events({
  'click #export': function(event) {
    event.preventDefault();
    exportFromSearchToCSV('activities');
  }
});
