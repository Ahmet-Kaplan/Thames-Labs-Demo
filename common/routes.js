var subs = new SubsManager(),
  router = FlowRouter,
  layout = BlazeLayout;

// These are route trigger functions
// They're used for before / after actions on routes
var superAdminOnly = function(context, redirect) {
  var user = Meteor.user();
  if (user !== undefined && !Roles.userIsInRole(user, 'superadmin')) {
    redirect('dashboard');
  }
};

var normalUserOnly = function(context, redirect) {
  var user = Meteor.user();
  if (user !== undefined && Roles.userIsInRole(user, 'superadmin')) {
    redirect('tenants');
  }
};

var loggedOutUserOnly = function(context, redirect) {
  var user = Meteor.user();
  if (user) {
    redirect('dashboard');
  }
};

var permissionRequired = function() {
  // Returns a function which tests for the permissions given as arguments
  var args = _.toArray(arguments);
  return function(context, redirect) {
    if (Meteor.user() && !Roles.userIsInRole(Meteor.userId(), args)) {
      redirect('dashboard');
    }
  };
};

var tidyUpModals = function(context) {
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
};

// These functions add the triggers to routes globally
var superAdminRoutes = ['tenants', 'notifications', 'statistics', 'audit'];
var loggedOutRoutes = ['sign-up'];
router.triggers.enter(superAdminOnly, {
  only: superAdminRoutes
});
router.triggers.enter(normalUserOnly, {
  except: superAdminRoutes
});
router.triggers.enter(loggedOutUserOnly, {
  only: loggedOutRoutes
});
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
  subscriptions: function() {
    this.register('allTenants', subs.subscribe('allTenants'));
    this.register('allUserData', subs.subscribe('allUserData'));
    this.register('auditData', subs.subscribe('auditData'));
  },
  action: function() {
    layout.render('appLayout', {
      main: "auditLog"
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
    this.register('opportunityStages', subs.subscribe('opportunityStages'));
  },
  action: function() {
    layout.render('appLayout', {
      main: "tenancyAdminPage"
    });
  },
  triggersEnter: [permissionRequired('Administrator')]
});

router.route('/companies', {
  name: 'companies',
  action: function() {
    layout.render('appLayout', {
      main: 'companyList'
    });
  },
  triggersEnter: [permissionRequired('Administrator', 'CanReadCompanies')]
});

router.route('/companies/:id', {
  name: 'company',
  subscriptions: function(params) {
    this.register('companyById', subs.subscribe('companyById', params.id));
    this.register('companyTags', subs.subscribe('companyTags'));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'companyDetail'
    });
  },
  triggersEnter: [permissionRequired('Administrator', 'CanReadCompanies')]
});

router.route('/contacts', {
  name: 'contacts',
  action: function() {
    layout.render('appLayout', {
      main: 'contactList'
    });
  },
  triggersEnter: [permissionRequired('Administrator', 'CanReadContacts')]
});

router.route('/contacts/:id', {
  name: 'contact',
  subscriptions: function(params) {
    this.register('contactById', subs.subscribe('contactById', params.id));
    this.register('contactTags', subs.subscribe('contactTags'));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'contactDetail'
    });
  },
  triggersEnter: [permissionRequired('Administrator', 'CanReadContacts')]
});

router.route('/projects', {
  name: 'projects',
  action: function() {
    layout.render('appLayout', {
      main: 'projectsList'
    });
  },
  triggersEnter: [permissionRequired('Administrator', 'CanReadProjects')]
});

router.route('/projects/:id', {
  name: 'project',
  subscriptions: function(params) {
    this.register('projectById', subs.subscribe('projectById', params.id));
    this.register('projectTags', subs.subscribe('projectTags'));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'projectDetail'
    });
  },
  triggersEnter: [permissionRequired('Administrator', 'CanReadProjects')]
});

router.route('/purchaseorders', {
  name: 'purchaseOrders',
  action: function() {
    layout.render('appLayout', {
      main: 'purchaseOrderList'
    });
  },
  triggersEnter: [permissionRequired('Administrator', 'CanReadPurchaseOrders')]
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
  },
  triggersEnter: [permissionRequired('Administrator', 'CanReadPurchaseOrders')]
});

router.route('/tasks', {
  name: 'tasks',
  subscriptions: function() {
    this.register('allUserTasks', subs.subscribe('allUserTasks', Meteor.userId()));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'taskList'
    });
  },
  triggersEnter: [permissionRequired('Administrator', 'CanReadTasks')]
});

router.route('/datamanagement', {
  name: 'datamanagement',
  subscriptions: function() {
    this.register('allCompanies', subs.subscribe('allCompanies', Meteor.userId()));
    this.register('allContacts', subs.subscribe('allContacts', Meteor.userId()));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'datamanagement'
    });
  },
  triggersEnter: [permissionRequired('Administrator', 'CanReadDataManagement')]
});

router.route('/events', {
  name: 'events',
  subscriptions: function() {
    this.register('allUserData', subs.subscribe('allUserData'));
    this.register('eventLogData', subs.subscribe('eventLogData', Meteor.userId()));
    this.register('allProjects', subs.subscribe('allProjects'));
    this.register('allContacts', subs.subscribe('allContacts'));
    this.register('allCompanies', subs.subscribe('allCompanies'));
    this.register('allPurchaseOrders', subs.subscribe('allPurchaseOrders'));
  },
  action: function() {
    layout.render('appLayout', {
      main: "events"
    });
  },
  triggersEnter: [permissionRequired('Administrator', 'CanReadEventLog')]
});

router.route('/products', {
  name: 'products',
  subscriptions: function() {
    this.register('allProducts', subs.subscribe('allProducts'));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'productList'
    });
  },
  triggersEnter: [permissionRequired('Administrator', 'CanReadProducts')]
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
  },
  triggersEnter: [permissionRequired('Administrator', 'CanReadProducts')]
});

router.route('/opportunities', {
  name: 'opportunities',
  action: function() {
    layout.render('appLayout', {
      main: 'opportunityList'
    });
  },
  triggersEnter: [permissionRequired('Administrator', 'CanReadOpportunities')]
});

router.route('/opportunities/:id', {
  name: 'opportunity',
  subscriptions: function(params) {
    this.register('opportunityStages', subs.subscribe('opportunityStages'));
    this.register('opportunityById', subs.subscribe('opportunityById', params.id));
    this.register('companyByOpportunityId', subs.subscribe('companyByOpportunityId', params.id));
    this.register('contactByOpportunityId', subs.subscribe('contactByOpportunityId', params.id));
    this.register('activityByOpportunityId', subs.subscribe('activityByOpportunityId', params.id));
    this.register('tasksByEntityId', subs.subscribe('tasksByEntityId', params.id));
    this.register('opportunityTags', subs.subscribe('opportunityTags'));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'opportunityDetail'
    });
  },
  triggersEnter: [permissionRequired('Administrator', 'CanReadOpportunities')]
});

router.route('/salespipeline', {
  name: 'salespipeline',
  subscriptions: function() {
    this.register('allOpportunities', subs.subscribe('allOpportunities'));
    this.register('opportunityStages', subs.subscribe('opportunityStages'));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'salesPipeline'
    });
  },
  triggersEnter: [permissionRequired('Administrator', 'CanReadOpportunities')]
});
