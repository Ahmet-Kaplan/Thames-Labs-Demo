exportFromSearchToCSV = function(collectionName) {
  if (!Collections[collectionName] || !Collections[collectionName].index) {
    throw new Meteor.Error('index-missing', 'Search index not found');
  }
  var index = Collections[collectionName].index,
      searchDefinition = index.getComponentDict().get('searchDefinition'),
      searchOptions = index.getComponentDict().get('searchOptions');

  Meteor.call('search.export', collectionName, searchDefinition, searchOptions, (err, result) => {
    if (err) {
      throw new Meteor.Error('500', err);
    }
    var filename = [
      'realtimecrm-',
      collectionName,
      '-export_',
      moment().format("MMM-Do-YY"),
      '.csv'
    ].join('');
    var fileData = Papa.unparse(result);
    var blob = new Blob([fileData], {
      type: "text/csv;charset=utf-8"
    });
    saveAs(blob, filename);
  });
}
