export const CompanyFilters = {
  city: {
    display: 'City:',
    prop: 'city',
    allowMultiple: true,
    verify: function(city) {
      if (!city) return false;
      return true;
    }
  },
  country: {
    display: 'Country:',
    prop: 'country',
    allowMultiple: true,
    verify: function(country) {
      if (!country) return false;
      return true;
    }
  },
  postcode: {
    display: 'Postcode:',
    prop: 'postcode',
    allowMultiple: true,
    verify: function(postcode) {
      if (!postcode) return false;
      return true;
    }
  },
  tags: {
    display: 'Tag:',
    prop: 'tags',
    collectionName: 'tags',
    autosuggestFilter: {
      collection: 'companies'
    },
    valueField: 'name',
    nameField: 'name'
  },
  sequencedIdentifier: {
    display: 'RealTime Company Identifier:',
    prop: 'sequencedIdentifier',
    allowMultiple: false,
    verify: function(sequencedIdentifier) {
      if (!sequencedIdentifier) return false;
      return true;
    }
  }
};