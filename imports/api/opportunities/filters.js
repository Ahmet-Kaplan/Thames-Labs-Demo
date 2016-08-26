import { Tenants } from '/imports/api/collections.js';
export const OpportunityFilters = {
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
  sequencedIdentifier: {
    display: 'RealTime Opportunity Identifier:',
    prop: 'sequencedIdentifier',
    allowMultiple: false,
    verify: function(sequencedIdentifier) {
      if (!sequencedIdentifier) return false;
      return true;
    }
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
  },
  stage: {
    display: 'Stage:',
    prop: 'stage',
    allowMultiple: true,
    strict: true,
    defaultOptions: function() {
      var tenant = Tenants.findOne();
      var map = _.map(tenant.settings.opportunity.stages, function(s) {
        return s.title;
      });
      return map;
    },
    displayValue: function(stage) {
      if (stage) {
        return stage;
      }
      return 'N/A';
    }

  },
  state: {
    display: 'State:',
    prop: 'state',
    defaultOptions: function() {
      return ['Won', 'Lost', 'Open'];
    },
    strict: true,
    allowMultiple: false,
    verify: function(state) {
      if (!state) return false;
      return state;
    }
  },
  nextAction: {
    display: 'Next Action:',
    prop: 'nextAction',
    defaultOptions: function() {
      return ['Overdue', 'Due Today', 'None'];
    },
    strict: true,
    allowMultiple: false,
    verify: function(nextAction) {
      if (!nextAction) return false;
      return nextAction;
    }
  },
};