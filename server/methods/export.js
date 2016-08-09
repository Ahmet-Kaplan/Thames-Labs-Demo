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
  'projectTypeId',
  'projectMilestoneId',
  'stripe'
];

Meteor.methods({

  'search.dataDump': function() {
    var collections = ['activities', 'companies', 'contacts', 'opportunities', 'projects', 'products', 'purchaseorders', 'tasks', 'eventLog'];
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
      };
      dataArray.push(data);
    });

    return dataArray;
  }

});
