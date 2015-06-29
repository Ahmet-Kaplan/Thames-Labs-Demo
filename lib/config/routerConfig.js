Router.configure({
  layoutTemplate: 'AppLayout',
  waitOn: function() {
    return [
      subs.subscribe('userPresence'),
      subs.subscribe('allNotifications')
    ];
  }//,
  // data: function() {
  //   return {
  //     'tenants': Tenants.find({})
  //   };
  // }
});
