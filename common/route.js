subs = new SubsManager();
var group = Partitioner.group();

Router.onAfterAction(function() {

  if (!Meteor.user() && !Meteor.loggingIn()) {

    this.render('login');

  } else if (Meteor.user() && !Meteor.loggingIn()) {

    if (Roles.userIsInRole(Meteor.user(), ['superadmin'])) {

      if (Router.current().route.getName() === 'tenants' || Router.current().route.getName() === 'notifications') {

      } else {

        this.redirect('/tenants');

      }

    } else {

      if (Router.current().route.getName() === 'tenants' || Router.current().route.getName() === 'notifications') {

        this.redirect('/');

      }
    }

  } else {

    if (Roles.userIsInRole(Meteor.user(), ['superadmin'])) {

      this.redirect('/tenants');

    } else {

      this.redirect('/');

    }
  }

});

// Router.onBeforeAction(function() {
//   if (Meteor.user()) {
//     this.next();
//   } else {
//     this.render('login');
//   }
// });
//
// Router.onBeforeAction(function() {
//   if (Roles.userIsInRole(Meteor.user(), ['superadmin'])) {
//     this.next();
//   } else {
//     this.redirect('/');
//   }
// }, {
//   only: ['tenants', 'notifications']
// });
//
// Router.onBeforeAction(function() {
//   if (!Roles.userIsInRole(Meteor.user(), ['superadmin'])) {
//     this.next();
//   } else {
//     this.redirect('/tenants');
//   }
// }, {
//   only: ['dashboard']
// });
//
Router.onBeforeAction(function() {
  GoogleMaps.load();
  this.next();
}, {
  only: ['company']
});

Router.configure({
  progressSpinner : false,
  progressDelay : 50
});

Router.route('/tenants', {
  name: 'tenants',
  template: 'tenantList',
  waitOn: function() {
    return [
      subs.subscribe('allTenants'),
      subs.subscribe('allUserData')
    ];
  }
});

Router.route('/notifications', {
  name: 'notifications',
  template: 'notificationAdmin',
  waitOn: function() {
    return [
      subs.subscribe('allNotifications')
    ];
  }
});

Router.route('/', {
  name: 'dashboard',
  template: 'dashboard',
  waitOn: function() {
    if (Meteor.user()) {
      return [
        subs.subscribe('currentTenantUserData', group),
        subs.subscribe('allChatter'),
        subs.subscribe('allUserTasks', Meteor.userId()),
      ];
    }
  }
});


Router.route('/campaigns', {
  name: 'campaigns',
  template: 'campaignList'
});


Router.route('/companies', {
  name: 'companies',
  template: 'companyList',
  waitOn: function() {
    return [subs.subscribe("allCompanies")];
  },
  data: function() {
    return {
      'companies': Companies.find({})
    };
  }
});
Router.route('/companies/:_id', {
  name: 'company',
  template: 'companyDetail',
  waitOn: function() {
    return [
      subs.subscribe("companyById", this.params._id),
      subs.subscribe("contactsByCompanyId", this.params._id),
      subs.subscribe("projectsByCompanyId", this.params._id),
      subs.subscribe('activityByCompanyId', this.params._id),
      subs.subscribe('purchaseOrdersByCompanyId', this.params._id),
      subs.subscribe('tasksByEntityId', this.params._id),
      subs.subscribe('currentTenantUserData', group)
    ];
  },
  data: function() {
    return Companies.findOne(this.params._id);
  },
  action: function() {
    this.render();
  }
});
Router.route('/customers', {
  name: 'customers',
  template: 'companyList',
  waitOn: function() {
    return [subs.subscribe("allCompanies")]; // NOTE: TBC, may need to change
  },
  data: function() {
    return {
      'companies': Companies.find({})
    };
  }
});
Router.route('/customers/:_id', {
  name: 'customer',
  template: 'companyDetail',
  waitOn: function() {
    return [
      subs.subscribe("companyById", this.params._id),
      subs.subscribe("contactsByCompanyId", this.params._id),
      subs.subscribe("projectsByCompanyId", this.params._id),
      subs.subscribe('activityByCompanyId', this.params._id),
      subs.subscribe('purchaseOrdersByCompanyId', this.params._id),
      subs.subscribe('tasksByEntityId', this.params._id),
      subs.subscribe('currentTenantUserData', group)
    ];
  },
  data: function() {
    return Companies.findOne(this.params._id);
  }
});
Router.route('/suppliers', {
  name: 'suppliers',
  template: 'companyList',
  waitOn: function() {
    return [subs.subscribe("allCompanies")]; // NOTE: TBC, may need to change
  },
  data: function() {
    return {
      'companies': Companies.find({})
    };
  }
});
Router.route('/suppliers/:_id', {
  name: 'supplier',
  template: 'companyDetail',
  waitOn: function() {
    return [
      subs.subscribe("companyById", this.params._id),
      subs.subscribe("contactsByCompanyId", this.params._id),
      subs.subscribe("projectsByCompanyId", this.params._id),
      subs.subscribe('activityByCompanyId', this.params._id),
      subs.subscribe('purchaseOrdersByCompanyId', this.params._id),
      subs.subscribe('tasksByEntityId', this.params._id),
      subs.subscribe('currentTenantUserData', group)
    ];
  },
  data: function() {
    return Companies.findOne(this.params._id);
  }
});


