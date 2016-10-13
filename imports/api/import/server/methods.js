import _ from 'lodash';

import { importActivity } from './entities/activities.js';
import { importCompany } from './entities/companies.js';
import { importContact } from './entities/contacts.js';
import { importJob } from './entities/jobs.js';
import { importTask } from './entities/tasks.js';

import { Tenants } from '/imports/api/collections.js';

export const importRows = (dataRows, entityType, fieldMap, userId) => {
  //Get field name used for imported data from RT schema field name
  const getImportField = (fieldName) => {
    const result = _.result(_.find(fieldMap, function(obj) {
      return obj.schemaField === fieldName;
    }), 'importField');
    return result;
  };

  //Get value for RT field from an imported data row
  const getValueForField = (row, field) => {
    const result = row[getImportField(field)];
    if (!result) return null;
    return result;
  };

  //Get custom fields from field map
  const globalCustomFields = _.filter(fieldMap, { fieldType: 'globalCustomField'});
  const localCustomFields = _.filter(fieldMap, { fieldType: 'localCustomField'});

  //Get number of rows
  const importTotal = dataRows.length;

  //Get current user data
  const user = Meteor.users.findOne({ _id: userId });
  const tenant = Tenants.findOne({ _id: user.group });

  Partitioner.bindUserGroup(userId, () => {
    //Config tenant specific vars used for importing rows
    let rtId = 0;
    let importFunction;
    const errorList = UserSession.get("importErrors", userId);
    UserSession.set("progressValue", 0, userId);
    switch (entityType) {
      case "activities":
        importFunction = importActivity;
        rtId = tenant.settings.activity.defaultNumber;
        break;
      case "companies":
        importFunction = importCompany;
        rtId = tenant.settings.company.defaultNumber;
        break;
      case "contacts":
        importFunction = importContact;
        rtId = tenant.settings.contact.defaultNumber;
        break;
      case "jobs":
        importFunction = importJob;
        rtId = tenant.settings.job.defaultNumber;
        break;
      case "tasks":
        importFunction = importTask;
        rtId = tenant.settings.task.defaultNumber;
        break;
    }

    //Loop through data rows
    _.each(dataRows, function(row, i) {
      rtId++;
      const percentDone = ((i / importTotal) * 100).toFixed(0);
      UserSession.set("progressValue", percentDone, userId);

      //Note: if entity doesn't have custom fields, globalCustomFields and localCustomFields should = []
      const res = importFunction(row, getValueForField, userId, rtId, globalCustomFields, localCustomFields);

      //Handle result of importing the entity
      if (res.error) {
        errorList.push(`<span class="label label-danger">ERROR</span> ${res.error}`);
      }
      if (res.warning.length > 0) {
        _.each(res.warning, (warning) => {
          errorList.push(`<span class="label label-warning">WARNING</span> ${warning} - <b>#${rtId}</b><br>`);
        });
      }
    });

    //Send results to client
    UserSession.set("progressValue", 100, userId);
    UserSession.set("importErrors", errorList, userId);
  });
  return true;
};

Meteor.methods({
  'import.do': function(importData, entityType, fieldMap, userId) {
    return importRows(importData, entityType, fieldMap, userId);
  }
});