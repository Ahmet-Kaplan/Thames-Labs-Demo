import { PurchaseOrderSchema } from './schema.js';
export const PurchaseOrderFilters = {
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
  status: {
    display: 'Status:',
    prop: 'status',
    verify: function(status) {
      if (PurchaseOrderSchema.schema().status.allowedValues.indexOf(status) !== -1) {
        return true;
      }
      return false;
    },
    defaultOptions: function() {
      return PurchaseOrderSchema.schema('status').allowedValues;
    }
  },
  totalValueLower: {
    display: 'Total Price <',
    prop: 'totalValueLower',
    verify: function(value) {
      value = parseFloat(value);
      if (isNaN(value)) {
        toastr.error('Please enter a numeric value.');
        return false;
      }
      return true;
    }
  },
  totalValueGreater: {
    display: 'Total Price >',
    prop: 'totalValueGreater',
    verify: function(value) {
      value = parseFloat(value);
      if (isNaN(value)) {
        toastr.error('Please enter a numeric value.');
        return false;
      }
      return true;
    }
  },
  sequencedIdentifier: {
    display: 'RealTime Purchase Order Identifier:',
    prop: 'sequencedIdentifier',
    allowMultiple: false,
    verify: function(sequencedIdentifier) {
      if (!sequencedIdentifier) return false;
      return true;
    }
  },
  tags: {
    display: 'Tag:',
    prop: 'tags',
    collectionName: 'tags',
    autosuggestFilter: {
      collection: 'purchaseorders'
    },
    valueField: 'name',
    nameField: 'name'
  },
  active: {
    display: 'Active:',
    prop: 'active',
    defaultOptions: function() {
      return ['Yes', 'No'];
    },
    strict: true,
    allowMultiple: false,
    verify: function(active) {
      if (!active) return false;
      return active;
    }
  }
};