import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'activity.insertBulk': function(values, collectionName, searchDefinition, searchOptions) {
    if(!this.userId) {
      throw new Meteor.Error(400, 'You must be logged in to add activities');
    }

    if (!Collections[collectionName] || !Collections[collectionName].index) {
      throw new Meteor.Error(500, 'Search index not found');
    }

    searchOptions.limit = 99999;
    if (!searchOptions.props) searchOptions.props = {};
    searchOptions.props.export = true;

    const index = Collections[collectionName].index;
    const results = index.search(searchDefinition, searchOptions).fetch();

    _.each(results, (result) => {
      const activityDetails = {
        type: values.type,
        activityTimestamp: values.activityTimestamp,
        notes: values.notes,
        createdAt: values.createdAt,
        createdBy: values.createdBy,
        primaryEntityType: collectionName,
        primaryEntityId: result._id,
      };

      switch(collectionName) {
        case 'companies':
          activityDetails.companyId = result._id;
          activityDetails.primaryEntityDisplayData = result.name;
          break;
        case 'contacts':
          // activityDetails.companyId = result.companyId;
          // activityDetails.contactId = result._id;
          // activityDetails.primaryEntityDisplayData = `${result.title} ${result.forename} ${result.surname}`;
          break;
        case 'projects':
          // activityDetails.companyId = result.companyId;
          // activityDetails.contactId = result.contactId;
          // activityDetails.projectId = result._id;
          // activityDetails.primaryEntityDisplayData = result.name;
          break;
        case 'purchaseorders':
          // activityDetails.companyId = result.companyId;
          // activityDetails.contactId = result.contactId;
          // activityDetails.purchaseOrderId = result._id;
          // activityDetails.primaryEntityDisplayData = result.description;
          break;
        case 'opportunities':
          // activityDetails.companyId = result.companyId;
          // activityDetails.contactId = result.contactId;
          // activityDetails.opportunityId = result._id;
          // activityDetails.primaryEntityDisplayData = result.name;
      }
      Activities.insert(activityDetails);
    });
  }
});