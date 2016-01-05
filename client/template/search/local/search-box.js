Template.searchBox.onRendered(function() {
  Session.setDefault('toggleFilters', false);
});

Template.searchBox.helpers({
  filtersList: function() {
    var mainCollectionName = Template.instance().data.collectionName;
    var searchIndex = Collections[mainCollectionName].index;
    var searchOptions = searchIndex.getComponentDict().get('searchOptions');
    var filtersList = [];

    if(searchOptions && searchOptions.props) {
      _.each(searchOptions.props, function(propValues, propIndex) {
        var values = propValues.split(',');
        var filter = Collections[mainCollectionName].filters[propIndex];

        //Check that the filter exist as some props might be defined independantly from filters
        if(filter) {
          _.each(values, function(value) {
            filtersList.push({
              filter: propIndex,
              mainCollectionName: mainCollectionName,
              id: value
            });
          });
        }
      });
    }
    return filtersList;
  },
  index: function() {
    var mainCollectionName = Template.instance().data.collectionName;
    return Collections[mainCollectionName].index;
  },
  showFilters: function() {
    return Session.get('toggleFilters');
  }
});

Template.searchBox.events({
  'click #toggleFilters': function(e) {
    e.preventDefault();

    if(Session.get('toggleFilters')) {
      Session.set('toggleFilters', false);
    } else {
      var selectize = $('#filterBox')[0].selectize;
      selectize.clearOptions();
      Meteor.setTimeout(function() {
        $('#filtersSearch input').focus();
      }, 300);
      Session.set('toggleFilters', true);
    }
    $(e.target).blur();
  },
  'click #resetSearch': function() {
    var mainCollectionName = Template.instance().data.collectionName;
    var indexMethods = Collections[mainCollectionName].index.getComponentMethods();
    indexMethods.removeProps();
    indexMethods.search('');
    $('input.easysearch-input').val('');
  },
  'click #searchHelp': function() {
    var mainCollectionName = Template.instance().data.collectionName
    Modal.show('searchHelp', {collection: mainCollectionName});
  }
});

function removeFilter(mainCollectionName, filter, val) {
  var searchOptions = Collections[mainCollectionName].index.getComponentDict().get('searchOptions');
  var currentProp = searchOptions.props[filter].split(',');
  currentProp.splice(currentProp.indexOf(val), 1);

  //If still have values, update prop. Otherwise remove it
  if(currentProp.length) {
    Collections[mainCollectionName].index.getComponentMethods().addProps(filter, currentProp.join(','));
  } else {
    Collections[mainCollectionName].index.getComponentMethods().removeProps(filter);
  }
}

Template.filterTag.onCreated(function() {
  if(Collections[this.data.mainCollectionName].filters[this.data.filter] && Collections[this.data.mainCollectionName].filters[this.data.filter].subscriptionById) {
    this.subscribe(Collections[this.data.mainCollectionName].filters[this.data.filter].subscriptionById, this.data.id);
  }
});

Template.filterTag.helpers({
  name: function() {
    var filter = Collections[this.mainCollectionName].filters[this.filter];
    if(filter.collectionName && filter.displayValue) {
      var record = Collections[filter.collectionName].findOne({_id: this.id});
      return filter.display + ' ' + filter.displayValue(record);
    } else {
      return filter.display + ' ' + this.id;
    }
  }
})

Template.filterTag.events({
  'click .removeProp': function(e) {
    e.preventDefault();
    var mainCollectionName = this.mainCollectionName;
    var id = e.target.id;
    var prop = id.split('_')[0];
    var val = id.split('_')[1];
    removeFilter(mainCollectionName, prop, val);
  }
});
