export const PurchaseOrderImportSchema = [
  {
    fieldLabel: 'Description',
    fieldIdentifier: 'description',
    fieldOptions: ['description', 'desc'],
    fieldType: 'default',
    required: true
  }, {
    fieldLabel: 'Company Name',
    fieldIdentifier: 'companyName',
    fieldOptions: ['companyname', 'company', 'supplier', 'suppliercompany', 'supplier company'],
    fieldType: 'default',
    required: true
  }, {
    fieldLabel: 'Contact Name',
    fieldIdentifier: 'contactName',
    fieldOptions: ['contactname', 'contact', 'suppliercontact', 'supplier contact'],
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
  }];