var subs = new SubsManager(),
  group = Partitioner.group(),
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
var adminRoutes = ['tenants', 'notifications', 'statistics', 'audit'];
var loggedOutRoutes = ['sign-up'];
router.triggers.enter(superAdminOnly, {
  only: adminRoutes
});
router.triggers.enter(normalUserOnly, {
  except: adminRoutes
});
router.triggers.enter(loggedOutUserOnly, {
  only: loggedOutRoutes
});
router.triggers.exit(tidyUpModals);

// These are global subscriptions
// Since they're global there's no need to use SubsManager
router.subscriptions = function() {
  this.register('userPresence', Meteor.subscribe('userPresence'));
  this.register('allNotifications', Meteor.subscribe('allNotifications'));
  this.register('auditData', Meteor.subscribe('auditData'));
  this.register('currentTenantUserData', subs.subscribe('currentTenantUserData', group));
  this.register('activeTenantData', subs.subscribe('activeTenantData', group));
};

router.notFound = {
  action: function() {
    layout.render('appLayout', {
      main: 'placeholder'
    });
  }
};

// ADMIN only route
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

// ADMIN only route
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

// ADMIN only route
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

// ADMIN only route
router.route('/audit', {
  name: 'audit',
  subscriptions: function() {
    this.register('allTenants', subs.subscribe('allTenants'));
    this.register('allUserData', subs.subscribe('allUserData'));
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
  subscriptions: function() {
    this.register('allChatter', subs.subscribe('allChatter'));
    this.register('allUserTasks', subs.subscribe('allUserTasks', Meteor.userId()));
  },
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
  /*triggersEnter: [function(context, redirect) {
    if (!Roles.userIsInRole(Meteor.userId(), 'Administrator')) {
      redirect('dashboard');
    }
  }] */
});

router.route('/companies', {
  name: 'companies',
  subscriptions: function() {
    this.register('allCompanies', subs.subscribe('allCompanies'));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'companyList'
    });
  },
  // triggersEnter: [function(context, redirect) {
  //   if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanReadCompanies'])) {
  //     redirect('dashboard');
  //   }
  // }]
});

router.route('/companies/:id', {
  name: 'company',
  subscriptions: function(params) {
    this.register('companyById', subs.subscribe('companyById', params.id));
    this.register('contactsByCompanyId', subs.subscribe('contactsByCompanyId', params.id));
    this.register('projectsByCompanyId', subs.subscribe('projectsByCompanyId', params.id));
    this.register('activityByCompanyId', subs.subscribe('activityByCompanyId', params.id));
    this.register('purchaseOrdersByCompanyId', subs.subscribe('purchaseOrdersByCompanyId', params.id));
    this.register('companyTags', subs.subscribe('companyTags'));
    this.register('tasksByEntityId', subs.subscribe('tasksByEntityId', params.id));
    this.register('opportunitiesByCompanyId', subs.subscribe('opportunitiesByCompanyId', params.id));
    this.register('opportunityStages', subs.subscribe('opportunityStages'));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'companyDetail'
    });
  },
  // triggersEnter: [function(context, redirect) {
  //   if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanReadCompanies'])) {
  //     redirect('dashboard');
  //   }
  // }]
});

router.route('/contacts', {
  name: 'contacts',
  subscriptions: function() {
    this.register('allContacts', subs.subscribe('allContacts'));
    this.register('allCompanies', subs.subscribe('allCompanies'));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'contactList'
    });
  },
  // triggersEnter: [function(context, redirect) {
  //   if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanReadContacts'])) {
  //     redirect('dashboard');
  //   }
  // }]
});

router.route('/contacts/:id', {
  name: 'contact',
  subscriptions: function(params) {
    this.register('contactById', subs.subscribe('contactById', params.id));
    this.register('activityByContactId', subs.subscribe('activityByContactId', params.id));
    this.register('tasksByEntityId', subs.subscribe('tasksByEntityId', params.id));
    this.register('projectsByContactId', subs.subscribe('projectsByContactId', params.id));
    this.register('purchaseOrdersByContactId', subs.subscribe('purchaseOrdersByContactId', params.id));
    this.register('contactTags', subs.subscribe('contactTags'));
    this.register('opportunitiesByContactId', subs.subscribe('opportunitiesByContactId', params.id));
    this.register('opportunityStages', subs.subscribe('opportunityStages'));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'contactDetail'
    });
  },
  // triggersEnter: [function(context, redirect) {
  //   if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanReadContacts'])) {
  //     redirect('dashboard');
  //   }
  // }]
});

