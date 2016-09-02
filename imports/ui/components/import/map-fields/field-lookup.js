//Note: the values in fieldOptions are the possible csv column names, they must be lowercase only
export const importSchema = {
  companies: [
    {
      fieldLabel: 'Company Name',
      fieldIdentifier: 'name',
      fieldOptions: ['name', 'company', 'company name'],
      fieldType: 'default',
      required: true,
    }, {
      fieldLabel: 'Address',
      fieldIdentifier: 'address',
      fieldOptions: ['address'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Address Line 2',
      fieldIdentifier: 'address2',
      fieldOptions: ['address2', 'address line 2'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'City',
      fieldIdentifier: 'city',
      fieldOptions: ['city'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'County',
      fieldIdentifier: 'county',
      fieldOptions: ['county'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Postcode',
      fieldIdentifier: 'postcode',
      fieldOptions: ['postcode', 'post code', 'postal code'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Country',
      fieldIdentifier: 'country',
      fieldOptions: ['country'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Website',
      fieldIdentifier: 'website',
      fieldOptions: ['website', 'url'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Telephone Number',
      fieldIdentifier: 'phone',
      fieldOptions: ['phone', 'telephone'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Tags',
      fieldIdentifier: 'tags',
      fieldOptions: ['tags'],
      fieldType: 'default',
      required: false
    }],




  contacts: [
    {
      fieldLabel: 'Forename',
      fieldIdentifier: 'forename',
      fieldOptions: ['forename', 'firstname', 'first name'],
      fieldType: 'default',
      required: true
    }, {
      fieldLabel: 'Surname',
      fieldIdentifier: 'surname',
      fieldOptions: ['surname', 'lastname', 'last name'],
      fieldType: 'default',
      required: true
    }, {
      fieldLabel: 'Job Title',
      fieldIdentifier: 'jobtitle',
      fieldOptions: ['job title', 'jobtitle'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Telephone',
      fieldIdentifier: 'phone',
      fieldOptions: ['phone', 'phone number', 'telephone'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Mobile',
      fieldIdentifier: 'mobile',
      fieldOptions: ['mobile', 'smartphone', 'mobile number', 'mobile phone number'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Email',
      fieldIdentifier: 'email',
      fieldOptions: ['email', 'email address', 'emailaddress'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Address',
      fieldIdentifier: 'address',
      fieldOptions: ['address'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Address Line 2',
      fieldIdentifier: 'address2',
      fieldOptions: ['address2', 'address line 2'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'City',
      fieldIdentifier: 'city',
      fieldOptions: ['city'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'County',
      fieldIdentifier: 'county',
      fieldOptions: ['county'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Postcode',
      fieldIdentifier: 'postcode',
      fieldOptions: ['postcode', 'post code', 'postal code'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Country',
      fieldIdentifier: 'country',
      fieldOptions: ['country'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Company Name',
      fieldIdentifier: 'companyName',
      fieldOptions: ['company', 'companyname', 'company name'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Tags',
      fieldIdentifier: 'tags',
      fieldOptions: ['tags'],
      fieldType: 'default',
      required: false
    }],




  projects: [
    {
      fieldLabel: 'Name',
      fieldIdentifier: 'name',
      fieldOptions: ['name', 'project', 'project name'],
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
    }],




  products: [
    {
      fieldLabel: 'Name',
      fieldIdentifier: 'name',
      fieldOptions: ['name', 'product', 'product name'],
      fieldType: 'default',
      required: true
    }, {
      fieldLabel: 'Description',
      fieldIdentifier: 'description',
      fieldOptions: ['description', 'desc', 'details'],
      fieldType: 'default',
      required: true
    }, {
      fieldLabel: 'Sales Price',
      fieldIdentifier: 'salePrice',
      fieldOptions: ['saleprice', 'sale price', 'sale', 'sales price', 'sales price', 'price'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Cost Price',
      fieldIdentifier: 'costPrice',
      fieldOptions: ['costprice', 'cost price', 'cost', 'bom', 'bill of materials'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Tags',
      fieldIdentifier: 'tags',
      fieldOptions: ['tags'],
      fieldType: 'default',
      required: false
    }],




  opportunities: [
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
    }],



  purchaseorders: [
    {
      fieldLabel: 'Description',
      fieldIdentifier: 'description',
      fieldOptions: ['description', 'desc'],
      fieldType: 'default',
      required: true
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
      fieldLabel: 'Supplier Reference',
      fieldIdentifier: 'supplierReference',
      fieldOptions: ['reference', 'supplierreference', 'supplier ref', 'supplier reference'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Order Date',
      fieldIdentifier: 'orderDate',
      fieldOptions: ['orderdate', 'order date', 'date ordered'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Payment Method',
      fieldIdentifier: 'paymentMethod',
      fieldOptions: ['payment', 'payment method', 'paymentmethod'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Status',
      fieldIdentifier: 'status',
      fieldOptions: ['status'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Notes',
      fieldIdentifier: 'notes',
      fieldOptions: ['notes'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Tags',
      fieldIdentifier: 'tags',
      fieldOptions: ['tags'],
      fieldType: 'default',
      required: false
    }],




  tasks: [
    {
      fieldLabel: 'Title',
      fieldIdentifier: 'title',
      fieldOptions: ['title', 'name'],
      fieldType: 'default',
      required: true
    }, {
      fieldLabel: 'Description',
      fieldIdentifier: 'description',
      fieldOptions: ['description', 'desc', 'details'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Assigned User',
      fieldIdentifier: 'assignee',
      fieldOptions: ['assignee', 'assigned user', 'user'],
      fieldType: 'default',
      required: true
    }, {
      fieldLabel: 'Due Date',
      fieldIdentifier: 'dueDate',
      fieldOptions: ['due date', 'duedate'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Record Name',
      fieldIdentifier: 'record',
      fieldOptions: ['record', 'recordname', 'record name'],
      fieldType: 'default',
      required: true
    }, {
      fieldLabel: 'Record Type',
      fieldIdentifier: 'recordType',
      fieldOptions: ['record type', 'recordtype', 'entity', 'entitytype'],
      fieldType: 'default',
      required: true
    }, {
      fieldLabel: 'Tags',
      fieldIdentifier: 'tags',
      fieldOptions: ['tags'],
      fieldType: 'default',
      required: false
    }],




  activities: [
    {
      fieldLabel: 'Type',
      fieldIdentifier: 'type',
      fieldOptions: ['type', 'activitytype'],
      fieldType: 'default',
      required: true
    }, {
      fieldLabel: 'Date',
      fieldIdentifier: 'date',
      fieldOptions: ['date', 'activitytimestamp'],
      fieldType: 'default',
      required: false
    }, {
      fieldLabel: 'Notes',
      fieldIdentifier: 'notes',
      fieldOptions: ['notes', 'content', 'description'],
      fieldType: 'default',
      required: true
    }, {
      fieldLabel: 'Record Name',
      fieldIdentifier: 'record',
      fieldOptions: ['record', 'record name', 'recordname'],
      fieldType: 'default',
      required: true
    }, {
      fieldLabel: 'Record Type',
      fieldIdentifier: 'recordType',
      fieldOptions: ['record type', 'recordtype', 'entity', 'entitytype'],
      fieldType: 'default',
      required: true
    }, {
      fieldLabel: 'Tags',
      fieldIdentifier: 'tags',
      fieldOptions: ['tags'],
      fieldType: 'default',
      required: false
    }],
};