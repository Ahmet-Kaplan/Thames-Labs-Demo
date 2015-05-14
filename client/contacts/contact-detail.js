Template.contactDetail.events({
  'click #add-activity': function() {
    Modal.show('insertActivityModal', {company: this.company()});
  }
});
