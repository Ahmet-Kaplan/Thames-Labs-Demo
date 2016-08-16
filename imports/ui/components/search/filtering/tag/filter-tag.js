import './filter-tag.html';
import { getFilters } from '/imports/api/search/search-functions.js';

function removeFilter(mainCollectionName, filter, val) {
  const searchOptions = Collections[mainCollectionName].index.getComponentDict().get('searchOptions'),
        currentProp = searchOptions.props[filter].split(',');
  currentProp.splice(currentProp.indexOf(val), 1);

  //If still have values, update prop. Otherwise remove it
  if (currentProp.length) {
    Collections[mainCollectionName].index.getComponentMethods().addProps(filter, currentProp.join(','));
  } else {
    Collections[mainCollectionName].index.getComponentMethods().removeProps(filter);
  }
}

Template.filterTag.onCreated(function() {
  if (Collections[this.data.mainCollectionName].filters[this.data.filter] && Collections[this.data.mainCollectionName].filters[this.data.filter].subscriptionById) {
    this.subscribe(Collections[this.data.mainCollectionName].filters[this.data.filter].subscriptionById, this.data.id);
  }
});

Template.filterTag.helpers({
  name: function() {
    const filter = Collections[this.mainCollectionName].filters[this.filter],
          list = getFilters(this.mainCollectionName),
          filterKey = _.findKey(list, {'id': this.id}),
          prevIndex = filterKey - 1;

    let matchPrev = false;

    if(prevIndex >= 0) {
      const prevFilter = _.pick(list, [prevIndex]);
      matchPrev = _.eq(prevFilter[prevIndex].filter, this.filter);
    }

    if (filter.collectionName && filter.displayValue) {
      const record = Collections[filter.collectionName].findOne({
        _id: this.id
      });
      if(matchPrev) return _.capitalize(filter.displayValue(record));
      return filter.display + ' ' + _.capitalize(filter.displayValue(record));
    }
    if(matchPrev) return this.id;
    return filter.display + ' ' + this.id;
  },
  prefix: function() {
    const list = getFilters(this.mainCollectionName),
          filterKey = _.findKey(list, {'id': this.id}),
          existingFilters = [],
          existingId = [],
          filteredList = _.omit(list, filterKey),
          prevIndex = filterKey - 1;

    if (prevIndex >= 0) {
      const prevFilter = _.pick(list, [prevIndex]);

      _.forEach(filteredList, (tag) => {
        existingFilters.push(tag.filter);
        existingId.push(tag.id);
      });

      const matchFilter = _.includes(existingFilters, this.filter),
            matchId = _.includes(existingId, this.id),
            matchPrev = _.eq(prevFilter[prevIndex].filter, this.filter);

      if (matchFilter && !matchId && matchPrev) {
        return 'or';
      }
      return 'and';
    }
    return '';
  }
});

Template.filterTag.events({
  'click .removeProp': function(e) {
    e.preventDefault();
    const mainCollectionName = this.mainCollectionName,
          id = e.target.id,
          prop = id.split('_')[0],
          val = id.split('_')[1];
    removeFilter(mainCollectionName, prop, val);
  }
});
