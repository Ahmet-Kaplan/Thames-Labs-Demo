Template.activityList.onCreated(function() {
  // Redirect if read permission changed
   this.autorun(function() {
     if (!isProTenant(Meteor.user().group)) {
       showUpgradeToastr('To access the Activity List view');
       FlowRouter.go('/');
     }
   });

  this.totalActivities = new ReactiveVar(0);
});

Template.activityList.onRendered(function() {
  this.autorun(() => {
    this.totalActivities.set(Collections['activities'].index.getComponentDict().get('count'));
  });
});

Template.activityList.helpers({
  activityCount: function() {
     return Template.instance().totalActivities.get();
  },
  hasMultipleActivities: function() {
     return Template.instance().totalActivities.get() !== 1;
  }
});

Template.activityList.events({
  'click #export': function(event) {
    event.preventDefault();
    exportFromSearchToCSV('activities');
  }
});
