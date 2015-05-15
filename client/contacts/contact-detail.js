Template.contactDetail.onRendered(function() {
  // Affix sidebar
  var sidebar = $('.sidebar');
  sidebar.affix({offset: {top: sidebar.offset().top}});
});

Template.contactDetail.events({
  'click #add-activity': function() {
    Modal.show('insertActivityModal', {company: this.company()});
  }
});
