Template.appLayout.helpers({
  hasMenuClass: function() {
    var loggedIn = (Meteor.userId() ? true : false);
    if (!loggedIn) {
      return 'no-menu';
    } else {
      return;
    }
  },
  maintenanceMode: function() {
    return ServerSession.get('maintenance') && !Roles.userIsInRole(Meteor.userId(), ['superadmin']);
  },
  subsReady: function() {
    return FlowRouter.subsReady();
  }
});

Template.appLayout.onRendered(function() {
  $.getScript('/vendor/bowser.min.js');

  this.autorun(function() {

    if (Session.get('tawkLoaded') === false) {
      var user = Meteor.user();

      var Tawk_API = Tawk_API || {},
        Tawk_LoadStart = new Date();

      if (user && user.group) {
        if (IsTenantPro(user.group)) {
          var s1 = document.createElement("script"),
            s0 = document.getElementsByTagName("script")[0];
          s1.async = true;
          s1.src = 'https://embed.tawk.to/' + Meteor.settings.public.tawkSiteId + '/default';
          s1.charset = 'UTF-8';
          s1.setAttribute('crossorigin', '*');
          s0.parentNode.insertBefore(s1, s0);
          s0.id = 'tawkScript'

          Session.set('tawkLoaded', true);
        }
      }
    }
  });
});

Template.appLayout.onCreated(function() {
  Session.set('tawkLoaded', false);
});