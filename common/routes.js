var subs = new SubsManager(),
    group = Partitioner.group(),
    router = FlowRouter,
    layout = FlowLayout;

// These are route trigger functions
// They're used for before / after actions on routes
var superAdminOnly = function(context, redirect) {
  var user = Meteor.user();
  if (user !== undefined && !Roles.userIsInRole(user, 'superadmin') ) {
    redirect('dashboard');
  }
};

var normalUserOnly = function(context, redirect) {
  var user = Meteor.user();
  if (user !== undefined && Roles.userIsInRole(user, 'superadmin')) {
    redirect('tenants');
  }
};

var tidyUpModals = function(context) {
  $(".modal-backdrop").remove();
  $("body").removeClass('modal-open');
};

// These functions add the triggers to routes globally
var adminRoutes = ['tenants', 'notifications', 'statistics'];
router.triggers.enter(superAdminOnly, {
  only: adminRoutes
});
router.triggers.enter(normalUserOnly, {
  except: adminRoutes
});
router.triggers.exit(tidyUpModals);

// These are global subscriptions
// Since they're global there's no need to use SubsManager
router.subscriptions = function() {
    this.register('userPresence', Meteor.subscribe('userPresence'));
    this.register('allNotifications', Meteor.subscribe('allNotifications'));
    this.register('allFeatures', Meteor.subscribe('allFeatures'));
};

router.notFound = {
  action: function() {
    layout.render('appLayout', { main: 'placeholder' });
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
    layout.render('appLayout', { main: "tenantList" });
  }
});

// ADMIN only route
router.route('/notifications', {
  name: 'notifications',
  subscriptions: function() {
    this.register('allNotifications', subs.subscribe('allNotifications'));
    this.register('allFeatures', subs.subscribe('allFeatures'));
  },
  action: function() {
    layout.render('appLayout', { main: "notificationAdmin" });
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
    layout.render('appLayout', { main: "adminStatistics" });
  }
});

// NO USER route
router.route('/sign-up', {
  name: 'sign-up',
  action: function() {
    if (Meteor.userId()) {
      redirect('dashboard');
    }
    layout.render('signUpLayout', { main: "signUp" });
  }
});

// NORMAL USER routes follow

router.route('/', {
  name: 'dashboard',
  subscriptions: function() {
    this.register('currentTenantUserData', subs.subscribe('currentTenantUserData', group));
    this.register('allChatter', subs.subscribe('allChatter'));
    this.register('allUserTasks', subs.subscribe('allUserTasks', Meteor.userId()));
  },
  action: function() {
    layout.render('appLayout', { main: "dashboard" });
  }
});

router.route('/companies', {
  name: 'companies',
  subscriptions: function() {
    this.register('allCompanies', subs.subscribe('allCompanies'));
  },
  action: function() {
    layout.render('appLayout', { main: 'companyList' });
  }
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
    this.register('currentTenantUserData', subs.subscribe('currentTenantUserData', group));
  },
  action: function() {
    layout.render('appLayout', { main: 'companyDetail' });
  }
});

router.route('/contacts', {
  name: 'contacts',
  subscriptions: function() {
    this.register('allContacts', subs.subscribe('allContacts'));
    this.register('allCompanies', subs.subscribe('allCompanies'));
  },
  action: function() {
    layout.render('appLayout', { main: 'contactList' });
  }
});

router.route('/contacts/:id', {
  name: 'contact',
  subscriptions: function(params) {
    this.register('contactById', subs.subscribe('contactById', params.id));
    this.register('companyByContactId', subs.subscribe('companyByContactId', params.id));
    this.register('activityByContactId', subs.subscribe('activityByContactId', params.id));
    this.register('tasksByEntityId', subs.subscribe('tasksByEntityId', params.id));
    this.register('contactTags', subs.subscribe('contactTags'));
  },
  action: function() {
    layout.render('appLayout', { main: 'contactDetail' });
  }
});

router.route('/projects', {
  name: 'projects',
  subscriptions: function() {
    this.register('allProjects', subs.subscribe('allProjects'));
    this.register('allContacts', subs.subscribe('allContacts'));
    this.register('allCompanies', subs.subscribe('allCompanies'));
  },
  action: function() {
    layout.render('appLayout', { main: 'projectsList' });
  }
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
  },
  action: function() {
    layout.render('appLayout', { main: 'projectDetail' });
  }
});

router.route('/purchaseorders', {
  name: 'purchaseOrders',
  subscriptions: function() {
    this.register('allPurchaseOrders', subs.subscribe('allPurchaseOrders'));
    this.register('allCompanies', subs.subscribe('allCompanies'));
  },
  action: function() {
    layout.render('appLayout', { main: 'purchaseOrderList' });
  }
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
    layout.render('appLayout', { main: 'purchaseOrderDetail' });
  }
});

router.route('/tasks', {
  name: 'tasks',
  subscriptions: function() {
    this.register('allUserTasks', subs.subscribe('allUserTasks', Meteor.userId()));
  },
  action: function() {
    layout.render('appLayout', { main: 'taskList' });
  }
});

router.route('/datamanagement', {
  name: 'datamanagement',
  subscriptions: function() {
    this.register('allCompanies', subs.subscribe('allCompanies', Meteor.userId()));
    this.register('allContacts', subs.subscribe('allContacts', Meteor.userId()));
  },
  action: function() {
    layout.render('appLayout', { main: 'datamanagement' });
  }
});
