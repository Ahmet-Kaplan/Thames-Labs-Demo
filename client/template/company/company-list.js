Template.companyList.onRendered(function() {
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
    }
  });

  // Watch for session variable setting search
  Session.set('companyListSearchQuery', null);
  Tracker.autorun(function() {
    var searchQuery = Session.get('companyListSearchQuery');
    var easySearchInstance = EasySearch.getComponentInstance({index: 'companies'});
    if (searchQuery) {
      easySearchInstance.search(searchQuery);
      $('.sidebar input').val(searchQuery);
    }
  });
});


Template.companyList.helpers({
  hasCompanies: function() {
    return Companies.find({}).count() > 0;
  },
  companyCount: function() {
    return Companies.find({}).count();
  },
  hasMultipleCompanies: function() {
    return Companies.find({}).count() !== 1;
  }
});

Template.companyList.events({

  'click #createCompany': function() {
    Modal.show('insertNewCompanyModal', this);
  },
  'click #template-help': function() {
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
  'click #template-download-link': function() {
    var tempFile = [];
    var entry = {
      name: "Sample",
      address: "Sample",
      address2: "Sample",
      city: "Sample",
      county: "Sample",
      postcode: "Sample",
      country: "Sample",
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
  'click #data-upload-link': function() {
    document.getElementById('data-upload').click();
  },
  'change #data-upload': function() {
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

      _.each(unprocessed.data, function(de) {
        totalToImport += 1;
        var existing = Companies.find({
          name: de.name
        }).count();

        if (existing === 0) {

          de.createdBy = Meteor.userId();
          Companies.insert(de, function(e, i) {
            if (e) totalErrors += 1;
          });
          totalImported += 1;

        } else {

          new Confirmation({
            message: "A company with the name ''" + de.name + "'' already exists. Overwrite the existing data with the data stored in the CSV file?",
            title: "Company Already Exists",
            cancelText: "Cancel",
            okText: "Overwrite",
            success: true
          }, function(ok) {

            if (ok) {

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
                  if (e) totalErrors += 1;
                });
              totalUpdated += 1;
            }

          });

        }
      });

      // toastr.info("Import completed.\r\nNew: " + totalImported + "\r\nUpdated: " + totalUpdated + "\r\nErrors: " + totalErrors);
    }

    reader.readAsText(file);

  }
})
