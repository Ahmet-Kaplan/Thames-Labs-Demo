Template.adminStatistics.onCreated(function() {
  // Redirect if not superadmin
  this.autorun(function() {
    superAdminOnly(Meteor.userId());
  });
});

Template.adminStatistics.helpers({
  totalUsers: function() {
    return Meteor.users.find({group:{$exists:true}}).count();
  },
  totalTenants: function() {
    return Tenants.find({}).count();
  },
  freeTenants: function() {
    return Tenants.find({
      plan: 'free'
    }).count();
  },
  freePlusTenants: function() {
    return Tenants.find({
      plan: 'pro',
      'stripe.stripeSubs': {
        $exists: false
      }
    }).count();
  },
  proTenants: function() {
    return Tenants.find({
      plan: 'pro',
      'stripe.stripeSubs': {
        $exists: true
      }
    }).count();
  },
  activeTenants: function() {
    var currentDate = new Date();
    var dateWeekAgo = new Date();
    dateWeekAgo.setDate(currentDate.getDate() - 7);

    var tenantIDs = [];
    var users = Meteor.users.find({
      "profile.lastLogin": {
        $gte: dateWeekAgo,
        $lt: currentDate
      }
    }).fetch();

    _.each(users, function(user) {
      if (user.group) {
        var tenantId = user.group;
        if (tenantIDs.indexOf(tenantId) === -1) {
          tenantIDs.push(tenantId);
        }
      }
    });

    return tenantIDs.length;
  },
  loggedInThisWeek: function() {
    var currentDate = new Date();
    var dateWeekAgo = new Date();
    dateWeekAgo.setDate(currentDate.getDate() - 7);

    return Meteor.users.find({
      "profile.lastLogin": {
        $gte: dateWeekAgo,
        $lt: currentDate
      }
    }).count();
  },
  loggedInTwoWeek: function() {
    var currentDate = new Date();
    var dateWeekAgo = new Date();
    dateWeekAgo.setDate(currentDate.getDate() - 14);

    return Meteor.users.find({
      "profile.lastLogin": {
        $gte: dateWeekAgo,
        $lt: currentDate
      }
    }).count();
  },
  loggedInMonth: function() {
    var currentDate = new Date();
    var dateWeekAgo = new Date();
    dateWeekAgo.setDate(currentDate.getDate() - 28);

    return Meteor.users.find({
      "profile.lastLogin": {
        $gte: dateWeekAgo,
        $lt: currentDate
      }
    }).count();
  },
  remainingPdfCount: function() {
    if (!ServerSession.get('DocxToPdfRemaining')) return "??";
    return ServerSession.get('DocxToPdfRemaining');
  },
  freeUsers: function() {
    return ReactiveMethod.call('tenant.getUsersForTenants', 'free');
  },
  payingUsers: function() {
    return ReactiveMethod.call('tenant.getPayingUsers');
  },
  proUsers: function() {
    return ReactiveMethod.call('tenant.getUsersForTenants', 'pro');
  },
});