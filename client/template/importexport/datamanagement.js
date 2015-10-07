Template.datamanagement.onCreated(function() {
  // Redirect if read permission changed - we also check the initial load in the router
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadDataManagement');
  });
});

Template.datamanagement.events({
  'click #contact-template-help': function(event) {
    event.preventDefault();
    Modal.show('importContactHelpModal');
  },
  'click #exportContactList': function() {
    var tempFile = [];

    var contacts = Contacts.find({}).fetch();
    _.each(contacts, function(c) {
      var companyEntry = Companies.find({
        _id: c.companyId
      }).fetch()[0];
      var companyName = (companyEntry ? companyEntry.name : "");

      var entry = {
        forename: c.forename,
        surname: c.surname,
        email: c.email,
        phone: c.phone,
        mobile: c.mobile,
        jobtitle: c.jobtitle,
        company: (companyName !== "" ? companyName : "")
      }
      tempFile.push(entry);
    });

    var filename = 'realtimecrm-contact-export_' + moment().format("MMM-Do-YY") + '.csv';
    var fileData = Papa.unparse(tempFile);

    var blob = new Blob([fileData], {
      type: "text/csv;charset=utf-8"
    });
    saveAs(blob, filename);
  },
  'click #contact-template-download-link': function() {
    var tempFile = [];
    var entry = {
      forename: "Fredd",
      surname: "Bloggs",
      email: "fred.bloggs@sample.co.uk",
      phone: "01234 567 890",
      mobile: "00000000000",
      jobtitle: "Director",
      company: "Sample"
    };

    tempFile.push(entry);

    var filename = 'realtimecrm-contact-import-template.csv';
    var fileData = Papa.unparse(tempFile);

    var blob = new Blob([fileData], {
      type: "text/csv;charset=utf-8"
    });
    saveAs(blob, filename);
  },
  'click #contact-data-upload-link': function() {
    document.getElementById('contact-data-upload').click();
  },
  'change #contact-data-upload': function() {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();

    reader.onerror = function(error) {
      toastr.error('File processing error: ' + error);
    }
    reader.onload = function() {
      var data = reader.result;

      var options = {
        delimiter: "",
        newline: "",
        header: true,
        skipEmptyLines: true
      };
      var unprocessed = Papa.parse(data, options);
      var totalImported = 0,
        totalToImport = 0,
        totalUpdated = 0,
        totalErrors = 0;
      var errorList = [];

      _.each(unprocessed.data, function(de) {
        totalToImport += 1;

        if (de.company === "") {

          var existing = Contacts.find({
            forename: de.forename,
            surname: de.surname
          }).count();

          if (existing === 0) {

            de.createdBy = Meteor.userId();

            Contacts.insert(de, function(e, i) {
              if (e) {
                errorList.push(e);
                totalErrors += 1;
              }
            });

            totalImported += 1;

          } else {

            bootbox.confirm("A contact with the name '" + de.forename + ' ' + de.surname + "'' already exists. Overwrite the existing data with the data stored in the CSV file?", function(result) {
              if (result === true) {

                var record = Contacts.find({
                  forename: de.forename,
                  surname: de.surname
                }).fetch()[0];

                Contacts.update(
                  record._id, {
                    $set: {
                      forename: de.forename,
                      surname: de.surname,
                      email: de.email,
                      phone: de.phone,
                      mobile: de.mobile,
                      jobtitle: de.jobtitle
                    }
                  },
                  function(e, i) {
                    if (e) {
                      errorList.push(e);
                      totalErrors += 1;
                    }
                  });

                totalUpdated += 1;

              }

            });

          }
        } else {

          var companyExists = Companies.find({
            name: de.company
          }).count();

          var companyId = "";

          if (companyExists === 0) {
            errorList.push('Contact ' + de.forename + ' ' + de.surname + ' not added: given company could not be found? Have you checked your spelling?');
            totalErrors += 1;
            return;
          } else {
            var company = Companies.find({
              name: de.company
            }).fetch()[0];

            companyId = company._id;
          }

          var existing = Contacts.find({
            forename: de.forename,
            surname: de.surname,
            companyId: companyId
          }).count();

          if (existing === 0) {

            de.createdBy = Meteor.userId();
            de.companyId = companyId;
            delete de.company;

            Contacts.insert(de, function(e, i) {
              if (e) {
                // toastr.error(e);
                errorList.push(e);
                totalErrors += 1;
              }
            });

            totalImported += 1;

          } else {

            bootbox.confirm("A contact with the name '" + de.forename + ' ' + de.surname + "'' already exists. Overwrite the existing data with the data stored in the CSV file?", function(result) {
              if (result === true) {

                var record = Contacts.find({
                  forename: de.forename,
                  surname: de.surname
                }).fetch()[0];

                Contacts.update(
                  record._id, {
                    $set: {
                      forename: de.forename,
                      surname: de.surname,
                      email: de.email,
                      phone: de.phone,
                      mobile: de.mobile,
                      jobtitle: de.jobtitle
                    }
                  },
                  function(e, i) {
                    if (e) {
                      errorList.push(e);
                      totalErrors += 1;
                    }
                  });

                totalUpdated += 1;

              }

            });

          }
        }
      });

      // toastr.info("Import completed.\r\nNew: " + totalImported + "\r\nUpdated: " + totalUpdated + "\r\nErrors: " + totalErrors);

      if (errorList.length > 0) {
        Modal.show('dataWarnings', errorList);
      } else {
        toastr.success('Import succeeded.');
      }
    }

    reader.readAsText(file);

  },
  'click #company-template-help': function(event) {
    event.preventDefault();
    Modal.show('importCompanyHelpModal');
  },
  'click #exportCompanyList': function() {
    var tempFile = [];

    var companies = Companies.find({}).fetch();
    _.each(companies, function(c) {

      var entry = {
        name: c.name,
        address: c.address,
        address2: c.address2,
        city: c.city,
        county: c.county,
        postcode: c.postcode,
        country: c.country,
        website: c.website,
        phone: c.phone
      }
      tempFile.push(entry);
    });

    var filename = 'realtimecrm-company-export_' + moment().format("MMM-Do-YY") + '.csv';
    var fileData = Papa.unparse(tempFile);

    var blob = new Blob([fileData], {
      type: "text/csv;charset=utf-8"
    });
    saveAs(blob, filename);
  },
  'click #company-template-download-link': function() {
    var tempFile = [];
    var entry = {
      name: "Sample",
      address: "123 Sample Street",
      address2: "Samplesville",
      city: "Sampleton",
      county: "Sampleford",
      postcode: "SM13 0AB",
      country: "United Kingdom",
      website: "http://www.sample.co.uk",
      phone: "01234 567 890"
    };

    tempFile.push(entry);

    var filename = 'realtimecrm-company-import-template.csv';
    var fileData = Papa.unparse(tempFile);

    var blob = new Blob([fileData], {
      type: "text/csv;charset=utf-8"
    });
    saveAs(blob, filename);
  },
  'click #company-data-upload-link': function() {
    document.getElementById('company-data-upload').click();
  },
  'change #company-data-upload': function() {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();

    reader.onerror = function(error) {
      toastr.error('File processing error: ' + error);
    }
    reader.onload = function() {
      var data = reader.result;

      var options = {
        delimiter: "",
        newline: "",
        header: true,
        skipEmptyLines: true
      };
      var unprocessed = Papa.parse(data, options);
      var totalImported = 0,
        totalToImport = 0,
        totalUpdated = 0,
        totalErrors = 0;
      var errorList = [];

      _.each(unprocessed.data, function(de) {
        totalToImport += 1;
        var existing = Companies.find({
          name: de.name
        }).count();

        if (existing === 0) {

          de.createdBy = Meteor.userId();
          Companies.insert(de, function(e, i) {
            if (e) {
              // toastr.error(e);
              errorList.push(e);
              totalErrors += 1;
            }
          });
          totalImported += 1;

        } else {

          bootbox.confirm("A company with the name ''" + de.name + "'' already exists. Overwrite the existing data with the data stored in the CSV file?", function(result) {
            if (result === true) {
              var record = Companies.find({
                name: de.name
              }).fetch()[0];

              Companies.update(
                record._id, {
                  $set: {
                    name: de.name,
                    address: de.address,
                    address2: de.address2,
                    city: de.city,
                    county: de.county,
                    postcode: de.postcode,
                    country: de.country,
                    website: de.website,
                    phone: de.phone
                  }
                },
                function(e, i) {
                  if (e) {
                    errorList.push(e);
                    totalErrors += 1;
                  }
                });
              totalUpdated += 1;
            }

          });

        }
      });

      // toastr.info("Import completed.\r\nNew: " + totalImported + "\r\nUpdated: " + totalUpdated + "\r\nErrors: " + totalErrors);
      if (errorList.length > 0) {
        Modal.show('dataWarnings', errorList);
      } else {
        toastr.success('Import succeeded.');
      }
    }

    reader.readAsText(file);

  },
  'click #exportOpportunityList': function() {
    var tempFile = [];

    var opps = Opportunities.find({}).fetch();
    _.each(opps, function(o) {

      var companyEntry, contactEntry;

      if (o.companyId) {
        companyEntry = Companies.find({
          _id: o.companyId
        }).fetch()[0];
      }

      if (o.contactId) {
        contactEntry = Contacts.find({
          _id: o.contactId
        }).fetch()[0];
      }

      var stageEntry = OpportunityStages.find({
        _id: o.currentStageId
      }).fetch()[0];

      var companyName = (companyEntry ? companyEntry.name : "");
      var contactName = (contactEntry ? contactEntry.forename + " " + contactEntry.surname : "");
      var stageName = (stageEntry ? stageEntry.title : "");

      var entry = {
        name: o.name,
        description: o.description,
        date: o.date,
        estCloseDate: o.estCloseDate,
        value: (o.value ? parseFloat(o.value).toFixed(2) : "0.00"),
        company: (companyName !== "" ? companyName : ""),
        contact: (contactName !== "" ? contactName : ""),
        stage: (stageName !== "" ? stageName : "")
      }
      tempFile.push(entry);
    });

    var filename = 'realtimecrm-opps-export_' + moment().format("MMM-Do-YY") + '.csv';
    var fileData = Papa.unparse(tempFile);

    var blob = new Blob([fileData], {
      type: "text/csv;charset=utf-8"
    });
    saveAs(blob, filename);
  },
  'click #exportProjectList': function() {
    var tempFile = [];

    var projects = Projects.find({}).fetch();
    _.each(projects, function(o) {

      var companyEntry, contactEntry;

      if (o.companyId) {
        companyEntry = Companies.find({
          _id: o.companyId
        }).fetch()[0];
      }

      if (o.contactId) {
        contactEntry = Contacts.find({
          _id: o.contactId
        }).fetch()[0];
      }

      var accMgrEntry = Meteor.users.find({
        _id: o.userId
      }).fetch()[0];

      var companyName = (companyEntry ? companyEntry.name : "");
      var contactName = (contactEntry ? contactEntry.forename + " " + contactEntry.surname : "");
      var mgrName = (accMgrEntry ? accMgrEntry.profile.name : "");

      var entry = {
        name: o.name,
        description: o.description,
        dueDate: o.dueDate,
        value: (o.value ? parseFloat(o.value).toFixed(2) : "0.00"),
        company: (companyName !== "" ? companyName : ""),
        contact: (contactName !== "" ? contactName : ""),
        accMgr: (mgrName !== "" ? mgrName : "")
      }
      tempFile.push(entry);
    });

    var filename = 'realtimecrm-project-export_' + moment().format("MMM-Do-YY") + '.csv';
    var fileData = Papa.unparse(tempFile);

    var blob = new Blob([fileData], {
      type: "text/csv;charset=utf-8"
    });
    saveAs(blob, filename);
  },
  'click #exportPurchaseOrderList': function() {
    var tempFile = [];

    var pos = PurchaseOrders.find({}).fetch();
    _.each(pos, function(o) {

      var companyEntry, contactEntry;

      if (o.supplierCompanyId) {
        companyEntry = Companies.find({
          _id: o.supplierCompanyId
        }).fetch()[0];
      }

      if (o.supplierContactId) {
        contactEntry = Contacts.find({
          _id: o.supplierContactId
        }).fetch()[0];
      }

      var requestorEntry = Meteor.users.find({
        _id: o.userId
      }).fetch()[0];

      var companyName = (companyEntry ? companyEntry.name : "");
      var contactName = (contactEntry ? contactEntry.forename + " " + contactEntry.surname : "");
      var requestorName = (requestorEntry ? requestorEntry.profile.name : "");

      var entry = {
        requestor: (requestorName !== "" ? requestorName : ""),
        orderNumber: o.orderNumber,
        supplierCompany: (companyName !== "" ? companyName : ""),
        supplierContact: (contactName !== "" ? contactName : ""),
        description: o.description,
        reference: o.supplierReference,
        status: o.status,
        orderDate: o.orderDate,
        payment: o.paymentMethod,
        notes: o.notes
      }
      tempFile.push(entry);
    });

    var filename = 'realtimecrm-purchase-order-export_' + moment().format("MMM-Do-YY") + '.csv';
    var fileData = Papa.unparse(tempFile);

    var blob = new Blob([fileData], {
      type: "text/csv;charset=utf-8"
    });
    saveAs(blob, filename);
  },
});
