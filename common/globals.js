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
  value: 'Companies'
}, {
  displayName: 'Contacts',
  value: 'Contacts'
}, {
  displayName: 'Projects',
  value: 'Projects'
}, {
  displayName: 'Products',
  value: 'Products'
}, {
  displayName: 'Tasks',
  value: 'Tasks'
}, {
  displayName: 'Purchase Orders',
  value: 'PurchaseOrders'
}, {
  displayName: 'Event Log',
  value: 'EventLog'
}, {
  displayName: 'Opportunities',
  value: 'Opportunities'
}];

//Soft limit for records
MAX_RECORDS = 50;
