import _ from 'lodash';
import { moment } from 'meteor/momentjs:moment';
import { Meteor } from 'meteor/meteor';

import { formatActivityForExport } from './entities/activities.js';
import { formatCompanyForExport } from './entities/companies.js';
import { formatContactForExport } from './entities/contacts.js';
import { formatOpportunityForExport } from './entities/opportunities.js';
import { formatProductForExport } from './entities/products.js';
import { formatProjectForExport } from './entities/projects.js';
import { formatPurchaseOrderForExport } from './entities/purchaseorders.js';
import { formatTaskForExport } from './entities/tasks.js';

// These column names are removed from all final exports
// They may be used for interim processing - e.g. looking up related data
// Note: when this code was refactored this was kept as a fallback
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

const getRowForExport = (record, collectionName) => {
  //Common record values are calculated outside the formatEntityForExport functions, as this code is used frequently.
  if (record.companyId) {
    const company = Companies.findOne({
      _id: record.companyId
    });
    record.companyName = company ? company.name : "";
  }

  if (record.contactId) {
    const contact = Contacts.findOne({
      _id: record.contactId
    });
    record.contactName = contact ? contact.name() : "";
  }

  if (record.createdAt) {
    record.createdAt = moment(record.createdAt).format('DD/MM/YY');
  }

  //Format the record object for exporting
  switch(collectionName) {
    case "companies":
      return formatCompanyForExport(record);

    case "contacts":
      return formatContactForExport(record);

    case "opportunities":
      return formatOpportunityForExport(record);

    case "projects":
      return formatProjectForExport(record);

    case "products":
      return formatProductForExport(record);

    case "activities":
      return formatActivityForExport(record);

    case "purchaseorders":
      return formatPurchaseOrderForExport(record);

    case "tasks":
      return formatTaskForExport(record);

    default:
      //With unknown objects return all values, except the excluded ones
      return _.omit(record, OMITTEDCOLUMNS);
  }
};

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

    return results.map((record) => getRowForExport(record, collectionName));
  }
});

export { getRowForExport };