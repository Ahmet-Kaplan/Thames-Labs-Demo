Template.contactDetail.onCreated(function() {
  // Redirect if data doesn't exist
  this.autorun(function(){
    var contact = Contacts.findOne(FlowRouter.getParam('id'));
    if (contact) return;
    FlowRouter.go('contacts');
  });
});

Template.contactDetail.onRendered(function() {
  // Affix sidebar
  var sidebar = $('.sidebar');
  sidebar.affix({offset: {top: sidebar.offset().top}});
});

Template.contactDetail.helpers({
  'contactData': function() {
    var contactId = FlowRouter.getParam('id');
    return Contacts.findOne({_id: contactId});
  }
});

Template.contactDetail.events({
  'click #add-activity': function() {
    Modal.show('insertContactActivityModal', {
      company: this.company(),
      contact: this
    });
  }
});
