//Note: this must contain a subset of the opportunity filters
export const SalesPipelineFilters = {
  company: {
    display: 'Company:',
    prop: 'company',
    collectionName: 'companies',
    valueField: '__originalId',
    nameField: 'name',
    subscriptionById: 'companyById',
    displayValue: function(company) {
      if (company) {
        return company.name;
      }
      return 'N/A';
    }
  },
  contact: {
    display: 'Contact:',
    prop: 'contact',
    collectionName: 'contacts',
    valueField: '__originalId',
    nameField: 'name',
    subscriptionById: 'contactById',
    displayValue: function(contact) {
      if (contact) {
        return contact.name();
      }
      return 'N/A';
    }
  },
  valueLower: {
    display: 'Value <',
    prop: 'valueLower',
    verify: function(value) {
      value = parseInt(value, 10);
      if (isNaN(value)) {
        toastr.error('Please enter a numeric value.');
        return false;
      }
      return true;
    }
  },
  valueGreater: {
    display: 'Value >',
    prop: 'valueGreater',
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
      collection: 'opportunities'
    },
    valueField: 'name',
    nameField: 'name'
  },
  salesManager: {
    display: 'Sales Manager:',
    prop: 'salesManager',
    collectionName: 'users',
    valueField: '__originalId',
    nameField: 'name',
    subscriptionById: 'allUserData',
    displayValue: function(user) {
      if (user) {
        return user.profile.name;
      }
      return 'N/A';
    }
  }
};