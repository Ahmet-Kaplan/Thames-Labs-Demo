Meteor.methods({

  'import.AddNewCompany': function(row, nameColumn, addressColumn, cityColumn, countyColumn, postcodeColumn, countryColumn, websiteColumn, phoneColumn, cfArray) {

    var user = Meteor.users.findOne({
      _id: this.userId
    });

    var userId = user._id;

    if (user) {
      return Partitioner.bindUserGroup(userId, function() {
        if (row[nameColumn] !== '' && row[nameColumn] !== 'NULL') {
          var existing = Companies.find({
            name: row[nameColumn]
          }).fetch().count();

          if (existing === 0) {
            var formattedWebsite = "";
            if (websiteColumn) {
              formattedWebsite = (row[websiteColumn].indexOf('http') > -1, row[websiteColumn], 'http://' + row[websiteColumn]);
            }

            Companies.insert({
                name: row[nameColumn],
                address: (addressColumn !== "" ? row[addressColumn] : ""),
                city: (cityColumn !== "" ? row[cityColumn] : ""),
                county: (countyColumn !== "" ? row[countyColumn] : ""),
                postcode: (postcodeColumn !== "" ? row[postcodeColumn] : ""),
                country: (countryColumn !== "" ? row[countryColumn] : ""),
                website: (websiteColumn !== "" ? formattedWebsite : ""),
                phone: (phoneColumn !== "" ? row[phoneColumn] : ""),
                createdBy: userId
              },
              function(err, inserted) {
                if (err) {
                  return err;
                }

                if (inserted) {
                  var company = Companies.findOne({
                    _id: inserted
                  });
                  var customFields = company.customFields;
                  var cfMaster = {};

                  for (var index in customFields) {
                    if (customFields.hasOwnProperty(index)) {

                      var attr = customFields[index];

                      if (attr.isGlobal) {
                        for (var x in cfArray) {

                          if (cfArray[x].refName === index) {
                            var settings = {
                              "dataValue": row[cfArray[x].refVal],
                              "dataType": attr.dataType,
                              isGlobal: true
                            }
                            cfMaster[index] = settings;
                          }
                        }
                      }
                    }
                  }

                  Companies.update(inserted, {
                    $set: {
                      customFields: cfMaster
                    }
                  });
                }

              });

            return "OK";
          } else {
            return ('A company with the name "' + row[nameColumn] + '" already exists.');
          }
        } else {
          return 'Company name cannot be blank.';
        }
      });
    } else {
      return 'User not found.'
    }
  },

  'import.AddNewContact': function(row, forenameColumn, surnameColumn, emailColumn, phoneColumn, mobileColumn, jobTitleColumn, companyColumn, addressColumn, cityColumn, countyColumn, postcodeColumn, countryColumn, cfArray) {

    var user = Meteor.users.findOne({
      _id: this.userId
    });

    var userId = user._id;

    if (user) {
      return Partitioner.bindUserGroup(userId, function() {
        if (row[forenameColumn] !== '' && row[surnameColumn] !== '' && row[forenameColumn] !== 'NULL' && row[surnameColumn] !== 'NULL') {
          var existing = Contacts.find({
            forename: row[forenameColumn],
            surname: row[surnameColumn]
          }).fetch().count();

          if (existing === 0) {

            var company = undefined;
            if (row[companyColumn] !== '' && row[companyColumn] !== 'NULL') {
              company = Companies.findOne({
                name: row[companyColumn]
              });
            }

            Contacts.insert({
                forename: row[forenameColumn],
                surname: row[surnameColumn],
                email: row[emailColumn],
                phone: (phoneColumn !== "" ? row[phoneColumn] : ""),
                mobile: (mobileColumn !== "" ? row[mobileColumn] : ""),
                jobtitle: (jobTitleColumn !== "" ? row[jobTitleColumn] : ""),
                companyId: (company !== undefined ? company._id : undefined),
                address: (addressColumn !== "" ? row[addressColumn] : ""),
                city: (cityColumn !== "" ? row[cityColumn] : ""),
                county: (countyColumn !== "" ? row[countyColumn] : ""),
                postcode: (postcodeColumn !== "" ? row[postcodeColumn] : ""),
                country: (countryColumn !== "" ? row[countryColumn] : ""),
                createdBy: userId
              },
              function(err, inserted) {
                if (err) {
                  return err;
                }

                if (inserted) {
                  var contact = Contacts.findOne({
                    _id: inserted
                  });
                  var customFields = contact.customFields;
                  var cfMaster = {};

                  for (var index in customFields) {
                    if (customFields.hasOwnProperty(index)) {

                      var attr = customFields[index];

                      if (attr.isGlobal) {
                        for (var x in cfArray) {

                          if (cfArray[x].refName === index) {
                            var settings = {
                              "dataValue": row[cfArray[x].refVal],
                              "dataType": attr.dataType,
                              isGlobal: true
                            }
                            cfMaster[index] = settings;
                          }
                        }
                      }
                    }
                  }

                  Contacts.update(inserted, {
                    $set: {
                      customFields: cfMaster
                    }
                  });
                }

              });

            return "OK";
          } else {
            return ('A contact with the name "' + row[forenameColumn] + ' ' + row[surnameColumn] + '" already exists.');
          }
        } else {
          return 'Contact forename/surname cannot be blank.';
        }
      });
    } else {
      return 'User not found.'
    }
  }

})
