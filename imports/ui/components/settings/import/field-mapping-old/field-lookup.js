export const importFields = {
  opportunities: [
    {
      fieldLabel: 'Name',
      fieldIdentifier: 'name',
      required: true
    }, {
      fieldLabel: 'Description',
      fieldIdentifier: 'description',
      required: true
    }, {
      fieldLabel: 'Date',
      fieldIdentifier: 'date',
      required: true
    }, {
      fieldLabel: 'Estimated Close Date',
      fieldIdentifier: 'estCloseDate',
      required: false
    }, {
      fieldLabel: 'Value',
      fieldIdentifier: 'value',
      required: false
    }, {
      fieldLabel: 'Company Name',
      fieldIdentifier: 'companyName',
      required: true
    }, {
      fieldLabel: 'Contact Name',
      fieldIdentifier: 'contactName',
      required: true
    }, {
      fieldLabel: 'Sales Manager',
      fieldIdentifier: 'salesManager',
      required: false
    }, {
      fieldLabel: 'Is Opportunity Closed',
      fieldIdentifier: 'isArchived',
      required: false
    }, {
      fieldLabel: 'Is Opportunity Won',
      fieldIdentifier: 'hasBeenWon',
      required: false
    }],
  projects: [
    {
      fieldLabel: 'Name',
      fieldIdentifier: 'name',
      required: true
    }, {
      fieldLabel: 'Description',
      fieldIdentifier: 'description',
      required: false
    }, {
      fieldLabel: 'Company Name',
      fieldIdentifier: 'companyName',
      required: true
    }, {
      fieldLabel: 'Contact Name',
      fieldIdentifier: 'contactName',
      required: true
    }, {
      fieldLabel: 'Account Manager',
      fieldIdentifier: 'accountManager',
      required: true
    }, {
      fieldLabel: 'Due Date',
      fieldIdentifier: 'dueDate',
      required: true
    }, {
      fieldLabel: 'Value',
      fieldIdentifier: 'value',
      required: false
    }, {
      fieldLabel: 'Staff',
      fieldIdentifier: 'staff',
      required: false
    }, {
      fieldLabel: 'Active',
      fieldIdentifier: 'active',
      required: false
    }],
  products: [
    {
      fieldLabel: 'Name',
      fieldIdentifier: 'name',
      required: true
    }, {
      fieldLabel: 'Description',
      fieldIdentifier: 'description',
      required: true
    }, {
      fieldLabel: 'Sales Price',
      fieldIdentifier: 'salePrice',
      required: false
    }, {
      fieldLabel: 'Cost Price',
      fieldIdentifier: 'costPrice',
      required: false
    }],
  activities: [
    {
      fieldLabel: 'Type',
      fieldIdentifier: 'type',
      required: true
    }, {
      fieldLabel: 'Date',
      fieldIdentifier: 'date',
      required: false
    }, {
      fieldLabel: 'Notes',
      fieldIdentifier: 'notes',
      required: true
    }, {
      fieldLabel: 'Record Name',
      fieldIdentifier: 'record',
      required: true
    }, {
      fieldLabel: 'Record Type',
      fieldIdentifier: 'recordType',
      required: true
    }],
  purchaseorders: [
    {
      fieldLabel: 'Description',
      fieldIdentifier: 'description',
      required: true
    }, {
      fieldLabel: 'Company Name',
      fieldIdentifier: 'companyName',
      required: true
    }, {
      fieldLabel: 'Contact Name',
      fieldIdentifier: 'contactName',
      required: true
    }, {
      fieldLabel: 'Supplier Reference',
      fieldIdentifier: 'supplierReference',
      required: false
    }, {
      fieldLabel: 'Order Date',
      fieldIdentifier: 'orderDate',
      required: false
    }, {
      fieldLabel: 'Payment Method',
      fieldIdentifier: 'paymentMethod',
      required: false
    }, {
      fieldLabel: 'Status',
      fieldIdentifier: 'status',
      required: false
    }, {
      fieldLabel: 'Notes',
      fieldIdentifier: 'notes',
      required: false
    }],
  tasks: [
    {
      fieldLabel: 'Title',
      fieldIdentifier: 'title',
      required: true
    }, {
      fieldLabel: 'Description',
      fieldIdentifier: 'description',
      required: false
    }, {
      fieldLabel: 'Assigned User',
      fieldIdentifier: 'assignee',
      required: true
    }, {
      fieldLabel: 'Due Date',
      fieldIdentifier: 'dueDate',
      required: false
    }, {
      fieldLabel: 'Record Name',
      fieldIdentifier: 'record',
      required: true
    }, {
      fieldLabel: 'Record Type',
      fieldIdentifier: 'recordType',
      required: true
    }],
  contacts: [
    {
      fieldLabel: 'Forename',
      fieldIdentifier: 'forename',
      required: true
    }, {
      fieldLabel: 'Surname',
      fieldIdentifier: 'surname',
      required: true
    }, {
      fieldLabel: 'Job Title',
      fieldIdentifier: 'jobtitle',
      required: false
    }, {
      fieldLabel: 'Telephone',
      fieldIdentifier: 'phone',
      required: false
    }, {
      fieldLabel: 'Mobile',
      fieldIdentifier: 'mobile',
      required: false
    }, {
      fieldLabel: 'Email',
      fieldIdentifier: 'email',
      required: false
    }, {
      fieldLabel: 'Address',
      fieldIdentifier: 'address',
      required: false
    }, {
      fieldLabel: 'City',
      fieldIdentifier: 'city',
      required: false
    }, {
      fieldLabel: 'County',
      fieldIdentifier: 'county',
      required: false
    }, {
      fieldLabel: 'Postcode',
      fieldIdentifier: 'postcode',
      required: false
    }, {
      fieldLabel: 'Country',
      fieldIdentifier: 'country',
      required: false
    }, {
      fieldLabel: 'Company Name',
      fieldIdentifier: 'companyName',
      required: false
    }, {
      fieldLabel: 'Tags',
      fieldIdentifier: 'tags',
      required: false
    }],
  companies: [
    {
      fieldLabel: 'Company Name',
      fieldIdentifier: 'name',
      required: true
    }, {
      fieldLabel: 'Address',
      fieldIdentifier: 'address',
      required: false
    }, {
      fieldLabel: 'Address Line 2',
      fieldIdentifier: 'address2',
      required: false
    }, {
      fieldLabel: 'City',
      fieldIdentifier: 'city',
      required: false
    }, {
      fieldLabel: 'County',
      fieldIdentifier: 'county',
      required: false
    }, {
      fieldLabel: 'Postcode',
      fieldIdentifier: 'postcode',
      required: false
    }, {
      fieldLabel: 'Country',
      fieldIdentifier: 'country',
      required: false
    }, {
      fieldLabel: 'Website',
      fieldIdentifier: 'website',
      required: false
    }, {
      fieldLabel: 'Telephone Number',
      fieldIdentifier: 'phone',
      required: false
    }, {
      fieldLabel: 'Tags',
      fieldIdentifier: 'tags',
      required: false
    }]
};