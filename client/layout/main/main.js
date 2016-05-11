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
  $("#id-view-content").swipe({
    swipeLeft:function(event) {
      console.log('swiped left');
      document.getElementById("id-view-sidemenu").className = "";
    },
    swipeRight:function(event) {
      console.log('swiped right');
      document.getElementById("id-view-sidemenu").className = "active";
    },
    threshold:75,
  });
});

Template.appLayout.onCreated(function() {
  this.autorun(function() {
    if (Meteor.user() && !Roles.userIsInRole(Meteor.userId(), ['superadmin'])) {
      var Tawk_API = Tawk_API || {},
        Tawk_LoadStart = new Date();

      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/' + Meteor.settings.public.tawkSiteId + '/default';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    }
  })
});
