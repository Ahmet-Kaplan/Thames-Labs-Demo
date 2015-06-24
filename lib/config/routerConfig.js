Router.configure({
  layoutTemplate: 'AppLayout',
  waitOn: function() {
    return [
      // Meteor.subscribe('allTenants'),
      subs.subscribe('allNotifications')
    ];
  },
  data: function() {
    return {
      'tenants': g_Tenants.find({})
    };
  }
});
