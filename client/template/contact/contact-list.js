Template.contactList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadContacts');
  });
});

Template.contactList.events({
  'click #add-contact': function(event) {
    event.preventDefault();
    Modal.show('insertContactModal', this);
  },
  'click #export': function(event) {
    event.preventDefault();
    exportFromSearchToCSV('contacts');
  }
});
