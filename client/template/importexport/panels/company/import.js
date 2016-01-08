Template.companyDataManagement.events({
  'click #company-template-help': function(event) {
    event.preventDefault();
    Modal.show('importCompanyHelpModal');
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

      var requiredData = {
        dataSet: unprocessed
      };

      Modal.show('importCompanyMapper', requiredData);
    }

    reader.readAsText(file);
    $('#company-data-upload').val('');
  }
});

Template.importCompanyMapper.onCreated(function() {
  this.importInProgress = new ReactiveVar(false);
  this.totalImported = new ReactiveVar(0);
});

Template.importCompanyMapper.helpers({
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
    return _.map(tenant.settings.extInfo.company, function(cx) {
      return {
        "name": cx["name"].replace(/ /g, '-'),
        "options": html
      }
    });
  }
});

Template.importCompanyMapper.events({
  'click #confirm-mapping': function(event, template) {

    var totalToImport = this.dataSet.data.length;
    var imported = 0;
    var errorData = [];

    template.importInProgress.set(true);
    var fields = this.dataSet.meta.fields;

    var nameColumn = ($('#nameColumn').val() === "" ? "" : $('#nameColumn').val());
    var addressColumn = ($('#addressColumn').val() === "" ? "" : $('#addressColumn').val());
    var cityColumn = ($('#cityColumn').val() === "" ? "" : $('#cityColumn').val());
    var countyColumn = ($('#countyColumn').val() === "" ? "" : $('#countyColumn').val());
    var postcodeColumn = ($('#postcodeColumn').val() === "" ? "" : $('#postcodeColumn').val());
    var countryColumn = ($('#countryColumn').val() === "" ? "" : $('#countryColumn').val());
    var websiteColumn = ($('#websiteColumn').val() === "" ? "" : $('#websiteColumn').val());
    var phoneColumn = ($('#phoneColumn').val() === "" ? "" : $('#phoneColumn').val());

    var removalIndex = -1;
    if (nameColumn !== "") {
      removalIndex = fields.indexOf(nameColumn);
      if (removalIndex > -1) {
        fields.splice(removalIndex, 1);
      }
    }
    if (websiteColumn !== "") {
      removalIndex = fields.indexOf(websiteColumn);
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

    _.each(this.dataSet.data, function(row) {
      var cfArray = [];
      var elems = $('#extInfoSpecifiers').find('.extInfoOption');
      _.each(elems, function(ex) {
        var refId = ex.getAttribute("id");
        var cfValue = $('#' + refId).val();
        var cfName = refId.replace(/-/g, ' ').replace(/EXCOL_/g, '');
        var cfo = {
          refName: cfName,
          refVal: cfValue
        }
        cfArray.push(cfo);

        var fieldIndex = fields.indexOf(cfValue);
        fields.splice(fieldIndex, 1);
      });


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

      Meteor.call('import.AddNewCompany', row, nameColumn, addressColumn, cityColumn, countyColumn, postcodeColumn, countryColumn, websiteColumn, phoneColumn, cfArray, localCF, function(err, res) {
        imported += 1;
        template.totalImported.set(imported);

        if (err) errorData.push(err);
        if (res !== "OK") errorData.push(res);

        if ((imported === totalToImport) && errorData.length === 0) {
          toastr.success('Import completed successfully.');
          template.importInProgress.set(false);
          Modal.hide();
        }

        if ((imported === totalToImport) && errorData.length !== 0) {
          var errorString = "Error\n";

          _.each(errorData, function(e) {
            errorString += e + "\n";
          })

          var blob = new Blob([errorString], {
            type: "text/csv;charset=utf-8"
          });
          saveAs(blob, 'realtimecrm_company_import_errors.csv');
          toastr.warning('Import completed with errors; saving to CSV now...');
          template.importInProgress.set(false);
          Modal.hide();
        }

      });
    });
  }
});
