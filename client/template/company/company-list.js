Template.companyList.onRendered(function() {
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
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
        delimiter: "", // auto-detect
        newline: "", // auto-detect
        header: true,
        skipEmptyLines: true
      };
      var unprocessed = Papa.parse(data, options);

      _.each(unprocessed.data, function(de) {

        console.log(de);

        var existing = Companies.find({
          name: de.name
        }).count();

        if (existing === 0) {


          de.createdBy = Meteor.userId();
          Companies.insert(de);

        } else {

          new Confirmation({
            message: "A company with the name " + de.name + " already exists. Overwrite the existing data with the data stored in the CSV file?",
            title: "Company Conflict Detected",
            cancelText: "No",
            okText: "Yes",
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
                });

            }

          });

        }
      })
    }

    reader.readAsText(file);

  }
})
