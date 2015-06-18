Router.configure({
  layoutTemplate: 'AppLayout',
  waitOn: function(){
    return Meteor.subscribe('allTenants');
  },
  data: function() {
    return {
      'tenants': g_Tenants.find({})
    };
  }
});
