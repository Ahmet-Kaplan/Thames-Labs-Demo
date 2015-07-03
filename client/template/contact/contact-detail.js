Template.contactDetail.onRendered(function() {
  // Affix sidebar
  var sidebar = $('.sidebar');
  sidebar.affix({offset: {top: sidebar.offset().top}});
});

Template.contactDetail.rendered = function(){
  document.title = "Contact - " + this.data.title + " " + this.data.forename + " " + this.data.surname;
  SetRouteDetails(document.title);

  $("#id-delete").click(function(){
    $( "#contact-details" ).bind("DOMSubtreeModified",function(){
      $(".modal-backdrop").remove();
      $("body").removeClass('modal-open');
      Router.go('/contacts');
    });
  });
};

Template.contactDetail.events({
  'click #add-activity': function() {
    Modal.show('insertContactActivityModal', {
      company: this.company(),
      contact: this
    });
  }
});
