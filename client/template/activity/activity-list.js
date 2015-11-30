Template.activityList.onCreated(function() {
  // Redirect if read permission changed
  // this.autorun(function() {
  //   redirectWithoutPermission(Meteor.userId(), 'CanReadCompanies');
  // });
});

Template.activityList.events({
  'click #export': function(event) {
    event.preventDefault();
    exportFromSearchToCSV('activities');
  }
});
