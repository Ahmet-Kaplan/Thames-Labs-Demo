Template.companyDetail.onRendered(function() {
  $.getScript('/vendor/docxgen.min.js');
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
    console.log('company removed');
    // Bit of a hack to remove the BS modal backdrop
    // Should go in template onRendered?
    $(".modal-backdrop").remove();
    $("body").removeClass('modal-open');
  }
});
