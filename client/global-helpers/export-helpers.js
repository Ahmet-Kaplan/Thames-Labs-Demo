exportFromSearchToCSV = function(collectionName) {
  if (!Collections[collectionName]) {
    throw new Meteor.Error('collection-missing', 'Collection not found');
  }

  if (!Collections[collectionName].index) {
    throw new Meteor.Error('index-missing', 'Search index not found');
  }

  var index = Collections[collectionName].index,
      searchDefinition = index.getComponentDict().get('searchDefinition'),
      searchOptions = index.getComponentDict().get('searchOptions');

  Meteor.call('search.export', collectionName, searchDefinition, searchOptions, (err, results) => {
    if (err) {
      throw new Meteor.Error('500', err);
    }

    if (Meteor.isDevelopment) console.log(results);

    var filename = [
      'realtimecrm-',
      collectionName,
      '-export_',
      moment().format("MMM-Do-YY"),
      '.csv'
    ].join('');

    var fileData = Papa.unparse(results);

    var blob = new Blob([fileData], {
      type: "text/csv;charset=utf-8"
    });

    saveAs(blob, filename);
  });
};
