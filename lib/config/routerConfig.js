Router.configure({
  layoutTemplate: 'AppLayout',
  waitOn: function() {
    return [
      // Meteor.subscribe('allTenants'),
      Meteor.subscribe('allNotifications')
    ];
  },
  data: function() {
    return {
      'tenants': g_Tenants.find({})
    };
  }
});
