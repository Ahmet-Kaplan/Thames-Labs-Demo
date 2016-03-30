Template.filterPanel.onRendered(function() {
  Session.setDefault('search.showFilters', false);
});

Template.filterPanel.helpers({
  filtersList: function() {
    var mainCollectionName = Template.instance().data.collectionName;
    var searchIndex = Collections[mainCollectionName].index;
    var searchOptions = searchIndex.getComponentDict().get('searchOptions');
    var filtersList = [];

    if (searchOptions && searchOptions.props) {
      _.each(searchOptions.props, function(propValues, propIndex) {
        var values = propValues.split(',');
        var filter = Collections[mainCollectionName].filters[propIndex];

        //Check that the filter exist as some props might be defined independantly from filters
        if (filter) {
          var unified = _.union(values);
          _.each(unified, function(value) {
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
    return Session.get('search.showFilters');
  }
});