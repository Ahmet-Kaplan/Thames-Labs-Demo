Meteor.methods({
  'import.contacts': function(rows, fields, forenameColumn, surnameColumn, emailColumn, phoneColumn, mobileColumn, jobTitleColumn, companyColumn, addressColumn, cityColumn, countyColumn, postcodeColumn, countryColumn, cfArray, createMissingCompanies, createExtInfo) {
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

            if (row[forenameColumn] !== '' && row[surnameColumn] !== '' && row[forenameColumn] !== 'NULL' && row[surnameColumn] !== 'NULL') {
              var existing = Contacts.find({
                forename: row[forenameColumn],
                surname: row[surnameColumn]
              }).count();

              if (existing === 0) {
                var company;

                if (row[companyColumn] !== '' && row[companyColumn] !== 'NULL') {
                  company = Companies.findOne({
                    name: row[companyColumn]
                  });

                  if (!company && createMissingCompanies === true) {
                    var companyId = Companies.insert({
                      name: row[companyColumn],
                      createdBy: userId,
                      sequencedIdentifier: tenant.settings.company.defaultNumber
                    });
                    company = Companies.findOne({
                      _id: companyId
                    });
                  }
                }

                var verifiedEmail = row[emailColumn];

                if (emailColumn) {
                  var email = row[emailColumn];
                  var rx = new RegExp(/(^$)|([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/);
                  verifiedEmail = (rx.test(email) === false ? '' : email);
                }


                var contactId = Contacts.insert({
                  forename: row[forenameColumn],
                  surname: row[surnameColumn],
                  email: verifiedEmail,
                  phone: (phoneColumn !== "" ? row[phoneColumn] : ""),
                  mobile: (mobileColumn !== "" ? row[mobileColumn] : ""),
                  jobtitle: (jobTitleColumn !== "" ? row[jobTitleColumn] : ""),
                  companyId: (company ? company._id : undefined),
                  address: (addressColumn !== "" ? row[addressColumn] : ""),
                  city: (cityColumn !== "" ? row[cityColumn] : ""),
                  county: (countyColumn !== "" ? row[countyColumn] : ""),
                  postcode: (postcodeColumn !== "" ? row[postcodeColumn] : ""),
                  country: (countryColumn !== "" ? row[countryColumn] : ""),
                  createdBy: userId,
                  sequencedIdentifier: tenant.settings.contact.defaultNumber
                });

                if (contactId) {
                  if (row['RealTimeTags']) {
                    _.each(row['RealTimeTags'].split(','), function(tag) {
                      Contacts.addTag(tag, {
                        _id: contactId
                      });
                    })
                  }

                  Meteor.call('customFields.getGlobalsByTenantEntity', tenant._id, 'contact', function(err, res) {
                    if (err) throw new Meteor.Error(err);
                    _.each(res, function(ex) {
                      var parseCol = _.find(cfArray, function(o) {
                        return o.refName === ex.name;
                      }).refVal;

                      var value = (parseCol ? row[parseCol] : null);

                      var existingField = CustomFields.findOne({
                        name: ex.name,
                        type: ex.type,
                        global: true,
                        order: ex.order,
                        target: 'contact',
                        entityId: contactId
                      });

                      if (existingField) {
                        CustomFields.update({
                          _id: existingField._id
                        }, {
                          $set: {
                            'value': (value ? value : (ex.defaultValue ? ex.defaultValue : ''))
                          }
                        });
                      } else {
                        CustomFields.insert({
                          name: ex.name,
                          value: (value ? value : (ex.defaultValue ? ex.defaultValue : '')),
                          defaultValue: (ex.defaultValue ? ex.defaultValue : ''),
                          type: ex.type,
                          global: true,
                          order: ex.order,
                          target: 'contact',
                          listValues: '',
                          entityId: contactId
                        });
                      }
                    });
                  });

                  if (createExtInfo === true) {

                    _.each(localCF, function(local, i) {
                      value = row[local.refVal];

                      CustomFields.insert({
                        name: local.refName,
                        value: (value ? value : ''),
                        type: 'text',
                        global: false,
                        order: i,
                        target: 'contact',
                        entityId: contactId
                      });
                    });
                  }
                } else {
                  errors.push['Contact could not be inserted into database: ' + row[forenameColumn] + ' ' + row[surnameColumn]];
                }
              } else {
                errors.push['A contact with the name "' + row[forenameColumn] + ' ' + row[surnameColumn] + '" already exists.'];
              }

            } else {
              errors.push['A contact forename/surname cannot be blank'];
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
              }).count();

              if (existing === 0) {
                var formattedWebsite = row[websiteColumn];

                if (websiteColumn) {
                  var url = row[websiteColumn];
                  var rx = new RegExp(/(^$)|((https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?)/);
                  formattedWebsite = (rx.test(url) === false ? '' : url);
                }

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
                  if (row['RealTimeTags']) {
                    _.each(row['RealTimeTags'].split(','), function(tag) {
                      Companies.addTag(tag, {
                        _id: companyId
                      });
                    })
                  }

                  Meteor.call('customFields.getGlobalsByTenantEntity', tenant._id, 'company', function(err, res) {
                    if (err) throw new Meteor.Error(err);
                    _.each(res, function(ex) {
                      var parseCol = _.find(cfArray, function(o) {
                        return o.refName === ex.name;
                      }).refVal;

                      var value = (parseCol ? row[parseCol] : null);

                      var existingField = CustomFields.findOne({
                        name: ex.name,
                        type: ex.type,
                        global: true,
                        order: ex.order,
                        target: 'company',
                        entityId: companyId
                      });

                      if (existingField) {
                        CustomFields.update({
                          _id: existingField._id
                        }, {
                          $set: {
                            'value': (value ? value : (ex.defaultValue ? ex.defaultValue : ''))
                          }
                        });
                      } else {
                        CustomFields.insert({
                          name: ex.name,
                          value: (value ? value : (ex.defaultValue ? ex.defaultValue : '')),
                          defaultValue: (ex.defaultValue ? ex.defaultValue : ''),
                          type: ex.type,
                          global: true,
                          order: ex.order,
                          target: 'company',
                          listValues: '',
                          entityId: companyId
                        });
                      }
                    });
                  });

                  if (createExtInfo === true) {
                    _.each(localCF, function(local, i) {
                      value = row[local.refVal];
                      CustomFields.insert({
                        name: local.refName,
                        value: (value ? value : ''),
                        type: 'text',
                        global: false,
                        order: i,
                        target: 'company',
                        entityId: companyId
                      });
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