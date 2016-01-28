Meteor.methods({

  'import.AddNewContact': function(row, forenameColumn, surnameColumn, emailColumn, phoneColumn, mobileColumn, jobTitleColumn, companyColumn, addressColumn, cityColumn, countyColumn, postcodeColumn, countryColumn, cfArray, localCF, createMissingCompanies, createExtInfo) {
    ServerSession.set("ContactImportInProgress", true);

    var user = Meteor.users.findOne({
      _id: this.userId
    });

    if (user) {
      var userId = user._id;

      return Partitioner.bindUserGroup(userId, function() {
        if (row[forenameColumn] !== '' && row[surnameColumn] !== '' && row[forenameColumn] !== 'NULL' && row[surnameColumn] !== 'NULL') {
          var existing = Contacts.find({
            forename: row[forenameColumn],
            surname: row[surnameColumn]
          }).fetch().count();

          if (existing === 0) {

            var company;

            if (row[companyColumn] !== '' && row[companyColumn] !== 'NULL') {
              company = Companies.findOne({
                name: row[companyColumn]
              });

              if (!company && createMissingCompanies === true) {
                var companyId = Companies.insert({
                  name: row[companyColumn],
                  createdBy: userId
                });
                company = Companies.findOne({
                  _id: companyId
                });
              }
            }

            Contacts.insert({
                forename: row[forenameColumn],
                surname: row[surnameColumn],
                email: row[emailColumn],
                phone: (phoneColumn !== "" ? row[phoneColumn] : ""),
                mobile: (mobileColumn !== "" ? row[mobileColumn] : ""),
                jobtitle: (jobTitleColumn !== "" ? row[jobTitleColumn] : ""),
                companyId: (company ? company._id : undefined),
                address: (addressColumn !== "" ? row[addressColumn] : ""),
                city: (cityColumn !== "" ? row[cityColumn] : ""),
                county: (countyColumn !== "" ? row[countyColumn] : ""),
                postcode: (postcodeColumn !== "" ? row[postcodeColumn] : ""),
                country: (countryColumn !== "" ? row[countryColumn] : ""),
                createdBy: userId
              },
              function(err, inserted) {
                if (err) {
                  ServerSession.set("ContactImportInProgress", false);
                  return err;
                }

                if (inserted) {
                  var contact = Contacts.findOne({
                    _id: inserted
                  });
                  var customFields = contact.extendedInformation;
                  var cfMaster = [];

                  for (var index in customFields) {
                    if (customFields.hasOwnProperty(index)) {

                      var attr = customFields[index];

                      if (attr.isGlobal) {
                        for (var x in cfArray) {

                          if (cfArray[x].refName === index) {
                            var settings = {
                              "dataName": cfArray[x].refName,
                              "dataValue": row[cfArray[x].refVal],
                              "dataType": attr.dataType,
                              isGlobal: true
                            };
                            cfMaster[index] = settings;
                          }
                        }
                      }
                    }
                  }

                  if (createExtInfo === true) {
                    for (var local in localCF) {
                      if (row[localCF[local].refVal] !== "") {
                        var newLocalField = {
                          "dataName": localCF[local].refName,
                          "dataValue": row[localCF[local].refVal],
                          "dataType": 'text',
                          isGlobal: false
                        };
                        cfMaster.push(newLocalField);
                      }
                    }
                  }

                  Contacts.update(inserted, {
                    $set: {
                      extendedInformation: cfMaster
                    }
                  });
                }

              });
            ServerSession.set("ContactImportInProgress", false);
            return "OK";
          } else {
            ServerSession.set("ContactImportInProgress", false);
            return ('A contact with the name "' + row[forenameColumn] + ' ' + row[surnameColumn] + '" already exists.');
          }
        } else {
          ServerSession.set("ContactImportInProgress", false);
          return 'Contact forename/surname cannot be blank.';
        }
      });
    } else {
      ServerSession.set("ContactImportInProgress", false);
      return 'User not found.';
    }
  },

  'import.companies': function(rows, fields, nameColumn, addressColumn, cityColumn, countyColumn, postcodeColumn, countryColumn, websiteColumn, phoneColumn, cfArray, createExtInfo) {

    var errors = [];

    var user = Meteor.users.findOne({
      _id: this.userId
    });

    if (user) {
      var tenant = Tenants.findOne({
        _id: user.group
      });

      if (tenant) {
        var userId = user._id;
        Partitioner.bindGroup(tenant._id, function() {

          _.each(rows, function(row) {

            var localCF = [];
            _.each(fields, function(lf) {
              if (lf !== "") {
                var cfo = {
                  refName: lf.replace(/ExtInfo/g, ' '),
                  refVal: lf
                }
                localCF.push(cfo);
              }
            });

            if (row[nameColumn] !== '' && row[nameColumn] !== 'NULL') {
              var existing = Companies.find({
                name: row[nameColumn]
              }).fetch().count();

              if (existing === 0) {
                var formattedWebsite = row[websiteColumn];
                // if (websiteColumn) {
                //   var url = row[websiteColumn];
                //   var rx = new RegExp(/^(https?:\/\/)([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/);
                //   formattedWebsite = (rx.test(url) === false ? 'http://' + url : url);                  
                // }

                var companyId = Companies.insert({
                  name: row[nameColumn],
                  address: (addressColumn !== "" ? row[addressColumn] : ""),
                  city: (cityColumn !== "" ? row[cityColumn] : ""),
                  county: (countyColumn !== "" ? row[countyColumn] : ""),
                  postcode: (postcodeColumn !== "" ? row[postcodeColumn] : ""),
                  country: (countryColumn !== "" ? row[countryColumn] : ""),
                  website: (websiteColumn !== "" ? formattedWebsite : ""),
                  phone: (phoneColumn !== "" ? row[phoneColumn] : ""),
                  createdBy: userId,
                  sequencedIdentifier: tenant.settings.company.defaultNumber
                });

                if (companyId) {

                  var company = Companies.findOne({
                    _id: companyId
                  });
                  if (company) {
                    var customFields = company.extendedInformation;
                    var cfMaster = [];

                    for (var index in customFields) {
                      if (customFields.hasOwnProperty(index)) {
                        var attr = customFields[index];

                        if (attr.isGlobal) {
                          for (var x in cfArray) {

                            if (cfArray[x].refName === index) {
                              var settings = {
                                "dataName": cfArray[x].refName,
                                "dataValue": row[cfArray[x].refVal],
                                "dataType": attr.dataType,
                                isGlobal: true
                              };
                              cfMaster[index] = settings;
                            }
                          }
                        }
                      }
                    }


                    if (createExtInfo === true) {
                      for (var local in localCF) {
                        if (row[localCF[local].refVal] !== "") {
                          var newLocalField = {
                            "dataName": localCF[local].refName,
                            "dataValue": row[localCF[local].refVal],
                            "dataType": 'text',
                            isGlobal: false
                          };
                          cfMaster.push(newLocalField);
                        }
                      }
                    }

                    Companies.update({
                      _id: companyId
                    }, {
                      $set: {
                        extendedInformation: cfMaster
                      }
                    });
                  }
                } else {
                  errors.push['Company could not be inserted into database: ' + row[nameColumn]];
                }


              } else {
                errors.push['A company with the name "' + row[nameColumn] + '" already exists.'];
              }
            } else {
              errors.push['A company name cannot be blank'];
            }
          });
        });
      } else {
        errors.push['User tenant not found'];
      }
    } else {
      errors.push['User not found'];
    }

    return errors;
  }

});