Router.route('/contacts', {
  name: 'contacts',
  template: 'contactList',
  waitOn: function() {
    return [
      subs.subscribe('allContacts'),
      subs.subscribe('allCompanies')
    ];
  },

  data: function() {
    return {
      'contacts': Contacts.find({})
    };
  }
});
Router.route('/contacts/:_id', {
  name: 'contact',
  template: 'contactDetail',
  waitOn: function() {
    return [
      subs.subscribe("contactById", this.params._id),
      subs.subscribe('companyById', Contacts.findOne(this.params._id).companyId),
      subs.subscribe('activityByContactId', this.params._id),
      subs.subscribe('tasksByEntityId', this.params._id),
      subs.subscribe('currentTenantUserData', group)
    ];
  },
  data: function() {
    return Contacts.findOne(this.params._id);
  }
});

Router.route('/opportunities', {
  name: 'opportunities',
  template: 'projectsList',

  waitOn: function() {
    return [
      subs.subscribe('allProjects'), // NOTE: TBC, may need to change
      subs.subscribe('allContacts'),
      subs.subscribe('allCompanies')
    ];
  },

  data: function() {
    return {
      'projects': Projects.find({})
    };
  }
});
Router.route('/opportunities/:_id', {
  name: 'opportunity',
  template: 'projectDetail',
  waitOn: function() {
    return [
      subs.subscribe("projectById", this.params._id),
      subs.subscribe('companyById', Projects.findOne(this.params._id).companyId),
      subs.subscribe('activityByProjectId', this.params._id),
      subs.subscribe('contactsByCompanyId', Projects.findOne(this.params._id).companyId),
      subs.subscribe('tasksByEntityId', this.params._id),
      subs.subscribe('currentTenantUserData', group)
    ];
  },
  data: function() {
    return Projects.findOne(this.params._id);
  }
});
Router.route('/projects', {
  name: 'projects',
  template: 'projectsList',

  waitOn: function() {
    return [
      subs.subscribe('allProjects'),
      subs.subscribe('allContacts'),
      subs.subscribe('allCompanies')
    ];
  },

  data: function() {
    return {
      'projects': Projects.find({})
    };
  }
});
Router.route('/projects/:_id', {
  name: 'project',
  template: 'projectDetail',
  waitOn: function() {
    return [
      subs.subscribe("projectById", this.params._id),
      subs.subscribe('companyById', Projects.findOne(this.params._id).companyId),
      subs.subscribe('activityByProjectId', this.params._id),
      subs.subscribe('contactsByCompanyId', Projects.findOne(this.params._id).companyId),
      subs.subscribe('tasksByEntityId', this.params._id),
      subs.subscribe('currentTenantUserData', group)
    ];
  },
  data: function() {
    return Projects.findOne(this.params._id);
  }
});


Router.route('/procurements', {
  name: 'procurements',
  template: 'procurementList'
});
Router.route('/purchaseorders', {
  name: 'purchase-orders',
  template: 'purchaseOrderList',

  waitOn: function() {
    return [
      subs.subscribe('allPurchaseOrders'),
      subs.subscribe('allCompanies')
    ];
  },

  data: function() {
    return {
      'purchaseOrders': PurchaseOrders.find({})
    };
  }
});
Router.route('/purchaseorders/:_id', {
  name: 'purchase-order',
  template: 'purchaseOrderDetail',
  waitOn: function() {
    return [
      subs.subscribe("projectById", PurchaseOrders.findOne(this.params._id).projectId),
      subs.subscribe('companyById', PurchaseOrders.findOne(this.params._id).supplierCompanyId),
      subs.subscribe('activityByPurchaseOrderId', this.params._id),
      subs.subscribe('contactById', PurchaseOrders.findOne(this.params._id).supplierContactId),
      subs.subscribe('purchaseOrderById', this.params._id),
      subs.subscribe('allPurchaseOrderItems', this.params._id),
      subs.subscribe('tasksByEntityId', this.params._id),
      subs.subscribe('currentTenantUserData', group)
    ];
  },
  data: function() {
    return PurchaseOrders.findOne(this.params._id);
  }
});



Router.route('/contracts', {
  name: 'contracts',
  template: 'contractList'
});


Router.route('/tickets', {
  name: 'tickets',
  template: 'ticketList'
});


Router.route('/auditlog', {
  name: 'auditlog',
  template: 'report'
});


Router.route('/employees', {
  name: 'employees',
  template: 'employeeList'
});


Router.route('/holidays', {
  name: 'holidays',
  template: 'holidayList'
});


Router.route('/absences', {
  name: 'absences',
  template: 'absenceList'
});


Router.route('/timesheets', {
  name: 'timesheets',
  template: 'timesheetList'
});


Router.route('/templates', {
  name: 'templates',
  template: 'templateList'
});


Router.route('/products', {
  name: 'products',
  template: 'productList'
});


Router.route('/components', {
  name: 'components',
  template: 'componentList'
});


Router.route('/invoices', {
  name: 'invoices',
  template: 'invoiceList'
});


Router.route('/tasks', {
  name: 'tasks',
  template: 'taskList'
});


Router.route('/profile', {
  name: 'profile',
  template: 'userProfile'
});
