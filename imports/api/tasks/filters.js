import { wordedTimes, getWordedTime, getEuropeanDate } from '/imports/api/collections-helpers/time-filters.js';

export const TaskFilters = {
  assignee: {
    display: 'Assignee:',
    prop: 'assignee',
    collectionName: 'users',
    valueField: '__originalId',
    nameField: 'name',
    subscriptionById: 'allUserData',
    displayValue: function(user) {
      if(user) {
        return user.profile.name;
      }
    }
  },
  company: {
    display: 'Company:',
    prop: 'company',
    collectionName: 'companies',
    valueField: '__originalId',
    nameField: 'name',
    subscriptionById: 'companyById',
    displayValue: function(company) {
      if(company) {
        return company.name;
      }
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
      if(contact) {
        return contact.name();
      }
    }
  },
  job: {
    display: 'Job:',
    prop: 'job',
    collectionName: 'jobs',
    valueField: '__originalId',
    nameField: 'name',
    subscriptionById: 'jobById',
    displayValue: function(job) {
      if(job) {
        return job.name;
      }
    }
  },
  tags: {
    display: 'Tag:',
    prop: 'tags',
    collectionName: 'tags',
    autosuggestFilter: {
      collection: 'tasks'
    },
    valueField: 'name',
    nameField: 'name'
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
      if(_.get(Collections.tasks.index.getComponentDict().get('searchOptions'), 'props.after')) {
        Collections.tasks.index.getComponentMethods().removeProps('after');
      }
      if(_.get(Collections.tasks.index.getComponentDict().get('searchOptions'), 'props.before')) {
        Collections.tasks.index.getComponentMethods().removeProps('before');
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
      var afterOption = _.get(Collections.tasks.index.getComponentDict().get('searchOptions'), 'props.after', null);
      if(!getEuropeanDate(date)) {
        toastr.error('Invalid date', 'Error', {
          preventDuplicates: true
        });
        return false;
      } else if(afterOption && moment(date).isBefore(moment(afterOption))) {
        toastr.error('The \'Before\' date is before the \'After\' date', 'Error', {
          preventDuplicates: true
        });
        return false;

        //Edge case: to avoid conflict, remove dueDate if set
      } else if(_.get(Collections.tasks.index.getComponentDict().get('searchOptions'), 'props.dueDate')) {
        Collections.tasks.index.getComponentMethods().removeProps('dueDate');
      }
      return true;
    }
  },
  after: {
    display: 'Due After:',
    prop: 'after',
    verify: function(date) {
      var beforeOption = _.get(Collections.tasks.index.getComponentDict().get('searchOptions'), 'props.before', null);
      if(!getEuropeanDate(date)) {
        toastr.error('Invalid date', 'Error', {
          preventDuplicates: true
        });
        return false;
      } else if(beforeOption && moment(date).isAfter(moment(beforeOption))) {
        toastr.error('The \'After\' date is after the \'Before\' date', 'Error', {
          preventDuplicates: true
        });
        return false;

        //Edge case: to avoid conflict, remove dueDate if set
      } else if(_.get(Collections.tasks.index.getComponentDict().get('searchOptions'), 'props.dueDate')) {
        Collections.tasks.index.getComponentMethods().removeProps('dueDate');
      }
      return true;
    }
  },
  completed: {
    display: 'Completed:',
    prop: 'completed',
    defaultOptions: function() {
      return ['Yes', 'No'];
    },
    strict: true,
    allowMultiple: false,
    verify: function(completed) {
      if (!completed) return false;
      return completed;
    }
  },
  subtasks: {
    display: 'Subtasks:',
    prop: 'subtasks',
    defaultOptions: function() {
      return ['Hidden'];
    },
    strict: true,
    allowMultiple: false
  }
};