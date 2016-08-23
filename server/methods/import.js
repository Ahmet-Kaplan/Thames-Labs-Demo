function getFieldValueByKey(valueList, key) {
  var result = _.result(_.find(valueList, function(obj) {
    return obj.schemaField === key;
  }), 'importField');
  return result;
}

Meteor.methods({
  'import.dont': function(userId, entityType, dataToImport, selectedValues, globalCustomFields, customFields) {
    console.log('entityType:' + entityType);
    console.log('dataToImport:');
    console.log(dataToImport[0]);
    console.log('selectedValues:');
    console.log(selectedValues);
    try {
      var importTotal = dataToImport.length;
      var user = Meteor.users.findOne({
        _id: userId
      });
      var tenant = Tenants.findOne({
        _id: user.group
      });
      var currRealTimeIndex = 0;

      Partitioner.bindUserGroup(userId, function() {
        var errorList = UserSession.get("importErrors", userId);

        switch (entityType) {
          case 'companies':
            _.each(dataToImport, function(row, iter) {
              currRealTimeIndex = tenant.settings.company.defaultNumber + iter;

              var percDone = ((iter / importTotal) * 100).toFixed(2);
              UserSession.set("importProgress", percDone, userId);

              var formattedWebsite = '';
              if (getFieldValueByKey(selectedValues, 'website')) {
                var url = row[getFieldValueByKey(selectedValues, 'website')];
                var rx = new RegExp(/(^$)|((https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?)/);
                formattedWebsite = (rx.test(url) === false ? '' : url);
              }

              if (Companies.findOne({
                name: row[getFieldValueByKey(selectedValues, 'name')]
              })) {
                errorList.push('<span class="label label-warning">WARNING</span> Another company with the name "' + row[getFieldValueByKey(selectedValues, 'name')] + '" already exists. If the record contained in your import file is the same company, you can use the <em>Merge tool</em> to combine them into a single record.');
                UserSession.set("importErrors", errorList, userId);
              }

              const companyId = Companies.insert({
                name: row[getFieldValueByKey(selectedValues, 'name')],
                address: (getFieldValueByKey(selectedValues, 'address') ? row[getFieldValueByKey(selectedValues, 'address')] : null),
                address2: (getFieldValueByKey(selectedValues, 'address2') ? row[getFieldValueByKey(selectedValues, 'address2')] : null),
                city: (getFieldValueByKey(selectedValues, 'city') ? row[getFieldValueByKey(selectedValues, 'city')] : null),
                county: (getFieldValueByKey(selectedValues, 'county') ? row[getFieldValueByKey(selectedValues, 'county')] : null),
                postcode: (getFieldValueByKey(selectedValues, 'postcode') ? row[getFieldValueByKey(selectedValues, 'postcode')] : null),
                country: (getFieldValueByKey(selectedValues, 'country') ? row[getFieldValueByKey(selectedValues, 'country')] : null),
                website: (getFieldValueByKey(selectedValues, 'website') ? formattedWebsite : null),
                phone: (getFieldValueByKey(selectedValues, 'phone') ? row[getFieldValueByKey(selectedValues, 'phone')] : null),
                createdBy: userId,
                sequencedIdentifier: currRealTimeIndex
              }, function(error, docId) {
                if (error) {
                  errorList.push('<span class="label label-danger">ERROR</span> Could not import "' + row[getFieldValueByKey(selectedValues, 'name')] + '": ' + error);
                  UserSession.set("importErrors", errorList, userId);
                } else {
                  if (customFields.length > 0) {
                    _.each(customFields, function(field, i) {
                      CustomFields.insert({
                        name: field,
                        value: (row[field] ? row[field] : ''),
                        type: 'text',
                        global: false,
                        order: i,
                        target: 'company',
                        entityId: docId
                      }, function(cfErr) {
                        if (cfErr) {
                          errorList.push('<span class="label label-danger">ERROR</span> Could not add custom fields for "' + row[getFieldValueByKey(selectedValues, 'name')] + '": ' + cfErr);
                          UserSession.set("importErrors", errorList, userId);
                        }
                      });
                    });
                  }

                  if(globalCustomFields.length > 0) {
                    _.each(globalCustomFields, function(field, i) {
                      CustomFields.update({
                        name: field.schemaField,
                        global: true,
                        target: 'company',
                        entityId: docId
                      }, {
                        $set: {
                          value: (row[field.fieldValue] ? row[field.fieldValue] : ''),
                        }
                      });
                    });
                  }
                }
              });

              if (row[getFieldValueByKey(selectedValues, 'tags')]) {
                _.each(row[getFieldValueByKey(selectedValues, 'tags')].split(','), function(tag) {
                  Companies.addTag(tag, {
                    _id: companyId
                  });
                });
              }
            });
            break;

          case 'contacts':
            _.each(dataToImport, function(row, iter) {
              currRealTimeIndex = tenant.settings.contact.defaultNumber + iter;

              var percDone = ((iter / importTotal) * 100).toFixed(2);
              UserSession.set("importProgress", percDone, userId);


              var companyId = null;
              if (getFieldValueByKey(selectedValues, 'companyName')) {
                var companyName = row[getFieldValueByKey(selectedValues, 'companyName')];
                var company = Companies.findOne({
                  name: companyName
                });
                if (company) companyId = company._id;
              }

              if (companyId) {
                if (Contacts.findOne({
                  forename: row[getFieldValueByKey(selectedValues, 'forename')],
                  surname: row[getFieldValueByKey(selectedValues, 'surname')],
                  companyId: companyId
                })) {
                  errorList.push('<span class="label label-warning">WARNING</span> Another contact with the name "' + row[getFieldValueByKey(selectedValues, 'forename')] + ' ' + row[getFieldValueByKey(selectedValues, 'surname')] + '" already exists against company "' + row[getFieldValueByKey(selectedValues, 'companyName')] + '". We have imported the record contained in your import file, but recommend you manually remove any unnecessary records.');
                  UserSession.set("importErrors", errorList, userId);
                }
              } else {
                if (Contacts.findOne({
                  forename: row[getFieldValueByKey(selectedValues, 'forename')],
                  surname: row[getFieldValueByKey(selectedValues, 'surname')]
                })) {
                  errorList.push('<span class="label label-warning">WARNING</span> Another contact with the name "' + row[getFieldValueByKey(selectedValues, 'forename')] + ' ' + row[getFieldValueByKey(selectedValues, 'surname')] + '" already exists. We have imported the record contained in your import file, but recommend you manually remove any unnecessary records.');
                  UserSession.set("importErrors", errorList, userId);
                }
              }

              const contactId = Contacts.insert({
                forename: row[getFieldValueByKey(selectedValues, 'forename')],
                surname: row[getFieldValueByKey(selectedValues, 'surname')],
                jobtitle: (getFieldValueByKey(selectedValues, 'jobtitle') ? row[getFieldValueByKey(selectedValues, 'jobtitle')] : null),
                phone: (getFieldValueByKey(selectedValues, 'phone') ? row[getFieldValueByKey(selectedValues, 'phone')] : null),
                mobile: (getFieldValueByKey(selectedValues, 'mobile') ? row[getFieldValueByKey(selectedValues, 'mobile')] : null),
                email: (getFieldValueByKey(selectedValues, 'email') ? row[getFieldValueByKey(selectedValues, 'email')] : null),
                address: (getFieldValueByKey(selectedValues, 'address') ? row[getFieldValueByKey(selectedValues, 'website')] : null),
                city: (getFieldValueByKey(selectedValues, 'city') ? row[getFieldValueByKey(selectedValues, 'city')] : null),
                county: (getFieldValueByKey(selectedValues, 'county') ? row[getFieldValueByKey(selectedValues, 'county')] : null),
                postcode: (getFieldValueByKey(selectedValues, 'postcode') ? row[getFieldValueByKey(selectedValues, 'postcode')] : null),
                country: (getFieldValueByKey(selectedValues, 'country') ? row[getFieldValueByKey(selectedValues, 'country')] : null),
                companyId: companyId,
                createdBy: userId,
                sequencedIdentifier: currRealTimeIndex
              }, function(error, docId) {
                if (error) {
                  errorList.push('<span class="label label-danger">ERROR</span> Could not import "' + row[getFieldValueByKey(selectedValues, 'forename')] + ' ' + row[getFieldValueByKey(selectedValues, 'surname')] + '": ' + error);
                  UserSession.set("importErrors", errorList, userId);
                } else {
                  if (customFields.length > 0) {
                    _.each(customFields, function(field, i) {
                      CustomFields.insert({
                        name: field,
                        value: (row[field] ? row[field] : ''),
                        type: 'text',
                        global: false,
                        order: i,
                        target: 'contact',
                        entityId: docId
                      }, function(cfErr) {
                        if (cfErr) {
                          errorList.push('<span class="label label-danger">ERROR</span> Could not add custom fields for "' + row[getFieldValueByKey(selectedValues, 'forename')] + ' ' + row[getFieldValueByKey(selectedValues, 'surname')] + '": ' + cfErr);
                          UserSession.set("importErrors", errorList, userId);
                        }
                      });
                    });
                  }
                }
              });

              if (row[getFieldValueByKey(selectedValues, 'tags')]) {
                _.each(row[getFieldValueByKey(selectedValues, 'tags')].split(','), function(tag) {
                  Contacts.addTag(tag, {
                    _id: contactId
                  });
                });
              }
            });
            break;

          case 'tasks':
            _.each(dataToImport, function(row, iter) {
              var percDone = ((iter / importTotal) * 100).toFixed(2);
              UserSession.set("importProgress", percDone, userId);

              var assignee = Meteor.users.findOne({
                "profile.name": row[getFieldValueByKey(selectedValues, 'assignee')]
              });

              if (!assignee) {
                errorList.push('<span class="label label-danger">ERROR</span> Could not find user "' + row[getFieldValueByKey(selectedValues, 'assignee')] + ' for task  "' + row[getFieldValueByKey(selectedValues, 'title')] + '".');
                UserSession.set("importErrors", errorList, userId);
                return;
              }

              var entity = null;
              if (row[getFieldValueByKey(selectedValues, 'recordType')] === 'user') {
                entity = Meteor.users.findOne({
                  "profile.name": row[getFieldValueByKey(selectedValues, 'record')]
                });
              } else if (row[getFieldValueByKey(selectedValues, 'recordType')] !== 'contact') {
                var collectionName = null;
                switch (row[getFieldValueByKey(selectedValues, 'recordType')]) {
                  case 'company':
                    collectionName = 'companies';
                    break;
                  case 'opportunity':
                    collectionName = 'opportunities';
                    break;
                  case 'project':
                    collectionName = 'projects';
                    break;
                }

                entity = Collections[collectionName].findOne({
                  name: row[getFieldValueByKey(selectedValues, 'record')]
                });
              } else {
                var contactName = row[getFieldValueByKey(selectedValues, 'record')];
                entity = Contacts.findOne({
                  forename: contactName.split(' ')[0],
                  surname: contactName.split(' ')[1]
                });
              }

              if (!entity) {
                errorList.push('<span class="label label-danger">ERROR</span> Could not find entity "' + row[getFieldValueByKey(selectedValues, 'record')] + '" for task  "' + row[getFieldValueByKey(selectedValues, 'title')] + '".');
                UserSession.set("importErrors", errorList, userId);
                return;
              }

              Tasks.insert({
                title: row[getFieldValueByKey(selectedValues, 'title')],
                description: (getFieldValueByKey(selectedValues, 'description') ? row[getFieldValueByKey(selectedValues, 'description')] : null),
                dueDate: (getFieldValueByKey(selectedValues, 'dueDate') ? row[getFieldValueByKey(selectedValues, 'dueDate')] : null),
                assigneeId: assignee._id,
                completed: false,
                entityType: row[getFieldValueByKey(selectedValues, 'recordType')],
                entityId: entity._id,
                createdBy: userId
              }, function(error, docId) {
                if (error) {
                  errorList.push('<span class="label label-danger">ERROR</span> Could not import "' + row[getFieldValueByKey(selectedValues, 'name')] + '": ' + error);
                  UserSession.set("importErrors", errorList, userId);
                }
              });
            });
            break;

          case 'opportunities':
            _.each(dataToImport, function(row, iter) {

              currRealTimeIndex = tenant.settings.opportunity.defaultNumber + iter;

              var percDone = ((iter / importTotal) * 100).toFixed(2);
              UserSession.set("importProgress", percDone, userId);

              if (Opportunities.findOne({
                name: row[getFieldValueByKey(selectedValues, 'name')]
              })) {
                errorList.push('<span class="label label-warning">WARNING</span> Another opportunity with the name "' + row[getFieldValueByKey(selectedValues, 'name')] + '" already exists.');
                UserSession.set("importErrors", errorList, userId);
              }

              var salesManager = null, company = null, contact = null;

              if (getFieldValueByKey(selectedValues, 'salesManager')) {
                salesManager = Meteor.users.findOne({
                  "profile.name": row[getFieldValueByKey(selectedValues, 'salesManager')]
                });
              }

              if (getFieldValueByKey(selectedValues, 'companyName')) {
                var companyName = row[getFieldValueByKey(selectedValues, 'companyName')];
                company = Companies.findOne({
                  name: companyName
                });
              }

              if (getFieldValueByKey(selectedValues, 'contactName')) {
                var contactName = row[getFieldValueByKey(selectedValues, 'contactName')];
                contact = Contacts.findOne({
                  forename: contactName.split(' ')[0],
                  surname: contactName.split(' ')[1]
                });
              }

              Opportunities.insert({
                name: row[getFieldValueByKey(selectedValues, 'name')],
                description: row[getFieldValueByKey(selectedValues, 'description')],
                date: row[getFieldValueByKey(selectedValues, 'date')],
                estCloseDate: (getFieldValueByKey(selectedValues, 'estCloseDate') ? row[getFieldValueByKey(selectedValues, 'estCloseDate')] : null),
                value: (getFieldValueByKey(selectedValues, 'value') ? row[getFieldValueByKey(selectedValues, 'value')] : null),
                companyId: (company ? company._id : null),
                contactId: (contact ? contact._id : null),
                salesManagerId: (salesManager ? salesManager._id : null),
                createdBy: userId,
                sequencedIdentifier: currRealTimeIndex
              }, function(error, docId) {
                if (error) {
                  errorList.push('<span class="label label-danger">ERROR</span> Could not import "' + row[getFieldValueByKey(selectedValues, 'name')] + '": ' + error);
                  UserSession.set("importErrors", errorList, userId);
                }
              });
            });
            break;

          case 'projects':
            _.each(dataToImport, function(row, iter) {
              currRealTimeIndex = tenant.settings.project.defaultNumber + iter;

              var percDone = ((iter / importTotal) * 100).toFixed(2);
              UserSession.set("importProgress", percDone, userId);

              if (Projects.findOne({
                name: row[getFieldValueByKey(selectedValues, 'name')]
              })) {
                errorList.push('<span class="label label-warning">WARNING</span> Another project with the name "' + row[getFieldValueByKey(selectedValues, 'name')] + '" already exists.');
                UserSession.set("importErrors", errorList, userId);
              }

              var accountManager = null, company = null, contact = null;
              var staffArray = [];

              if (getFieldValueByKey(selectedValues, 'accountManager')) {
                accountManager = Meteor.users.findOne({
                  "profile.name": row[getFieldValueByKey(selectedValues, 'accountManager')]
                });
              }

              if (getFieldValueByKey(selectedValues, 'companyName')) {
                var companyName = row[getFieldValueByKey(selectedValues, 'companyName')];
                company = Companies.findOne({
                  name: companyName
                });
              }

              if (getFieldValueByKey(selectedValues, 'contactName')) {
                var contactName = row[getFieldValueByKey(selectedValues, 'contactName')];
                contact = Contacts.findOne({
                  forename: contactName.split(' ')[0],
                  surname: contactName.split(' ')[1]
                });
              }

              if (getFieldValueByKey(selectedValues, 'staff')) {
                var staffNames = row[getFieldValueByKey(selectedValues, 'staff')].split(',');
                _.each(staffNames, function(staff) {
                  var staffRecord = Meteor.users.findOne({
                    "profile.name": staff
                  });
                  if (staffRecord) staffArray.push(staffRecord._id);
                });
              }

              if (!company && !contact) {
                errorList.push('<span class="label label-warning">WARNING</span> A project must be assigned to either a company or a contact, but "' + row[getFieldValueByKey(selectedValues, 'name')]  + '" does not have one specified.');
                UserSession.set("importErrors", errorList, userId);
                return;
              }

              if (!accountManager) {
                errorList.push('<span class="label label-warning">WARNING</span> "Account Manager" is a required field, but "' + row[getFieldValueByKey(selectedValues, 'name')]  + '" does not have one specified.');
                UserSession.set("importErrors", errorList, userId);
                return;
              }

              Projects.insert({
                name: row[getFieldValueByKey(selectedValues, 'name')],
                description: row[getFieldValueByKey(selectedValues, 'description')],
                dueDate: row[getFieldValueByKey(selectedValues, 'date')],
                value: (getFieldValueByKey(selectedValues, 'value') ? row[getFieldValueByKey(selectedValues, 'value')] : null),
                companyId: (company ? company._id : null),
                contactId: (contact ? contact._id : null),
                userId: accountManager._id,
                staff: staffArray,
                createdBy: userId,
                sequencedIdentifier: currRealTimeIndex
              }, function(error, docId) {
                if (error) {
                  errorList.push('<span class="label label-danger">ERROR</span> Could not import "' + row[getFieldValueByKey(selectedValues, 'name')] + '": ' + error);
                  UserSession.set("importErrors", errorList, userId);
                }
              });
            });
            break;

          case 'products':
            _.each(dataToImport, function(row, iter) {
              currRealTimeIndex = tenant.settings.product.defaultNumber + iter;

              var percDone = ((iter / importTotal) * 100).toFixed(2);
              UserSession.set("importProgress", percDone, userId);

              Products.insert({
                name: row[getFieldValueByKey(selectedValues, 'name')],
                description: row[getFieldValueByKey(selectedValues, 'description')],
                price: (getFieldValueByKey(selectedValues, 'price') ? row[getFieldValueByKey(selectedValues, 'price')] : null),
                cost: (getFieldValueByKey(selectedValues, 'cost') ? row[getFieldValueByKey(selectedValues, 'cost')] : null),
                createdBy: userId,
                sequencedIdentifier: currRealTimeIndex
              }, function(error, docId) {
                if (error) {
                  errorList.push('<span class="label label-danger">ERROR</span> Could not import "' + row[getFieldValueByKey(selectedValues, 'name')] + '": ' + error);
                  UserSession.set("importErrors", errorList, userId);
                }
              });
            });
            break;

          case 'purchaseOrders':
            _.each(dataToImport, function(row, iter) {
              currRealTimeIndex = tenant.settings.purchaseorder.defaultNumber + iter;

              var percDone = ((iter / importTotal) * 100).toFixed(2);
              UserSession.set("importProgress", percDone, userId);

              if (PurchaseOrders.findOne({
                description: row[getFieldValueByKey(selectedValues, 'description')]
              })) {
                errorList.push('<span class="label label-warning">WARNING</span> Another purchase order with the name "' + row[getFieldValueByKey(selectedValues, 'name')] + '" already exists.');
                UserSession.set("importErrors", errorList, userId);
              }

              var company = null, contact = null;

              if (getFieldValueByKey(selectedValues, 'companyName')) {
                var companyName = row[getFieldValueByKey(selectedValues, 'companyName')];
                company = Companies.findOne({
                  name: companyName
                });
              }

              if (getFieldValueByKey(selectedValues, 'contactName')) {
                var contactName = row[getFieldValueByKey(selectedValues, 'contactName')];
                contact = Contacts.findOne({
                  forename: contactName.split(' ')[0],
                  surname: contactName.split(' ')[1]
                });
              }

              PurchaseOrders.insert({
                description: row[getFieldValueByKey(selectedValues, 'description')],
                supplierReference: (getFieldValueByKey(selectedValues, 'supplierReference') ? row[getFieldValueByKey(selectedValues, 'supplierReference')] : null),
                orderDate: (getFieldValueByKey(selectedValues, 'orderDate') ? row[getFieldValueByKey(selectedValues, 'orderDate')] : null),
                notes: (getFieldValueByKey(selectedValues, 'notes') ? row[getFieldValueByKey(selectedValues, 'notes')] : null),
                paymentMethod: (getFieldValueByKey(selectedValues, 'paymentMethod') ? row[getFieldValueByKey(selectedValues, 'paymentMethod')] : null),
                companyId: (company ? company._id : null),
                contactId: (contact ? contact._id : null),
                createdBy: userId,
                sequencedIdentifier: currRealTimeIndex
              }, function(error, docId) {
                if (error) {
                  errorList.push('<span class="label label-danger">ERROR</span> Could not import "' + row[getFieldValueByKey(selectedValues, 'name')] + '": ' + error);
                  UserSession.set("importErrors", errorList, userId);
                }
              });
            });
            break;

          case 'activities':
            _.each(dataToImport, function(row, iter) {
              var percDone = ((iter / importTotal) * 100).toFixed(2);
              UserSession.set("importProgress", percDone, userId);
              var recType = row[getFieldValueByKey(selectedValues, 'recordType')];
              var entity = null;
              var dispData = "";

              if (recType !== 'contact' && recType !== 'purchaseOrder') {
                var collectionName = null;
                switch (row[getFieldValueByKey(selectedValues, 'recordType')]) {
                  case 'company':
                    collectionName = 'companies';
                    break;
                  case 'opportunity':
                    collectionName = 'opportunities';
                    break;
                  case 'project':
                    collectionName = 'projects';
                    break;
                }

                entity = Collections[collectionName].findOne({
                  name: row[getFieldValueByKey(selectedValues, 'record')]
                });
                if(entity) dispData = entity.name;
              } else if(recType === 'contact') {
                var contactName = row[getFieldValueByKey(selectedValues, 'record')];
                entity = Contacts.findOne({
                  forename: contactName.split(' ')[0],
                  surname: contactName.split(' ')[1]
                });
                if(entity) dispData = entity.forename + " " + entity.surname;
              } else if(recType === 'purchaseOrder') {
                var poDesc = row[getFieldValueByKey(selectedValues, 'record')];
                entity = PurchaseOrders.findOne({
                  description: poDesc
                });
                if(entity) dispData = entity.description;
              }

              if (!entity) {
                errorList.push('<span class="label label-danger">ERROR</span> Could not find entity "' + row[getFieldValueByKey(selectedValues, 'record')] + '" for ' + recType + '  "' + row[getFieldValueByKey(selectedValues, 'title')] + '".');
                UserSession.set("importErrors", errorList, userId);
                return;
              }

              var companyId = null;
              if (recType === "company") {
                companyId = entity._id;
              }else if (recType === "contact") {
                if(entity.companyId) companyId = entity.companyId;
              }

              Activities.insert({
                type: row[getFieldValueByKey(selectedValues, 'type')],
                notes: row[getFieldValueByKey(selectedValues, 'notes')],
                activityTimestamp: (getFieldValueByKey(selectedValues, 'date') ? row[getFieldValueByKey(selectedValues, 'date')] : null),
                primaryEntityType: recType,
                primaryEntityId: entity._id,
                primaryEntityDisplayData: dispData,
                companyId: companyId,
                contactId: (recType === "contact" ? entity._id : null),
                projectId: (recType === "project" ? entity._id : null),
                purchaseOrderId: (recType === "purchaseOrder" ? entity._id : null),
                opportunityId: (recType === "opportunity" ? entity._id : null),
                taskId: (recType === "task" ? entity._id : null),
                createdBy: userId
              }, function(error, docId) {
                if (error) {
                  errorList.push('<span class="label label-danger">ERROR</span> Could not import "' + row[getFieldValueByKey(selectedValues, 'name')] + '": ' + error);
                  UserSession.set("importErrors", errorList, userId);
                }
              });
            });
            break;
        }
      });

      return true;
    } catch (error) {
      return error;
    }
  }
});
