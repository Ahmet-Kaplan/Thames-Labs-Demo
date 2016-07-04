import '/imports/startup/client';

Template.appLayout.helpers({
  hasMenuClass: function() {
    // var loggedIn = (Meteor.userId() ? true : false);
    if (!Meteor.userId()) {
      return 'no-menu';
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
  if (bowser.mobile || Meteor.isCordova) {
    $("#id-view-content").swipe({
      swipeLeft: function(event) {
        console.log('swiped left');
        document.getElementById("id-view-sidemenu").className = "";
      },
      swipeRight: function(event) {
        console.log('swiped right');
        document.getElementById("id-view-sidemenu").className = "active";
      },
      threshold: 75
    });
  }

  /* eslint-disable camelcase*/
  this.autorun(function() {
    const visitor = Meteor.user();
    const tenant = (typeof visitor !== 'undefined') ? Tenants.findOne({
      _id: visitor.group
    }) : null;
    if(typeof visitor !== 'undefined' && !!tenant) {
      Meteor.call('tawkTo.UserInfo', function(err, res) {
        if(!!res && typeof Tawk_API !== 'undefined' && _.get(Tawk_API, 'setAttributes')) {
          Tawk_API.setAttributes(res);
        }
      });
    }
  });
  /* eslint-enable camelcase*/
});

Template.appLayout.onCreated(function() {
  if(Meteor.isProduction && !Roles.userIsInRole(Meteor.userId(), ['superadmin']) && Meteor.user().emails[0].address.indexOf('@cambridgesoftware.co.uk') === -1 && !Meteor.isTest) {
    $.getScript('https://embed.tawk.to/56b333a5fe87529955d980fa/default');
  }
});
