import _ from 'lodash';

import { importActivity } from './entities/activities.js';
import { importCompany } from './entities/companies.js';
import { importContact } from './entities/contacts.js';
import { importOpportunity } from './entities/opportunities.js';
import { importProduct } from './entities/products.js';
import { importProject } from './entities/projects.js';
import { importPurchaseOrder } from './entities/purchase-orders.js';
import { importTask } from './entities/tasks.js';

export const importRows = (importData, entityType, fieldMap, userId, globalCustomFields, localCustomFields) => {
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

  //Get number of rows
  const importTotal = importData.length;

  //Get current user data
  const user = Meteor.users.findOne({
    _id: userId
  });
  const tenant = Tenants.findOne({
    _id: user.group
  });

  Partitioner.bindUserGroup(userId, () => {
    UserSession.set("importProgress", 0, userId);
    var errorList = UserSession.get("importErrors", userId);
    let rtId = 0;
    switch (entityType) {

      case "activities":
        //Loop through importData
        _.each(importData, function(row, i) {
          rtId++;
          const percentDone = ((i / importTotal) * 100).toFixed(0);
          UserSession.set("importProgress", percentDone, userId);

          const res = importActivity(row, getValueForField, userId, rtId);
          //Handle result of importing the entity
          if (res.error) {
            errorList.push(`<span class="label label-danger">ERROR</span> ${res.error}`);
          }
        });
        break;


      case "companies":
        rtId = tenant.settings.company.defaultNumber;
        //Loop through importData
        _.each(importData, function(row, i) {
          rtId++;
          const res = importCompany(row, getValueForField, userId, rtId, localCustomFields, globalCustomFields);

          //Handle result of importing the entity
          if (res.error) {
            errorList.push(`<span class="label label-danger">ERROR</span> Could not import "${getValueForField(row, 'name')}": ${res.error}`);
          } else if (res.warning == 'company-exists') {
            errorList.push(`<span class="label label-warning">WARNING</span> Another company with the name "${getValueForField(row, 'name')}" exists. If the record contained in your import file is the same company, you can use the <em>Merge tool</em> to combine them into a single record.`);
          } else if (res.warning == 'custom-fields') {
            errorList.push(`<span class="label label-warning">WARNING</span> Could not add custom fields for "${getValueForField(row, 'name')}".`);
          }

          const percentDone = ((i / importTotal) * 100).toFixed(0);
          UserSession.set("importProgress", percentDone, userId);
        });
        break;


      case "contacts":
        rtId = tenant.settings.contact.defaultNumber;
        //Loop through importData
        _.each(importData, function(row, i) {
          rtId++;
          const res = importContact(row, getValueForField, userId, rtId, localCustomFields);

          //Handle result of importing the entity
          if (res.error) {
            errorList.push(`<span class="label label-danger">ERROR</span> Could not import "${getValueForField(row, 'forename')} ${getValueForField(row, 'surname')}": ${res.error}`);
          } else if (res.warning == 'contact-exists') {
            errorList.push(`<span class="label label-warning">WARNING</span> Another contact with the name "${getValueForField(row, 'forename')} ${getValueForField(row, 'surname')}" exists. We have imported the record contained in your import file, but recommend you manually remove any unnecessary records.`);
          } else if (res.warning == 'custom-fields') {
            errorList.push(`<span class="label label-warning">WARNING</span> Could not add custom fields for "${getValueForField(row, 'forename')} ${getValueForField(row, 'surname')}".`);
          }

          const percentDone = ((i / importTotal) * 100).toFixed(0);
          UserSession.set("importProgress", percentDone, userId);
        });
        break;


      case "opportunities":
        rtId = tenant.settings.opportunity.defaultNumber;
        //Loop through importData
        _.each(importData, function(row, i) {
          const percentDone = ((i / importTotal) * 100).toFixed(0);
          UserSession.set("importProgress", percentDone, userId);
          console.log(percentDone);

          rtId++;

          const res = importOpportunity(row, getValueForField, userId, rtId);

          //Handle result of importing the entity
          if (res.error) {
            errorList.push(`<span class="label label-danger">ERROR</span> Could not import "${getValueForField(row, 'name')}": ${res.error}`);
          } else if (res.warning.length > 0) {
            _.each(res.warning, function(message) {
              switch (message) {
                case "linked-company":
                  errorList.push(`<span class="label label-warning">WARNING</span> Could not find referenced company for "${getValueForField(row, 'name')}".`);
                  break;
                case "linked-contact":
                  errorList.push(`<span class="label label-warning">WARNING</span> Could not find referenced contact for "${getValueForField(row, 'name')}".`);
                  break;
                case "already-exists":
                  errorList.push(`<span class="label label-warning">WARNING</span> Another opportunity with the name "${getValueForField(row, 'name')}" exists.`);
                  break;
              }
            });
          }
        });
        break;


      case "projects":
        rtId = tenant.settings.project.defaultNumber;
        //Loop through importData
        _.each(importData, function(row, i) {
          rtId++;
          const percentDone = ((i / importTotal) * 100).toFixed(0);
          UserSession.set("importProgress", percentDone, userId);

          const res = importProject(row, getValueForField, userId, rtId);

          //Handle result of importing the entity
          if (res.error) {
            errorList.push(`<span class="label label-danger">ERROR</span> Could not import "${getValueForField(row, 'name')}": ${res.error}`);
          } else if (res.warning.length > 0) {
            _.each(res.warning, function(message) {
              switch (message) {
                case "linked-company":
                  errorList.push(`<span class="label label-warning">WARNING</span> Could not find referenced company for "${getValueForField(row, 'name')}".`);
                  break;
                case "linked-contact":
                  errorList.push(`<span class="label label-warning">WARNING</span> Could not find referenced contact for "${getValueForField(row, 'name')}".`);
                  break;
                case "already-exists":
                  errorList.push(`<span class="label label-warning">WARNING</span> Another project with the name "${getValueForField(row, 'name')}" exists.`);
                  break;
              }
            });
          }
        });
        break;


      case "products":
        rtId = tenant.settings.product.defaultNumber;
        //Loop through importData
        _.each(importData, function(row, i) {
          rtId++;
          const res = importProduct(row, getValueForField, userId, rtId);

          //Handle result of importing the entity
          if (res.error) {
            errorList.push(`<span class="label label-danger">ERROR</span> Could not import "${getValueForField(row, 'name')}": ${res.error}`);
          }

          const percentDone = ((i / importTotal) * 100).toFixed(0);
          UserSession.set("importProgress", percentDone, userId);
        });
        break;


      case "purchaseorders":
        rtId = tenant.settings.purchaseorder.defaultNumber;
        //Loop through importData
        _.each(importData, function(row, i) {
          rtId++;
          const percentDone = ((i / importTotal) * 100).toFixed(0);
          UserSession.set("importProgress", percentDone, userId);

          const res = importPurchaseOrder(row, getValueForField, userId, rtId);
          //Handle result of importing the entity
          if (res.error) {
            errorList.push(`<span class="label label-danger">ERROR</span> Could not import "${getValueForField(row, 'name')}": ${res.error}`);
          } else if (res.warning.length > 0) {
            _.each(res.warning, function(message) {
              switch (message) {
                case "linked-company":
                  errorList.push(`<span class="label label-warning">WARNING</span> Could not find referenced company for "${getValueForField(row, 'name')}".`);
                  break;
                case "linked-contact":
                  errorList.push(`<span class="label label-warning">WARNING</span> Could not find referenced contact for "${getValueForField(row, 'name')}".`);
                  break;
                case "already-exists":
                  errorList.push(`<span class="label label-warning">WARNING</span> Another purchase order with the name "${getValueForField(row, 'name')}" exists.`);
                  break;
              }
            });
          }
        });
        break;

      case "tasks":
        rtId = tenant.settings.task.defaultNumber;
        //Loop through importData
        _.each(importData, function(row, i) {
          rtId++;
          const res = importTask(row, getValueForField, userId, rtId);

          //Handle result of importing the entity
          if (res.error) {
            errorList.push(`<span class="label label-danger">ERROR</span> Could not import "${getValueForField(row, 'title')}": ${res.error}`);
          }

          const percentDone = ((i / importTotal) * 100).toFixed(0);
          UserSession.set("importProgress", percentDone, userId);
        });
        break;

    }
    UserSession.set("importProgress", 100, userId);
    UserSession.set("importErrors", errorList, userId);
  });
  return true;
};

Meteor.methods({
  'import.do': function(importData, entityType, fieldMap, userId, globalCustomFields, localCustomFields) {
    return importRows(importData, entityType, fieldMap, userId, globalCustomFields, localCustomFields);
  }
});