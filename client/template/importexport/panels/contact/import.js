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

      Modal.show('importContactMapper', requiredData);
    }

    reader.readAsText(file);
    $('#contact-data-upload').val('');
  }
});

Template.importContactMapper.helpers({
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

      Meteor.call('import.AddNewContact', row, forenameColumn, surnameColumn, emailColumn, phoneColumn, mobileColumn, jobTitleColumn, companyColumn, addressColumn, cityColumn, countyColumn, postcodeColumn, countryColumn, cfArray, function(err, res) {
        if (err) throw new Meteor.Error(err);
        if (res !== "OK") throw new Meteor.Error(res);
      });
    });

    Modal.hide();
  }
});
