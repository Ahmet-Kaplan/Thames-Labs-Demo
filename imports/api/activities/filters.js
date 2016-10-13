import { wordedTimes, getWordedTime, getEuropeanDate } from '/imports/api/collections-helpers/time-filters.js';
export const ActivityFilters = {
  type: {
    display: 'Type:',
    prop: 'type',
    defaultOptions: function() {
      return ['Call', 'Note', 'Email'];
    },
    strict: true,
    allowMultiple: true,
    verify: function(type) {
      if (!type) return false;
      return true;
    }
  },
  tags: {
    display: 'Tag:',
    prop: 'tags',
    collectionName: 'tags',
    autosuggestFilter: {
      collection: 'activities'
    },
    valueField: 'name',
    nameField: 'name'
  },
  activityDate: {
    display: 'Activity Date:',
    prop: 'activityDate',
    verify: function(activityDate) {
      if (!getEuropeanDate(activityDate) && !getWordedTime(activityDate)) {
        toastr.error('Invalid date', 'Error', {
          preventDuplicates: true
        });
        return false;
      }

      //Edge case: to avoid conflict, remove dateBefore/dateAfter if set
      if (_.get(Activities.index.getComponentDict().get('searchOptions'), 'props.after')) {
        Activities.index.getComponentMethods().removeProps('after');
      }
      if (_.get(Activities.index.getComponentDict().get('searchOptions'), 'props.before')) {
        Activities.index.getComponentMethods().removeProps('before');
      }
      return true;
    },
    defaultOptions: function() {
      return _.map(_.filter(wordedTimes, (word) => word.position === 'present' || word.position === 'past'), 'expr');
    }
  },
  before: {
    display: 'Date Before:',
    prop: 'before',
    verify: function(date) {
      const afterOption = _.get(Activities.index.getComponentDict().get('searchOptions'), 'props.after');
      if (!getEuropeanDate(date)) {
        toastr.error('Invalid date', 'Error', {
          preventDuplicates: true
        });
        return false;
      } else if (afterOption && moment(date).isBefore(moment(afterOption))) {
        toastr.error(`The 'Before' date is before the 'After' date`, 'Error', {
          preventDuplicates: true
        });
        return false;

        //Edge case: to avoid conflict, remove activityDate if set
      } else if (_.get(Activities.index.getComponentDict().get('searchOptions'), 'props.activityDate')) {
        Activities.index.getComponentMethods().removeProps('activityDate');
      }
      return true;
    }
  },
  after: {
    display: 'Date After:',
    prop: 'after',
    verify: function(date) {
      const beforeOption = _.get(Activities.index.getComponentDict().get('searchOptions'), 'props.before');
      if (!getEuropeanDate(date)) {
        toastr.error('Invalid date', 'Error', {
          preventDuplicates: true
        });
        return false;
      } else if (beforeOption && moment(date).isAfter(moment(beforeOption))) {
        toastr.error(`The 'After' date is after the 'Before' date`, 'Error', {
          preventDuplicates: true
        });
        return false;

        //Edge case: to avoid conflict, remove activityDate if set
      } else if (_.get(Activities.index.getComponentDict().get('searchOptions'), 'props.activityDate')) {
        Activities.index.getComponentMethods().removeProps('activityDate');
      }
      return true;
    }
  },
  recordTypes: {
    display: 'Record Types:',
    prop: 'recordTypes',
    defaultOptions: function() {
      return _.filter(['Companies', 'Contacts', 'Jobs'],
        (type) => !_.includes(getDisallowedPermissions(Meteor.userId()), _.toLower(_.replace(type, ' ', '')))
      );
    },
    strict: true,
    allowMultiple: true,
    verify: function(type) {
      return _.includes(this.defaultOptions(), type);
    }
  }
};