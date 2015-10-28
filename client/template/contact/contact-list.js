Template.contactList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadContacts');
  });
});

Template.contactList.onRendered(function() {
  // Watch for session variable setting search
  Session.set('contactListSearchQuery', null);
  Tracker.autorun(function() {
    var searchQuery = Session.get('contactListSearchQuery');
    if (searchQuery) {
      ContactsIndex.getComponentMethods().search(searchQuery);
      $('.stick-bar input').val(searchQuery);
    }
  });
});

Template.contactList.events({
  'click #add-contact': function(event) {
    event.preventDefault();
    Modal.show('insertContactModal', this);
  }
});
