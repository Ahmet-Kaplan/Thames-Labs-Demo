export const JobImportSchema = [
  {
    fieldLabel: 'Name',
    fieldIdentifier: 'name',
    fieldOptions: ['name', 'job', 'job name'],
    fieldType: 'default',
    required: true
  }, {
    fieldLabel: 'Description',
    fieldIdentifier: 'description',
    fieldOptions: ['description', 'desc', 'details'],
    fieldType: 'default',
    required: false
  }, {
    fieldLabel: 'Company Name',
    fieldIdentifier: 'companyName',
    fieldOptions: ['company', 'company name', 'companyname'],
    fieldType: 'default',
    required: true
  }, {
    fieldLabel: 'Contact Name',
    fieldIdentifier: 'contactName',
    fieldOptions: ['contact', 'contactname', 'contact name'],
    fieldType: 'default',
    required: true
  }, {
    fieldLabel: 'Account Manager',
    fieldIdentifier: 'accountManager',
    fieldOptions: ['manager', 'accountmanager', 'account manager'],
    fieldType: 'default',
    required: true
  }, {
    fieldLabel: 'Due Date',
    fieldIdentifier: 'dueDate',
    fieldOptions: ['due', 'due date', 'duedate'],
    fieldType: 'default',
    required: true
  }, {
    fieldLabel: 'Value',
    fieldIdentifier: 'value',
    fieldOptions: ['value'],
    fieldType: 'default',
    required: false
  }, {
    fieldLabel: 'Staff',
    fieldIdentifier: 'staff',
    fieldOptions: ['staff'],
    fieldType: 'default',
    required: false
  }, {
    fieldLabel: 'Active',
    fieldIdentifier: 'active',
    fieldOptions: ['active', 'isactive', 'is active'],
    fieldType: 'default',
    required: false
  }, {
    fieldLabel: 'Tags',
    fieldIdentifier: 'tags',
    fieldOptions: ['tags'],
    fieldType: 'default',
    required: false
  }];