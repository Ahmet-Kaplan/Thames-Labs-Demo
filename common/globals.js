GetDisallowedPermissions = function(userId){
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
  PurchaseOrderPrefix: "",
  PurchaseOrderStartingValue: 0,
  extInfo: {
    company: [],
    contact: []
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

//Soft limit for records
MAX_RECORDS = 50;
