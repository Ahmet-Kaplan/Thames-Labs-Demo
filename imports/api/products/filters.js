// Filters
export const ProductFilters = {
  salesPriceLower: {
    display: 'Sales Price <',
    prop: 'salesPriceLower',
    verify: function(value) {
      value = parseInt(value, 10);
      if (isNaN(value)) {
        toastr.error('Please enter a numeric value.');
        return false;
      }
      return true;
    }
  },
  salesPriceGreater: {
    display: 'Sales Price >',
    prop: 'salesPriceGreater',
    verify: function(value) {
      value = parseInt(value, 10);
      if (isNaN(value)) {
        toastr.error('Please enter a numeric value.');
        return false;
      }
      return true;
    }
  },
  costPriceLower: {
    display: 'Cost Price <',
    prop: 'costPriceLower',
    verify: function(value) {
      value = parseInt(value, 10);
      if (isNaN(value)) {
        toastr.error('Please enter a numeric value.');
        return false;
      }
      return true;
    }
  },
  costPriceGreater: {
    display: 'Cost Price >',
    prop: 'costPriceGreater',
    verify: function(value) {
      value = parseInt(value, 10);
      if (isNaN(value)) {
        toastr.error('Please enter a numeric value.');
        return false;
      }
      return true;
    }
  },
  tags: {
    display: 'Tag:',
    prop: 'tags',
    collectionName: 'tags',
    autosuggestFilter: {
      collection: 'products'
    },
    valueField: 'name',
    nameField: 'name'
  },
  sequencedIdentifier: {
    display: 'RealTime Product Identifier:',
    prop: 'sequencedIdentifier',
    allowMultiple: false,
    verify: function(sequencedIdentifier) {
      if (!sequencedIdentifier) return false;
      return true;
    }
  }
};