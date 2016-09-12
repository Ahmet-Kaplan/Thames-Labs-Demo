export const OpportunityImportSchema = [
  {
    fieldLabel: 'Name',
    fieldIdentifier: 'name',
    fieldOptions: ['name', 'opportunity'],
    fieldType: 'default',
    required: true
  }, {
    fieldLabel: 'Description',
    fieldIdentifier: 'description',
    fieldOptions: ['description', 'desc'],
    fieldType: 'default',
    required: true
  }, {
    fieldLabel: 'Date',
    fieldIdentifier: 'date',
    fieldOptions: ['date'],
    fieldType: 'default',
    required: true
  }, {
    fieldLabel: 'Estimated Close Date',
    fieldIdentifier: 'estCloseDate',
    fieldOptions: ['estclosedate', 'closingdate', 'closedate'],
    fieldType: 'default',
    required: false
  }, {
    fieldLabel: 'Value',
    fieldIdentifier: 'value',
    fieldOptions: ['value'],
    fieldType: 'default',
    required: false
  }, {
    fieldLabel: 'Company Name',
    fieldIdentifier: 'companyName',
    fieldOptions: ['companyname', 'company'],
    fieldType: 'default',
    required: true
  }, {
    fieldLabel: 'Contact Name',
    fieldIdentifier: 'contactName',
    fieldOptions: ['contactname', 'contact'],
    fieldType: 'default',
    required: true
  }, {
    fieldLabel: 'Sales Manager',
    fieldIdentifier: 'salesManager',
    fieldOptions: ['sales', 'manager', 'salesmanager', 'accountmanager'],
    fieldType: 'default',
    required: false
  }, {
    fieldLabel: 'Is Opportunity Closed',
    fieldIdentifier: 'isArchived',
    fieldOptions: ['isarchived', 'isclosed', 'opportunity closed', 'opportunityclosed'],
    fieldType: 'default',
    required: false
  }, {
    fieldLabel: 'Is Opportunity Won',
    fieldIdentifier: 'hasBeenWon',
    fieldOptions: ['hasbeenwon', 'opportunity won', 'opportunitywon', 'iswon'],
    fieldType: 'default',
    required: false
  }, {
    fieldLabel: 'Tags',
    fieldIdentifier: 'tags',
    fieldOptions: ['tags'],
    fieldType: 'default',
    required: false
  }];