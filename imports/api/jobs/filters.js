import { wordedTimes, getWordedTime, getEuropeanDate } from '/imports/api/collections-helpers/time-filters.js';

export const JobFilters = {
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
  manager: {
    display: 'Manager:',
    prop: 'manager',
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
  dueDate: {
    display: 'Due Date:',
    prop: 'dueDate',
    verify: function(dueDate) {
      if(!getEuropeanDate(dueDate) && !getWordedTime(dueDate)) {
        toastr.error('Invalid date', 'Error', {
          preventDuplicates: true
        });
        return false;
      }

      //Edge case: to avoid conflict, remove dueBefore/dueAfter if set
      if (_.get(Collections.jobs.index.getComponentDict().get('searchOptions'), 'props.after')) {
        Collections.jobs.index.getComponentMethods().removeProps('after');
      }
      if (_.get(Collections.jobs.index.getComponentDict().get('searchOptions'), 'props.before')) {
        Collections.jobs.index.getComponentMethods().removeProps('before');
      }
      return true;
    },
    defaultOptions: function() {
      return _.map(wordedTimes, 'expr');
    }
  },
  before: {
    display: 'Due Before:',
    prop: 'before',
    verify: function(date) {
      var afterOption = _.get(Collections.jobs.index.getComponentDict().get('searchOptions'), 'props.after');
      if(!getEuropeanDate(date)) {
        toastr.error('Invalid date', 'Error', {
          preventDuplicates: true
        });
        return false;
      } else if (afterOption && moment(date).isBefore(moment(afterOption))) {
        toastr.error('The \'Before\' date is before the \'After\' date', 'Error', {
          preventDuplicates: true
        });
        return false;

        //Edge case: to avoid conflict, remove dueDate if set
      } else if (_.get(Collections.jobs.index.getComponentDict().get('searchOptions'), 'props.dueDate')) {
        Collections.jobs.index.getComponentMethods().removeProps('dueDate');
      }
      return true;
    }
  },
  after: {
    display: 'Due After:',
    prop: 'after',
    verify: function(date) {
      var beforeOption = _.get(Collections.jobs.index.getComponentDict().get('searchOptions'), 'props.before');
      if(!getEuropeanDate(date)) {
        toastr.error('Invalid date', 'Error', {
          preventDuplicates: true
        });
        return false;
      } else if (beforeOption && moment(date).isAfter(moment(beforeOption))) {
        toastr.error('The \'After\' date is after the \'Before\' date', 'Error', {
          preventDuplicates: true
        });
        return false;

        //Edge case: to avoid conflict, remove dueDate if set
      } else if (_.get(Collections.jobs.index.getComponentDict().get('searchOptions'), 'props.dueDate')) {
        Collections.jobs.index.getComponentMethods().removeProps('dueDate');
      }
      return true;
    }
  },
  tags: {
    display: 'Tag:',
    prop: 'tags',
    collectionName: 'tags',
    autosuggestFilter: {
      collection: 'jobs'
    },
    valueField: 'name',
    nameField: 'name'
  },
  sequencedIdentifier: {
    display: 'Job Identifier:',
    prop: 'sequencedIdentifier',
    allowMultiple: false,
    verify: function(sequencedIdentifier) {
      if (!sequencedIdentifier) return false;
      return true;
    }
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