Template.contactList.onRendered(function() {
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
    }
  });
});


Template.contactListItem.helpers({
  companyName: function() {
    var contact = this;
    var comp = Companies.findOne({
      _id: contact.companyId
    });

    if (comp) {
      return comp.name;
    } else {
      return null;
    }
  }
});



Template.contactList.events({
  'click #add-contact': function() {
    Modal.show('insertCompanyContactModal', this);
  },
  'click #template-download-link': function() {
    var tempFile = [];
    var entry = {
      title: "Sample",
      forename: "Sample",
      surname: "Sample",
      email: "Sample",
      phone: "Sample",
      mobile: "Sample",
      jobtitle: "Sample",
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

        if(de.company === ""){
          toastr.error('Could not import contact ' + de.title + ' ' + de.forename + ' ' + de.surname + ': no company provided (orphaned contacts not yet supported)');
          return;
        }

        var companyExists = Companies.find({
          name: de.company
        }).count();

        var companyId = "";

        if(companyExists === 0){
          toastr.error('Contact ' + de.title + ' ' + de.forename + ' ' + de.surname + ' not added: given company could not be found? Have you checked your spelling?');
          return;
        }else{
          var company = Companies.find({
            name: de.company
          }).fetch()[0];

          companyId = company._id;
        }

        var existing = Contacts.find({
          title: de.title,
          forename: de.forename,
          surname: de.surname,
          companyId: companyId
        }).count();

        if (existing === 0) {

          de.createdBy = Meteor.userId();
          de.companyId = companyId;
          delete de.company;

          Contacts.insert(de);

        } else {

          new Confirmation({
            message: "A contact with the name '" + de.title + ' ' + de.forename + ' ' + de.surname + "'' already exists. Overwrite the existing data with the data stored in the CSV file?",
            title: "Contact Conflict Detected",
            cancelText: "No",
            okText: "Yes",
            success: true
          }, function(ok) {

            if (ok) {

              var record = Contacts.find({
                title: de.title,
                forename: de.forename,
                surname: de.surname
              }).fetch()[0];

              Contacts.update(
                record._id, {
                  $set: {
                    title: de.title,
                    forename: de.forename,
                    surname: de.surname,
                    email: de.email,
                    phone: de.phone,
                    mobile: de.mobile,
                    jobtitle: de.jobtitle
                  }
                });

            }

          });

        }
      })
    }

    reader.readAsText(file);

  }
});

Template.contactList.helpers({
  hasContacts: function() {
    return Contacts.find({}).count() > 0;
  },
  contactCount: function() {
    return Contacts.find({}).count();
  },
  hasMultipleContacts: function() {
    return Contacts.find({}).count() !== 1;
  }
});
