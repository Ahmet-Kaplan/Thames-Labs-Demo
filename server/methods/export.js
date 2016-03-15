// These column names are removed from all final exports
// They may be used for interim processing - e.g. looking up related data
const OMITTEDCOLUMNS = [
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
  'metadata',
  'sequencedIdentifier',
  'assigneeId',
  'entityId',
  'entityType',
];

Meteor.methods({

  'search.export': function(collectionName, searchDefinition, searchOptions) {

    // We require a user as we make find calls on partitioned collections
    if (!this.userId) throw new Meteor.Error('401', 'Must be a logged in user to perform export');

    if (!Collections[collectionName] || !Collections[collectionName].index) {
      throw new Meteor.Error('500', 'Search index not found');
    }

    searchOptions.limit = 99999;
    if (!searchOptions.props) searchOptions.props = {};
    searchOptions.props.export = true;
    var index = Collections[collectionName].index;
    var results = index.search(searchDefinition, searchOptions).fetch();

    return results.map( (record) => {

      if (record.companyId) {
        const company = Companies.findOne({
          _id: record.companyId
        });
        record.companyName = company ? company.name : null;
      }

      if (record.contactId) {
        const contact = Contacts.findOne({
          _id: record.contactId
        });
        record.contactName = contact ? contact.name() : null;
      }

      if (record.assigneeId) {
        const assignee = Meteor.users.findOne({
          _id: record.assigneeId
        });
        record.assignee = assignee ? assignee.profile.name : 'Not assigned';
      }

      // This is to deal with related entities on tasks
      if (record.entityType && record.entityId) {
        record.relatedRecordType = record.entityType;

        switch (record.entityType) {
          case 'company':
            const company = Companies.findOne({
              _id: record.entityId
            });
            record.relatedRecord = company ? company.name : null;
            break;
          case 'contact':
            const contact = Contacts.findOne({
              _id: record.entityId
            });
            record.relatedRecord = contact ? contact.name() : null;
            break;
          case 'opportunity':
            const opportunity = Opportunities.findOne({
              _id: record.entityId
            });
            record.relatedRecord = opportunity ? opportunity.name : null;
            break;
          case 'project':
            const project = Projects.findOne({
              _id: record.entityId
            });
            record.relatedRecord = project ? project.name : null;
            break;
          case 'user':
            const user = Meteor.users.findOne({
              _id: record.entityId
            });
            record.relatedRecord = user ? user.profile.name : null;
            break;
        }
      }

      if ( _.has(record, 'completed') ) {
        record.completed = record.completed ? 'Yes' : 'No';
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

      return _.omit(record, OMITTEDCOLUMNS);
    });
  },

  'search.dataDump': function() {
    var collections = ['activities', 'companies', 'contacts', 'opportunities', 'projects', 'products', 'purchaseorders', 'tasks', 'auditLog'];
    var dataArray = [];
    var user = Meteor.users.findOne({
      _id: this.userId
    });

    if (!user) return;

    _.each(collections, function(c) {
      var res = Collections[c].find({
        _groupId: user.group
      }).fetch();

      var data = {
        name: c,
        data: res
      }
      dataArray.push(data);
    });

    return dataArray;
  }

});
