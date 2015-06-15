Template.contactDetail.onRendered(function() {
  // Affix sidebar
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
    }
  });
});

Template.contactDetail.events({
  'click #add-activity': function() {
    Modal.show('insertContactActivityModal', {
      company: this.company(),
      contact: this
    });
  }
});