router.route('/projects', {
  name: 'projects',
  subscriptions: function() {
    this.register('allProjects', subs.subscribe('allProjects'));
    this.register('allContacts', subs.subscribe('allContacts'));
    this.register('allCompanies', subs.subscribe('allCompanies'));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'projectsList'
    });
  },
  // triggersEnter: [function(context, redirect) {
  //   if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanReadProjects'])) {
  //     redirect('dashboard');
  //   }
  // }]
});

router.route('/projects/:id', {
  name: 'project',
  subscriptions: function(params) {
    this.register('projectById', subs.subscribe('projectById', params.id));
    this.register('companyByProjectId', subs.subscribe('companyByProjectId', params.id));
    this.register('activityByProjectId', subs.subscribe('activityByProjectId', params.id));
    this.register('contactsByProjectId', subs.subscribe('contactsByProjectId', params.id));
    this.register('tasksByEntityId', subs.subscribe('tasksByEntityId', params.id));
    this.register('projectTags', subs.subscribe('projectTags'));
    this.register('opportunityByProjectId', subs.subscribe('opportunityByProjectId', params.id));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'projectDetail'
    });
  },
  // triggersEnter: [function(context, redirect) {
  //   if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanReadProjects'])) {
  //     redirect('dashboard');
  //   }
  // }]
});

router.route('/purchaseorders', {
  name: 'purchaseOrders',
  subscriptions: function() {
    this.register('allPurchaseOrders', subs.subscribe('allPurchaseOrders'));
    this.register('allCompanies', subs.subscribe('allCompanies'));
    this.register('allProjects', subs.subscribe('allProjects'));
    this.register('allContacts', subs.subscribe('allContacts'));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'purchaseOrderList'
    });
  },
  // triggersEnter: [function(context, redirect) {
  //   if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanReadPurchaseOrders'])) {
  //     redirect('dashboard');
  //   }
  // }]
});

router.route('/purchaseorders/:id', {
  name: 'purchaseOrder',
  subscriptions: function(params) {
    this.register('purchaseOrderById', subs.subscribe('purchaseOrderById', params.id));
    this.register('allPurchaseOrderItems', subs.subscribe('allPurchaseOrderItems', params.id));
    this.register('companyByPurchaseOrderId', subs.subscribe('companyByPurchaseOrderId', params.id));
    this.register('projectByPurchaseOrderId', subs.subscribe('projectByPurchaseOrderId', params.id));
    this.register('activityByPurchaseOrderId', subs.subscribe('activityByPurchaseOrderId', params.id));
    this.register('contactByPurchaseOrderId', subs.subscribe('contactByPurchaseOrderId', params.id));
    this.register('tasksByEntityId', subs.subscribe('tasksByEntityId', params.id));
    // this.register('purchaseOrderTags', subs.subscribe('purchaseOrderTags'));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'purchaseOrderDetail'
    });
  },
  // triggersEnter: [function(context, redirect) {
  //   if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanReadPurchaseOrders'])) {
  //     redirect('dashboard');
  //   }
  // }]
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
  // triggersEnter: [function(context, redirect) {
  //   if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanReadTasks'])) {
  //     redirect('dashboard');
  //   }
  // }]
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
  // triggersEnter: [function(context, redirect) {
  //   if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanReadDataManagement'])) {
  //     redirect('dashboard');
  //   }
  // }]
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
  // triggersEnter: [function(context, redirect) {
  //   if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanReadEventLog'])) {
  //     redirect('dashboard');
  //   }
  // }]
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
  // triggersEnter: [function(context, redirect) {
  //   if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanReadProducts'])) {
  //     redirect('dashboard');
  //   }
  // }]
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
  // triggersEnter: [function(context, redirect) {
  //   if (!Roles.userIsInRole(Meteor.userId(), ['Administrator', 'CanReadProducts'])) {
  //     redirect('dashboard');
  //   }
  // }]
});

router.route('/opportunities', {
  name: 'opportunities',
  subscriptions: function() {
    this.register('allOpportunities', subs.subscribe('allOpportunities'));
    this.register('allContacts', subs.subscribe('allContacts'));
    this.register('allCompanies', subs.subscribe('allCompanies'));
    this.register('opportunityStages', subs.subscribe('opportunityStages'));
    this.register('opportunityTags', subs.subscribe('opportunityTags'));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'opportunityList'
    });
  }
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
  }
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
  }
});
