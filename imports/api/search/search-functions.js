export const getFilters = (collectionName) => {
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
