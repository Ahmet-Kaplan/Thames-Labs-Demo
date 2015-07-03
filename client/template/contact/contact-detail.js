Template.contactDetail.onRendered(function() {
  // Affix sidebar
  var sidebar = $('.sidebar');
  sidebar.affix({offset: {top: sidebar.offset().top}});
});

Template.contactDetail.rendered = function(){
  document.title = "Contact - " + this.data.title + " " + this.data.forename + " " + this.data.surname;
  SetRouteDetails(document.title);

  //Unbind redirection handler if delete modal is closed
  $(".modal.fade").click(function(e){
    if(e.target == this){ // only if the dark bit has been clicked
      $('#contact-details').unbind('DOMSubtreeModified');
    }
  });
};

Template.contactDetail.events({
  'click #add-activity': function() {
    Modal.show('insertContactActivityModal', {
      company: this.company(),
      contact: this
    });
  },
  'click #id-delete': function() {
    $("#contact-details").bind("DOMSubtreeModified",function(){
      $(".modal-backdrop").remove();
      $("body").removeClass('modal-open');
      Router.go('/contacts');
    });
  },
  'click .modal-header > .close': function() {
    $('#contact-details').unbind('DOMSubtreeModified');
  }
});
