Template.companyDetail.onCreated(function() {
  // Redirect if data doesn't exist
  this.autorun(function() {
    var company = Companies.findOne(FlowRouter.getParam('id'));
    if (FlowRouter.subsReady() && company === undefined) {
      FlowRouter.go('companies');
    }
  });
});

Template.companyDetail.onRendered(function() {
  // Affix sidebar
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
    }
  });

  // Load docxgen
  $.getScript('/vendor/docxgen.min.js');

  // Load google maps
  GoogleMaps.load({
    libraries: 'places'
  });
});

Template.companyDetail.events({
  'change #template-upload': function(event) {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();
    reader.onload = function() {
      var doc = new Docxgen(reader.result);
      doc.setData({
        "name": this.name,
        "address": this.address,
        "city": this.city,
        "county": this.county,
        "postcode": this.postcode,
        "country": this.country,
        "website": this.website,
        "phone": this.phone
      });
      doc.render();
      var docDataUri = doc.getZip().generate({
        type: 'blob'
      });
      saveAs(docDataUri, file.name);
    }.bind(this);
    reader.readAsBinaryString(file);
  },
  'click #template-upload-link': function() {
    document.getElementById('template-upload').click();
  },
  'click #template-help': function(event) {
    event.preventDefault();
    Modal.show('wordHelpModal');
  },
  'click #add-contact': function(event) {
    event.preventDefault();
    Modal.show('insertContactModal', this);
  },
  'click #add-activity': function(event) {
    event.preventDefault();
    Modal.show('insertActivityModal', {
      company: this
    });
  },
  'click #add-project': function(event) {
    event.preventDefault();
    Modal.show('newCompanyProjectForm', {
      companyId: this._id
    });
  },
  'click #add-purchase-order': function(event) {
    event.preventDefault();
    Modal.show('newCompanyPurchaseOrderForm', {
      customerCompanyId: this._id
    });
  },
  'click #remove-company': function(event) {
    event.preventDefault();
    var companyId = this._id;

    bootbox.confirm("Are you sure you wish to delete this company?", function(result) {
      if (result === true) {
        Companies.remove(companyId);
      }
    });
  },
  'click #edit-company': function(event) {
    event.preventDefault();
    Modal.show('editCompanyModal', this);
  }
});

Template.companyDetail.helpers({
  companyData: function() {
    var companyId = FlowRouter.getParam('id');
    var company = Companies.findOne({_id: companyId});
    if (company.tags !== undefined) {
      company.tags.sort();
    }
    return company;
  },
  addressString: function() {
    return encodeURIComponent([
      this.address,
      this.city,
      this.country,
      this.postcode
    ].join(', '));
  },
  phoneHref: function(number) {
    return 'tel:' + number;
  },
  onCompanyRemove: function() {
    $(".modal-backdrop").remove();
    $("body").removeClass('modal-open');
  }
});
