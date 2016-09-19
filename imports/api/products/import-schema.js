export const ProductImportSchema = [
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
  }];