import _ from 'lodash';
import { moment } from 'meteor/momentjs:moment';

//This function takes an opportunity JSON object, and returns another JSON object with required headings for export
const formatOpportunityForExport = (record) => {
  if (record.salesManagerId) {
    const salesManager = Meteor.users.findOne({
      _id: record.salesManagerId,
      profile: {
        $exists: true
      }
    });
    record.salesManager = salesManager ? salesManager.profile.name : "";
  }

  if ( _.has(record, 'currentStageId') ) {
    const tenant = Tenants.findOne({
      _id: Partitioner.group()
    });
    const stages = tenant.settings.opportunity.stages,
          currentStage = _.find(stages, { 'id': record.currentStageId });
    record.stage = currentStage ? currentStage.title : "";
  }

  if ( _.has(record, 'value') ) {
    if(record.value) record.value = record.value.toFixed(2);
    else record.value = "0.00";
  } else {
    record.value = "0.00";
  }

  if (record.date) {
    record.date = moment(record.date).format('DD/MM/YY');
  }
  if (record.estCloseDate) {
    record.estCloseDate = moment(record.estCloseDate).format('DD/MM/YY');
  }

  return {
    name: record.name || "",
    description: record.description || "",
    stage: record.stage || "",
    date: record.date || "",
    estCloseDate: record.estCloseDate || "",
    value: record.value || "",
    salesManager: record.salesManager,
    companyName: record.companyName,
    contactName: record.contactName,
    tags: record.tags || ""
  };
};

export { formatOpportunityForExport };