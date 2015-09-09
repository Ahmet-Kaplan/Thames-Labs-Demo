Template.contactList.onCreated(function() {
  // Redirect if read permission changed - we also check the initial load in the router
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadContacts');
  });
});

Template.contactList.onRendered(function() {
  // Watch for session variable setting search
  Session.set('contactListSearchQuery', null);
  Tracker.autorun(function() {
    var searchQuery = Session.get('contactListSearchQuery');
    var easySearchInstance = EasySearch.getComponentInstance({
      index: 'contacts'
    });
    if (searchQuery) {
      easySearchInstance.search(searchQuery);
      $('.sidebar input').val(searchQuery);
    }
  });
});

Template.contactListItem.helpers({
  companyName: function() {
    var contact = this;
    var comp = Companies.findOne({
      _id: contact.companyId
    });
    if (comp) {
      return comp.name;
    } else {
      return null;
    }
  }
});

Template.contactList.events({
  'click #add-contact': function(event) {
    event.preventDefault();
    Modal.show('insertContactModal', this);
  }
});

Template.contactList.helpers({
  hasContacts: function() {
    return Contacts.find({}).count() > 0;
  },
  contactCount: function() {
    return Contacts.find({}).count();
  },
  hasMultipleContacts: function() {
    return Contacts.find({}).count() !== 1;
  }
});