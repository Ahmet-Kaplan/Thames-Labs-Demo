Template.contactList.onRendered(function() {
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
    }
  });

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
    Modal.show('insertCompanyContactModal', this);
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
