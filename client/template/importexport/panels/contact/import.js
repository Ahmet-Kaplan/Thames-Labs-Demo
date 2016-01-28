Template.contactDataManagement.helpers({
  ContactImportInProgress: function() {
    return Session.get('ContactImportInProgress');
  },
});

Template.contactDataManagement.events({
  'click #contact-template-help': function(event) {
    event.preventDefault();
    Modal.show('importContactHelpModal');
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
    };
    reader.onload = function() {
      var data = reader.result;
      var options = {
        delimiter: "",
        newline: "",
        header: true,
        skipEmptyLines: true
      };
      var unprocessed = Papa.parse(data, options);

      var requiredData = {
        dataSet: unprocessed
      };

      Modal.show('importContactMapper', requiredData);
    };

    reader.readAsText(file);
    $('#contact-data-upload').val('');
  }
});
Template.importContactMapper.onRendered(function() {
  $('#cbIgnoreExtInfo').prop('checked', true);
  Session.set('ContactImportInProgress', false);
});

Template.importContactMapper.helpers({
  ContactImportInProgress: function() {
    return ServerSession.get('ContactImportInProgress');
  },
  importStatus: function() {
    return Template.instance().importInProgress.get();
  },
  totalToImport: function() {
    return this.dataSet.data.length;
  },
  importedSoFar: function() {
    return Template.instance().totalImported.get();
  },
  requiredDataInputs: function() {
    var lnkData = this.dataSet;
    var html = "";
    _.each(lnkData.meta.fields, function(f) {
      html += '<option>' + f + '</option>';
    });
    return html;
  },
  ExtInfoFields: function() {
    var lnkData = this.dataSet;
    var html = "";
    _.each(lnkData.meta.fields, function(f) {
      html += '<option>' + f + '</option>';
    });

    var user = Meteor.users.findOne({
      _id: Meteor.userId()
    });
    var tenant = Tenants.findOne({
      _id: user.group
    });
    return _.map(tenant.settings.extInfo.contact, function(cx) {
      return {
        "name": cx["name"].replace(/ /g, '-'),
        "options": html
      }
    });
  }
});

Template.importContactMapper.events({
  'click #confirm-mapping': function(event, template) {
    var fields = this.dataSet.meta.fields;

    var forenameColumn = ($('#forenameColumn').val() === "" ? "" : $('#forenameColumn').val());
    var surnameColumn = ($('#surnameColumn').val() === "" ? "" : $('#surnameColumn').val());
    var emailColumn = ($('#emailColumn').val() === "" ? "" : $('#emailColumn').val());
    var phoneColumn = ($('#phoneColumn').val() === "" ? "" : $('#phoneColumn').val());
    var mobileColumn = ($('#mobileColumn').val() === "" ? "" : $('#mobileColumn').val());
    var jobTitleColumn = ($('#jobTitleColumn').val() === "" ? "" : $('#jobTitleColumn').val());
    var companyColumn = ($('#companyColumn').val() === "" ? "" : $('#companyColumn').val());
    var addressColumn = ($('#addressColumn').val() === "" ? "" : $('#addressColumn').val());
    var cityColumn = ($('#cityColumn').val() === "" ? "" : $('#cityColumn').val());
    var countyColumn = ($('#countyColumn').val() === "" ? "" : $('#countyColumn').val());
    var postcodeColumn = ($('#postcodeColumn').val() === "" ? "" : $('#postcodeColumn').val());
    var countryColumn = ($('#countryColumn').val() === "" ? "" : $('#countryColumn').val());

    if (forenameColumn === "" || surnameColumn === "" || emailColumn === "") {
      toastr.warning('Please complete all required fields.');
      return;
    }

    var createMissingCompanies = $('#cbAutoCreateCompanies').prop('checked');
    var createExtInfo = $('#cbIgnoreExtInfo').prop('checked');

    var removalIndex = -1;
    if (forenameColumn !== "") {
      removalIndex = fields.indexOf(forenameColumn);
      if (removalIndex > -1) {
        fields.splice(removalIndex, 1);
      }
    }
    if (surnameColumn !== "") {
      removalIndex = fields.indexOf(surnameColumn);
      if (removalIndex > -1) {
        fields.splice(removalIndex, 1);
      }
    }
    if (emailColumn !== "") {
      removalIndex = fields.indexOf(emailColumn);
      if (removalIndex > -1) {
        fields.splice(removalIndex, 1);
      }
    }

    if (phoneColumn !== "") {
      removalIndex = fields.indexOf(phoneColumn);
      if (removalIndex > -1) {
        fields.splice(removalIndex, 1);
      }
    }
    if (mobileColumn !== "") {
      removalIndex = fields.indexOf(mobileColumn);
      if (removalIndex > -1) {
        fields.splice(removalIndex, 1);
      }
    }
    if (jobTitleColumn !== "") {
      removalIndex = fields.indexOf(jobTitleColumn);
      if (removalIndex > -1) {
        fields.splice(removalIndex, 1);
      }
    }

    if (companyColumn !== "") {
      removalIndex = fields.indexOf(companyColumn);
      if (removalIndex > -1) {
        fields.splice(removalIndex, 1);
      }
    }
    if (addressColumn !== "") {
      removalIndex = fields.indexOf(addressColumn);
      if (removalIndex > -1) {
        fields.splice(removalIndex, 1);
      }
    }
    if (cityColumn !== "") {
      removalIndex = fields.indexOf(cityColumn);
      if (removalIndex > -1) {
        fields.splice(removalIndex, 1);
      }
    }

    if (countyColumn !== "") {
      removalIndex = fields.indexOf(countyColumn);
      if (removalIndex > -1) {
        fields.splice(removalIndex, 1);
      }
    }
    if (postcodeColumn !== "") {
      removalIndex = fields.indexOf(postcodeColumn);
      if (removalIndex > -1) {
        fields.splice(removalIndex, 1);
      }
    }
    if (countryColumn !== "") {
      removalIndex = fields.indexOf(countryColumn);
      if (removalIndex > -1) {
        fields.splice(removalIndex, 1);
      }
    }

     var rows = this.dataSet.data;
    var elems = $('#extInfoSpecifiers').find('.extInfoOption');
    var cfArray = [];
    _.each(elems, function(ex) {
      var refId = ex.getAttribute("id");
      var cfValue = $('#' + refId).val();
      var cfName = refId.replace(/-/g, ' ').replace(/EXCOL_/g, '');
      var cfo = {
        refName: cfName,
        refVal: cfValue
      };
      cfArray.push(cfo);

      var fieldIndex = fields.indexOf(cfValue);
      fields.splice(fieldIndex, 1);
    });

      Meteor.call('import.contacts', rows, fields, forenameColumn, surnameColumn, emailColumn, phoneColumn, mobileColumn, jobTitleColumn, companyColumn, addressColumn, cityColumn, countyColumn, postcodeColumn, countryColumn, cfArray, createMissingCompanies, createExtInfo, function(err, res) {
       if (err) throw new Meteor.Error(err);

      if (res.length === 0) {
        Session.set("ContactImportInProgress", false);

        toastr.success('Import completed successfully.');
        Modal.hide();
      } else {
        var errorString = "Error\n";

        _.each(res, function(e) {
          errorString += e + "\n";
        })

        var blob = new Blob([errorString], {
          type: "text/csv;charset=utf-8"
        });
        saveAs(blob, 'realtimecrm_contact_import_errors.csv');

        Session.set("ContactImportInProgress", false);

        toastr.warning('Import completed with errors; saving to CSV now...');
        Modal.hide();
      }

    }));

  }
});
