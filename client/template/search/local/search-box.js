Template.searchBox.onRendered(function() {
  Session.setDefault('search.showFilters', false);
});

export const getList = (collectionName) => {
  const searchIndex = Collections[collectionName].index,
        searchOptions = searchIndex.getComponentDict().get('searchOptions'),
        filtersList = [];

  if (searchOptions && searchOptions.props) {
    _.each(searchOptions.props, function(propValues, propIndex) {
      const values = propValues.split(','),
            filter = Collections[collectionName].filters[propIndex];

      //Check that the filter exist as some props might be defined independantly from filters
      if (filter) {
        const unified = _.union(values);
        _.each(unified, function(value) {
          filtersList.push({
            filter: propIndex,
            mainCollectionName: collectionName,
            id: value
          });
        });
      }
    });
  }
  return filtersList;
};

Template.searchBox.helpers({
  filtersList: function() {
    return getList(Template.instance().data.collectionName);
  },
  index: function() {
    const mainCollectionName = Template.instance().data.collectionName;
    return Collections[mainCollectionName].index;
  },
  showFilters: function() {
    return Session.get('search.showFilters');
  }
});

Template.searchBox.events({
  'click #toggleFilters': function(e) {
    e.preventDefault();

    if (Session.get('search.showFilters')) {
      Session.set('search.showFilters', false);
    } else {
      const selectize = $('#filterBox')[0].selectize;
      selectize.clearOptions();
      Meteor.setTimeout(function() {
        $('#filtersSearch input').focus();
      }, 300);
      Session.set('search.showFilters', true);
    }
    $(e.target).blur();
  },
  'click #resetSearch': function() {
    const mainCollectionName = Template.instance().data.collectionName,
          indexMethods = Collections[mainCollectionName].index.getComponentMethods();
    indexMethods.removeProps();
    indexMethods.search('');
    $('input.easysearch-input').val('');
  },
  'click #searchHelp': function() {
    const mainCollectionName = Template.instance().data.collectionName;
    Modal.show('searchHelp', {
      collection: mainCollectionName
    });
  }
});

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
          list = getList(this.mainCollectionName),
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
    const list = getList(this.mainCollectionName),
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
