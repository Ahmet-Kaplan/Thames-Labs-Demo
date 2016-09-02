export const CompanyImportSchema = [
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
  }];