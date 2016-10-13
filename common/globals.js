import { Tenants } from '/imports/api/collections.js';

isProTenant = function(tenantId) {
  if (tenantId) {
    const tenant = Tenants.findOne({
      _id: tenantId
    });

    if (!tenant || !tenant.stripe) return false;

    if (typeof tenant.stripe.stripeSubs !== 'undefined') {
      return true;
    }
  }
  return false;
};

getDisallowedPermissions = function(userId) {
  const collectionsToFilter = [];
  const perms = ['companies', 'contacts', 'opportunities', 'jobs', 'tasks', 'purchaseorders'];

  _.each(perms, function(p) {
    const perm = permissionGenerator('read', p);
    if (!Roles.userIsInRole(userId, perm)) {
      collectionsToFilter.push(p);
    }
  });
  return collectionsToFilter;
};

LogLevel = {
  Debug: 'debug',
  Verbose: 'verbose',
  Info: 'info',
  Warning: 'warning',
  Error: 'error',
  Fatal: 'fatal'
};

tenancyDefaultSettings = {
  extInfo: {
    company: [],
    contact: [],
    job: [],
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
  job: {
    defaultNumber: 1,
    types: [{
      id: 0,
      name: "Standard Job",
      milestones: [{
        name: "Inception",
        description: "This is a newly-created job",
        id: 0
      }, {
        name: "Completion",
        description: "This job has been completed",
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
  displayName: 'Jobs',
  collectionName: 'jobs',
  value: 'Jobs'
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
  collectionName: 'eventLog',
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
  "Administrator",
  "CanReadContacts",
  "CanReadCompanies",
  "CanCreateCompanies",
  "CanEditCompanies",
  "CanDeleteCompanies",
  "CanCreateContacts",
  "CanEditContacts",
  "CanDeleteContacts",
  "CanReadJobs",
  "CanCreateJobs",
  "CanEditJobs",
  "CanDeleteJobs",
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
    throw new Meteor.Error(`${operation} is not a valid operation`);
  }
  const permission = _.find(permissions, {'collectionName': collectionName});
  if (!permission) {
    throw new Meteor.Error(`No permissions found for ${collectionName}`);
  }
  return ['Can', _.startCase(operation), permission.value].join('');
};

//Free plan user limit
MAX_FREE_USERS = 1;

//Default notification display limit
NOTICE_LIMIT = 3;
