ShowUpgradeToastr = function(preambleMessage) {
  toastr.warning(preambleMessage + ", please upgrade to the PRO plan. You can do this by clicking this message.", "RealTimeCRM", {
    timeOut: 0,
    closeButton: true,
    "debug": false,
    "newestOnTop": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": true,
    "onclick": function() {
      Modal.show('stripeSubscribe', this);
    },
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  });
};

IsTenantPro = function(tenantId) {
  if (tenantId) {
    var tenant = Tenants.findOne({
      _id: tenantId
    });

    if (!tenant || !tenant.stripe) return false;

    if (tenant.stripe.paying === true || tenant.stripe.freeUnlimited === true) {
      return true;
    }
  }
  return false;
};

TenantUserCount = function(tenantId) {
  if (tenantId) {
    return Meteor.users.find({
      group: tenantId
    }).count();
  }
};

GetDisallowedPermissions = function(userId) {
  var collectionsToFilter = [];
  var perms = ['companies', 'contacts', 'opportunities', 'projects', 'tasks', 'purchaseorders'];
  for (var p in perms) {
    var perm = permissionGenerator('read', perms[p]);

    if (!Roles.userIsInRole(userId, perm)) {
      collectionsToFilter.push(perms[p]);
    }
  }
  return collectionsToFilter;
};

tenancyDefaultSettings = {
  extInfo: {
    company: [],
    contact: [],
    project: [],
    product: []
  },
  activity: {
    defaultNumber: 1,
  },
  task: {
    defaultNumber: 1,
  },
  company: {
    defaultNumber: 1,
  },
  contact: {
    defaultNumber: 1,
  },
  opportunity: {
    defaultNumber: 1,
    stages: [{
      title: "Exploration",
      description: "Exploring whether there is a need that your product or service can fulfill",
      id: 0
    }, {
      title: "Fact finding",
      description: "Finding the key people, whether a budget exists, timescales, competitors pitching",
      id: 1
    }, {
      title: "Solution",
      description: "Preparing your solution based on what you know from your fact finding",
      id: 2
    }, {
      title: "Negotiation",
      description: "Negotiating the sale of the solution, confirming price, delivery and other out-of-contract aspects",
      id: 3
    }, {
      title: "Objections",
      description: "Dealing with any objections to the negotiated solution in order to win the business",
      id: 4
    }]
  },
  project: {
    defaultNumber: 1,
    types: [{
      id: 0,
      name: "Standard Project",
      milestones: [{
        name: "Inception",
        description: "This is a newly-created project",
        id: 0
      }, {
        name: "Completion",
        description: "This project has been completed",
        id: 1
      }]
    }]
  },
  purchaseorder: {
    defaultPrefix: "",
    defaultNumber: 1,
  },
  product: {
    defaultNumber: 1,
  }
};

availableTours = [
  'dashboard',
  'companies',
  'company'
];

permissions = [{
  displayName: 'Companies',
  collectionName: 'companies',
  value: 'Companies'
}, {
  displayName: 'Contacts',
  collectionName: 'contacts',
  value: 'Contacts'
}, {
  displayName: 'Projects',
  collectionName: 'projects',
  value: 'Projects'
}, {
  displayName: 'Products',
  collectionName: 'products',
  value: 'Products'
}, {
  displayName: 'Tasks',
  collectionName: 'tasks',
  value: 'Tasks'
}, {
  displayName: 'Purchase Orders',
  collectionName: 'purchaseorders',
  value: 'PurchaseOrders'
}, {
  displayName: 'Event Log',
  collectionName: 'auditLog',
  value: 'EventLog'
}, {
  displayName: 'Opportunities',
  collectionName: 'opportunities',
  value: 'Opportunities'
}];

permissionOperations = [
  'read',
  'create',
  'edit',
  'delete'
];

defaultPermissionsList = [
  "CanReadContacts",
  "CanReadCompanies",
  "CanCreateCompanies",
  "CanEditCompanies",
  "CanDeleteCompanies",
  "CanCreateContacts",
  "CanEditContacts",
  "CanDeleteContacts",
  "CanReadProjects",
  "CanCreateProjects",
  "CanEditProjects",
  "CanDeleteProjects",
  "CanReadProducts",
  "CanCreateProducts",
  "CanEditProducts",
  "CanDeleteProducts",
  "CanReadTasks",
  "CanCreateTasks",
  "CanEditTasks",
  "CanDeleteTasks",
  "CanReadPurchaseOrders",
  "CanCreatePurchaseOrders",
  "CanEditPurchaseOrders",
  "CanDeletePurchaseOrders",
  "CanReadEventLog",
  "CanCreateEventLog",
  "CanEditEventLog",
  "CanDeleteEventLog",
  "CanReadOpportunities",
  "CanCreateOpportunities",
  "CanEditOpportunities",
  "CanDeleteOpportunities"
];

permissionGenerator = function(operation, collectionName) {
  operation = operation.toLowerCase();
  if (!_.includes(permissionOperations, operation)) {
    throw new Meteor.Error(operation + ' is not a valid operation')
  }
  var permission = _.find(permissions, 'collectionName', collectionName);
  if (!permission) {
    throw new Meteor.Error('No permissions found for ' + collectionName);
  }
  return ['Can', _.startCase(operation), permission.value].join('');
};

//Free plan user limit
MAX_FREE_USERS = 2;

//Extended information field free plan limits
MAX_FREE_ENTITY_GLOBAL_FIELDS = 5;
MAX_FREE_ENTITY_LOCAL_FIELDS = 5;

//Watchlist free plan limits
MAX_FREE_WATCHLIST_RECORDS = 5;

//Default notification display limit
NOTICE_LIMIT = 3;