Template.contactList.onRendered(function() {
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
    }
  });
});


Template.contactListItem.helpers({
  companyName: function() {
    var contact = this;
    var comp = g_Companies.findOne({
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
  'click #add-contact': function() {
    Modal.show('insertCompanyContactModal', this);
  },
});

Template.contactList.helpers({
  hasContacts: function() {
    return g_Contacts.find({}).count() > 0;
  },
  contactCount: function() {
    return g_Contacts.find({}).count();
  },
  hasMultipleContacts: function() {
    return g_Contacts.find({}).count() !== 1;
  }
});