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

    var parsedColumns = [];
    var omittedColumns = [
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
      'primaryEntityId',
      'documents',
      'customFields',
      'extendedInformation',
      'metadata'
    ];

    if (collectionName === 'contacts') {
      _.each(results, function(r) {
        r.companyName = "";
      });
    }

    if (collectionName === 'opportunities') {
      _.each(results, function(r) {
        if (r.companyId) r.companyName = "";
        if (r.contactId) r.contactName = "";
      });
    }

    var cleanedResults = results.map((record) => {

      for (var property in record) {
        if (record.hasOwnProperty(property)) {
          if (!_.contains(omittedColumns, property)) {
            if (!_.contains(parsedColumns, property)) {
              parsedColumns.push(property);
            }
          }
        }
      }

      if (record.companyId && (collectionName === 'contacts' || collectionName === 'opportunities')) {
        var company = Companies.findOne({
          _id: record.companyId
        });
        if (company) record.companyName = company.name;
      }

      if (record.contactId && collectionName === 'opportunities') {
        var contact = Contacts.findOne({
          _id: record.contactId
        });
        if (company) record.contactName = contact.forename + " " + contact.surname;
      }

      if (record.salesManagerId) {
        salesManager = Meteor.users.findOne({
          _id: record.salesManagerId
        }).profile.name;
        record.salesManagerId = salesManager;
      }

      if (record.date) {
        record.date = moment(record.date).format('DD/MM/YY');
      }
      if (record.estCloseDate) {
        record.estCloseDate = moment(record.estCloseDate).format('DD/MM/YY');
      }
      if (record.createdAt) {
        record.createdAt = moment(record.createdAt).format('DD/MM/YY');
      }
      if (record.dueDate) {
        record.dueDate = moment(record.dueDate).format('DD/MM/YY');
      }
      if (record.orderDate) {
        record.orderDate = moment(record.orderDate).format('DD/MM/YY');
      }
      if (record.completedAt) {
        record.completedAt = moment(record.completedAt).format('DD/MM/YY');
      }

      return _.omit(record, omittedColumns);
    });

    var fileData = Papa.unparse({
      fields: parsedColumns,
      data: cleanedResults
    });

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

  Meteor.call('tasks.export', searchDefinition, searchOptions, (err, results) => {
    if (err) {
      throw new Meteor.Error('500', err);
    }
    var filename = [
      'realtimecrm-tasks-export_',
      moment().format("MMM-Do-YY"),
      '.csv'
    ].join('');

    var cleanedResults = results.map((record) => {

      if (record.date) {
        record.date = moment(record.date).format('DD/MM/YY');
      }
      if (record.estCloseDate) {
        record.estCloseDate = moment(record.estCloseDate).format('DD/MM/YY');
      }
      if (record.createdAt) {
        record.createdAt = moment(record.createdAt).format('DD/MM/YY');
      }
      if (record.dueDate) {
        record.dueDate = moment(record.dueDate).format('DD/MM/YY');
      }
      if (record.orderDate) {
        record.orderDate = moment(record.orderDate).format('DD/MM/YY');
      }
      if (record.completedAt) {
        record.completedAt = moment(record.completedAt).format('DD/MM/YY');
      }

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