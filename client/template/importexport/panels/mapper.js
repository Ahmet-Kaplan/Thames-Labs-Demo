Template.importMapper.onCreated(function() {

});

Template.importMapper.onRendered(function() {

});

Template.importMapper.onDestroyed(function() {

});

Template.importMapper.helpers({
  mapType: function() {
    return this.type;
  },
  requiredDataInputs: function() {
    var html = "<form>";
    _.each(this.reqdFields, function(field) {
      var elementName = field;
      var displayName = field.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      html += '<div class="form-group"><label for="mapper' + elementName + '">' + displayName + '</label><input type="text" class="form-control" id="mapper' + elementName + '"';
    });
    html += "</form>";
    return html;
  }
});

Template.importMapper.events({
  'click #confirm-mapping': function() {

    switch (this.type) {
      case 'Company':

        var rowname = ($('#mappername').val() === "" ? "" : $('#mappername').val());
        var rowaddress = ($('#mapperaddress').val() === "" ? "" : $('#mapperaddress').val());
        var rowcity = ($('#mappercity').val() === "" ? "" : $('#mappercity').val());
        var rowcounty = ($('#mappercounty').val() === "" ? "" : $('#mappercounty').val());
        var rowpostcode = ($('#mapperpostcode').val() === "" ? "" : $('#mapperpostcode').val());
        var rowcountry = ($('#mappercountry').val() === "" ? "" : $('#mappercountry').val());
        var rowwebsite = ($('#mapperwebsite').val() === "" ? "" : $('#mapperwebsite').val());
        var rowphone = ($('#mapperphone').val() === "" ? "" : $('#mapperphone').val());

        // var companyArray = [];
        _.each(this.dataSet.data, function(row) {

          var formattedWebsite = "";
          if (rowwebsite) {
            formattedWebsite = (row[rowwebsite].indexOf('http') > -1, row[rowwebsite], 'http://' + row[rowwebsite]);
          }

          // var companyObject = {
          //   name: rowname,
          //   address: rowaddress,
          //   city: rowcity,
          //   county: rowcounty,
          //   postcode: rowpostcode,
          //   country: rowcountry,
          //   website: (rowwebsite.indexOf('http') > -1, rowwebsite, 'http://' + rowwebsite),
          //   phone: rowphone
          // };
          // companyArray.push(companyObject);

          console.log(rowname, row[rowname]);

          if (row[rowname] !== '') {
            Companies.insert({
              name: row[rowname],
              address: (rowaddress !== "" ? row[rowaddress] : ""),
              city: (rowcity !== "" ? row[rowcity] : ""),
              county: (rowcounty !== "" ? row[rowcounty] : ""),
              postcode: (rowpostcode !== "" ? row[rowpostcode] : ""),
              country: (rowname !== "" ? row[rowcountry] : ""),
              website: formattedWebsite,
              phone: (rowphone !== "" ? row[rowphone] : ""),
              createdBy: Meteor.userId()
            });
          }
        });

        Modal.hide();

        // var errorList = null;
        // var state = false;
        //
        // Meteor.call('data.importCompaniesFromArray', companyArray, function(error, result) {
        //   if (error) throw new Meteor.Error(error);
        //   Modal.hide();
        //   if (result.length !== 0) {
        //     errorList = result;
        //     state = true;
        //   }
        // });
        //
        // if (state) {
        //   Modal.show('dataWarnings', errorList);
        // }
        break;
    }
  }
});
