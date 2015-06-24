Template.companyDetail.onRendered(function() {
  // Affix sidebar
  var sidebar = $('.sidebar');
  sidebar.affix({offset: {top: sidebar.offset().top}});
  // Load docxgen
  $.getScript('/vendor/docxgen.min.js');

});

Template.companyDetail.rendered = function(){
  document.title = "Company - " + this.data.name;
};

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
      var docDataUri = doc.getZip().generate({type:'blob'});
      saveAs(docDataUri, file.name);
    }.bind(this);
    reader.readAsBinaryString(file);
  },
  'click #template-upload-link': function() {
    document.getElementById('template-upload').click();
  },
  'click #template-help': function() {
    Modal.show('wordHelpModal');
  },
  'click #add-contact': function() {
    Modal.show('insertContactModal', this);
  },
  'click #add-activity': function() {
    Modal.show('insertActivityModal', {company: this});
  },
  'click #add-project': function() {
    Modal.show('newProjectForm', {companyId: this._id});
  }
});

Template.companyDetail.helpers({
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