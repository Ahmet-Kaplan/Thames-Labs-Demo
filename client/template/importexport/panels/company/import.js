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

Template.importCompanyMapper.helpers({
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

    var nameColumn = ($('#nameColumn').val() === "" ? "" : $('#nameColumn').val());
    var addressColumn = ($('#addressColumn').val() === "" ? "" : $('#addressColumn').val());
    var cityColumn = ($('#cityColumn').val() === "" ? "" : $('#cityColumn').val());
    var countyColumn = ($('#countyColumn').val() === "" ? "" : $('#countyColumn').val());
    var postcodeColumn = ($('#postcodeColumn').val() === "" ? "" : $('#postcodeColumn').val());
    var countryColumn = ($('#countryColumn').val() === "" ? "" : $('#countryColumn').val());
    var websiteColumn = ($('#websiteColumn').val() === "" ? "" : $('#websiteColumn').val());
    var phoneColumn = ($('#phoneColumn').val() === "" ? "" : $('#phoneColumn').val());


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
      });

      Meteor.call('import.AddNewCompany', row, nameColumn, addressColumn, cityColumn, countyColumn, postcodeColumn, countryColumn, websiteColumn, phoneColumn, cfArray, function(err, res) {
        if (err) throw new Meteor.Error(err);
        if (res !== "OK") throw new Meteor.Error(res);
      });
    });

    Modal.hide();
  }
});
