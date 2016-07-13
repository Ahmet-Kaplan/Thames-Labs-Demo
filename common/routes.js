var subs = new SubsManager(),
    router = FlowRouter,
    layout = BlazeLayout;

// These are route trigger functions
// They're used for before / after actions on routes

function tidyUpModals(context) {
  Modal.hide();
  $(".modal-backdrop").remove();
  $("body").removeClass('modal-open');

  //cancel any active tours (might need updating to prevent closing the Welcome Tour, should it actively switch between pages)
  //we can do this using the following code (comparison might need changing)
  if (hopscotch.getCurrTour()) {
    // var tourName = hopscotch.getCurrTour();
    // if (tourName !== "welcome") {

    //For now, let's just brute-force cancel the tour
    hopscotch.endTour();
    // }
  }
}

// Adjust Heap settings to replace their crazy user ID with something more readable
function setHeapParams(context) {
  if (Roles.userIsInRole(Meteor.userId(), 'superadmin')) return;

  var user = Meteor.users.findOne({
    _id: Meteor.userId()
  });
  if (!user) return;
  var profile = user.profile;
  if (!profile) return;

  if (heap) {
    var name = profile.name;
    var tenant = Tenants.findOne({
      _id: user.group
    });
    var tenantName = (tenant ? " (" + tenant.name + ")" : '');

    var identifier = name + tenantName;
    heap.identify(identifier);
    heap.addUserProperties({
      'Name': name,
      'Tenant': (tenant ? tenant.name : '')
    });
  }
}

FlowRouter.triggers.enter([setHeapParams]);


// These functions add the triggers to routes globally
router.triggers.exit(tidyUpModals);

// These are global subscriptions
// Since they're global there's no need to use SubsManager
router.subscriptions = function() {
  this.register('currentTenantUserData', Meteor.subscribe('currentTenantUserData'));
  this.register('activeTenantData', Meteor.subscribe('activeTenantData'));
};

router.notFound = {
  action: function() {
    layout.render('appLayout', {
      main: 'placeholder'
    });
  }
};

// SUPERADMIN only route
router.route('/tenants', {
  name: 'tenants',
  subscriptions: function() {
    this.register('allTenants', subs.subscribe('allTenants'));
    this.register('allUserData', subs.subscribe('allUserData'));
  },
  action: function() {
    layout.render('appLayout', {
      main: "tenantList"
    });
  }
});

// SUPERADMIN only route
router.route('/notifications', {
  name: 'notifications',
  subscriptions: function() {
    this.register('allNotifications', subs.subscribe('allNotifications'));
  },
  action: function() {
    layout.render('appLayout', {
      main: "notificationAdmin"
    });
  }
});

// SUPERADMIN only route
router.route('/statistics', {
  name: 'statistics',
  subscriptions: function() {
    this.register('allTenants', subs.subscribe('allTenants'));
    this.register('allUserData', subs.subscribe('allUserData'));
  },
  action: function() {
    layout.render('appLayout', {
      main: "adminStatistics"
    });
  }
});

// SUPERADMIN only route
router.route('/audit', {
  name: 'audit',
  action: function() {
    layout.render('appLayout', {
      main: "eventLog"
    });
  }
});

// SUPERADMIN only route
router.route('/jobs', {
  name: 'jobs-queue',
  action: function() {
    layout.render('appLayout', {
      main: "jobsQueue"
    });
  }
});

// LOGGED OUT USER ONLY route
router.route('/sign-up', {
  name: 'sign-up',
  action: function() {
    layout.render('signUpLayout', {
      main: "signUp"
    });
  }
});

router.route('/sign-up/:coupon', {
  name: 'sign-up',
  action: function(params) {
    layout.render('signUpLayout', {
      main: "signUp",
      coupon: params.coupon
    });
  }
});

// NORMAL USER routes follow

router.route('/', {
  name: 'dashboard',
  action: function() {
    layout.render('appLayout', {
      main: "dashboard"
    });
  }
});

