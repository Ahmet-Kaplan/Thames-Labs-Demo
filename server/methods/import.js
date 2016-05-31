Meteor.methods({
  'import.do': function(userId, entityType, dataToImport, selectedValues, customFields) {
    var importTotal = dataToImport.length;
    var user = Meteor.users.findOne({_id: userId});
    var tenant = Tenants.findOne({_id: user.group});
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
            if (_.result(_.find(selectedValues, function(obj) {
                return obj.schemaField === 'website';
              }), 'fieldValue')) {
              var url = row[_.result(_.find(selectedValues, function(obj) {
                return obj.schemaField === 'website';
              }), 'fieldValue')];
              var rx = new RegExp(/(^$)|((https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?)/);
              formattedWebsite = (rx.test(url) === false ? '' : url);
            }

            if(Companies.findOne({name: row[_.result(_.find(selectedValues, function(obj) {return obj.schemaField === 'name';}), 'fieldValue')]})){
                errorList.push('Could not import "' + row[_.result(_.find(selectedValues, function(obj) {
                  return obj.schemaField === 'name';
                }), 'fieldValue')] + '": a company with this name already exists.');
                UserSession.set("importErrors", errorList, userId);
                return;
            }

            Companies.insert({
              name: row[_.result(_.find(selectedValues, function(obj) {return obj.schemaField === 'name';}), 'fieldValue')],
              address: (_.result(_.find(selectedValues, function(obj) {return obj.schemaField === 'address';}), 'fieldValue') ? row[_.result(_.find(selectedValues, function(obj) {return obj.schemaField === 'address';}), 'fieldValue')] : null),
              city: (_.result(_.find(selectedValues, function(obj) {return obj.schemaField === 'city';}), 'fieldValue') ? row[_.result(_.find(selectedValues, function(obj) {return obj.schemaField === 'city';}), 'fieldValue')] : null),
              county: (_.result(_.find(selectedValues, function(obj) {return obj.schemaField === 'county';}), 'fieldValue') ? row[_.result(_.find(selectedValues, function(obj) {return obj.schemaField === 'county';}), 'fieldValue')] : null),
              postcode: (_.result(_.find(selectedValues, function(obj) {return obj.schemaField === 'postcode';}), 'fieldValue') ? row[_.result(_.find(selectedValues, function(obj) {return obj.schemaField === 'postcode';}), 'fieldValue')] : null),
              country: (_.result(_.find(selectedValues, function(obj) {return obj.schemaField === 'country';}), 'fieldValue') ? row[_.result(_.find(selectedValues, function(obj) {return obj.schemaField === 'country';}), 'fieldValue')] : null),
              website: (_.result(_.find(selectedValues, function(obj) {return obj.schemaField === 'website';}), 'fieldValue') ? formattedWebsite : null),
              phone: (_.result(_.find(selectedValues, function(obj) {return obj.schemaField === 'phone';}), 'fieldValue') ? row[_.result(_.find(selectedValues, function(obj) {return obj.schemaField === 'phone';}), 'fieldValue')] : null),
              createdBy: userId,
              sequencedIdentifier: currRealTimeIndex
            }, function(error, docId) {
              if (error) {
                errorList.push('Could not import "' + row[_.result(_.find(selectedValues, function(obj) {
                  return obj.schemaField === 'name';
                }), 'fieldValue')] + '": ' + error);
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
                        errorList.push('Could not add custom fields for "' + row[_.result(_.find(selectedValues, function(obj) {
                          return obj.schemaField === 'name';
                        }), 'fieldValue')] + '": ' + cfErr);
                        UserSession.set("importErrors", errorList, userId);
                      }
                    });
                  });
                }
              }
            });
          });

          break;
      }
    });

    return true;
  }
});