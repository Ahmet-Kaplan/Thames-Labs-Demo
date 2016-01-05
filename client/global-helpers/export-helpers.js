exportFromSearchToCSV = function(collectionName) {
  if (!Collections[collectionName] || !Collections[collectionName].index) {
    throw new Meteor.Error('index-missing', 'Search index not found');
  }

  if (collectionName === 'tasks') {
    exportFromTaskSearchToCSV();
    return;
  }

  var index = Collections[collectionName].index,
    searchDefinition = index.getComponentDict().get('searchDefinition'),
    searchOptions = index.getComponentDict().get('searchOptions');

  Meteor.call('search.export', collectionName, searchDefinition, searchOptions, (err, results) => {
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
    var cleanedResults = results.map((record) => {
      return _.omit(record, [
        '_id',
        'createdBy',
        'companyId',
        'contactId',
        'opportunityId',
        'projectId',
        'purchaseOrderId',
        'taskId',
        'productId',
        'currentStageId',
        'items',
        'userId',
        'supplierCompanyId',
        'supplierContactId',
        'primaryEntityId'
      ]);
    });
    var fileData = Papa.unparse(cleanedResults);
    var blob = new Blob([fileData], {
      type: "text/csv;charset=utf-8"
    });
    saveAs(blob, filename);
  });
};

exportFromTaskSearchToCSV = function() {
  var index = Collections['tasks'].index,
    searchDefinition = index.getComponentDict().get('searchDefinition'),
    searchOptions = index.getComponentDict().get('searchOptions');

  Meteor.call('search.export', 'tasks', searchDefinition, searchOptions, (err, results) => {
    if (err) {
      throw new Meteor.Error('500', err);
    }
    // var filename = [
    //   'realtimecrm-',
    //   collectionName,
    //   '-export_',
    //   moment().format("MMM-Do-YY"),
    //   '.csv'
    // ].join('');

    console.log(results);

    // var fileData = Papa.unparse(cleanedResults);
    // var blob = new Blob([fileData], {
    //   type: "text/csv;charset=utf-8"
    // });
    // saveAs(blob, filename);
  });
};