router.route('/admin', {
  name: 'administration',
  subscriptions: function() {
    this.register('globalCustomFields', subs.subscribe('globalCustomFields'));
  },
  action: function() {
    layout.render('appLayout', {
      main: "tenancyAdminPage"
    });
  }
});

//Settings
router.route('/settings', {
  name: 'settings',
  action: function() {
    FlowRouter.go('/settings/profile');
  }
});

router.route('/settings/:section', {
  name: 'settings',
  action: function(params) {
    let layoutTemplate = 'profileSettings';
    switch(params.section) {
      case 'users':
        layoutTemplate = 'userSettings';
        break;

      case 'billing':
        layoutTemplate = 'billingSettings';
        break;

      case 'configuration':
        layoutTemplate = 'configurationSettings';
        break;
    }

    layout.render('appLayout', {
      main: layoutTemplate
    });
  }
});

//Other routes
router.route('/activities', {
  name: 'activities',
  action: function() {
    layout.render('appLayout', {
      main: 'activityList'
    });
  },
});

router.route('/companies', {
  name: 'companies',
  action: function() {
    layout.render('appLayout', {
      main: 'companyList'
    });
  },
});

router.route('/companies/:id', {
  name: 'company',
  subscriptions: function(params) {
    this.register('companyById', subs.subscribe('companyById', params.id));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'companyDetail'
    });
  }
});

router.route('/contacts', {
  name: 'contacts',
  action: function() {
    layout.render('appLayout', {
      main: 'contactList'
    });
  }
});

router.route('/contacts/:id', {
  name: 'contact',
  subscriptions: function(params) {
    this.register('contactById', subs.subscribe('contactById', params.id));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'contactDetail'
    });
  }
});

router.route('/projects', {
  name: 'projects',
  action: function() {
    layout.render('appLayout', {
      main: 'projectsList'
    });
  }
});

router.route('/projects/:id', {
  name: 'project',
  subscriptions: function(params) {
    this.register('projectById', subs.subscribe('projectById', params.id));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'projectDetail'
    });
  }
});

router.route('/purchaseorders', {
  name: 'purchaseOrders',
  action: function() {
    layout.render('appLayout', {
      main: 'purchaseOrderList'
    });
  }
});

router.route('/purchaseorders/:id', {
  name: 'purchaseOrder',
  subscriptions: function(params) {
    this.register('purchaseOrderById', subs.subscribe('purchaseOrderById', params.id));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'purchaseOrderDetail'
    });
  }
});

router.route('/tasks', {
  name: 'tasks',
  action: function() {
    layout.render('appLayout', {
      main: 'taskList'
    });
  }
});

router.route('/tasks/:id', {
  name: 'task',
  subscriptions: function(params) {
    this.register('taskById', subs.subscribe('taskById', params.id));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'taskDetail'
    });
  }
});

router.route('/events', {
  name: 'events',
  action: function() {
    layout.render('appLayout', {
      main: "events"
    });
  }
});

router.route('/products', {
  name: 'products',
  action: function() {
    layout.render('appLayout', {
      main: 'productList'
    });
  }
});

router.route('/products/:id', {
  name: 'product',
  subscriptions: function(params) {
    this.register('productById', subs.subscribe('productById', params.id));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'productDetail'
    });
  }
});

router.route('/opportunities', {
  name: 'opportunities',
  action: function() {
    layout.render('appLayout', {
      main: 'opportunityList'
    });
  }
});

router.route('/opportunities/:id', {
  name: 'opportunity',
  subscriptions: function(params) {
    this.register('opportunityById', subs.subscribe('opportunityById', params.id));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'opportunityDetail'
    });
  }
});

router.route('/salespipeline/:id?', {
  name: 'salespipeline',
  action: function() {
    layout.render('appLayout', {
      main: 'salesPipeline'
    });
  }
});
