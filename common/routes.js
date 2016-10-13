var subs = new SubsManager(),
    router = FlowRouter,
    layout = BlazeLayout;

import { Tenants } from '/imports/api/collections.js';

// These are route trigger functions
// They're used for before / after actions on routes

function tidyUpUI(context) {
  $("#id-view-sidemenu").removeClass("active");

  Modal.hide();
  $(".modal-backdrop").remove();
  $("body").removeClass('modal-open');
}

// These functions add the triggers to routes globally
router.triggers.exit(tidyUpUI);

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
router.route('/maintenance', {
  name: 'maintenance',
  action: function() {
    layout.render('appLayout', {
      main: "maintenanceAdmin"
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

      case 'company-info':
        layoutTemplate = 'companyInfoSettings';
        break;

      case 'import':
        layoutTemplate = 'importSettings';
        break;
      case 'email':
        layoutTemplate = 'emailSettings';
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
  }
});

router.route('/companies', {
  name: 'companies',
  action: function() {
    layout.render('appLayout', {
      main: 'companyList'
    });
  }
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

router.route('/jobs', {
  name: 'jobs',
  action: function() {
    layout.render('appLayout', {
      main: 'jobsList'
    });
  }
});

router.route('/jobs/:id', {
  name: 'job',
  subscriptions: function(params) {
    this.register('jobById', subs.subscribe('jobById', params.id));
  },
  action: function() {
    layout.render('appLayout', {
      main: 'jobDetail'
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
