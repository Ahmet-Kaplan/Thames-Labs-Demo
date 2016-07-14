function getFieldValueByKey(valueList, key) {
  var result = _.result(_.find(valueList, function(obj) {
    return obj.schemaField === key;
  }), 'fieldValue');
  return result;
}

Meteor.methods({
  'import.do': function(userId, entityType, dataToImport, selectedValues, customFields) {
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

              var companyId = Companies.insert({
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

              Contacts.insert({
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
        }
      });

      return true;
    } catch (error) {
      return error;
    }
  }
});
