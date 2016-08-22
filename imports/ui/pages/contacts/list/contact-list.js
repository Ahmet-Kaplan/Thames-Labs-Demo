import './contact-list.html';
import '/imports/ui/components/contacts/contact-list-item.js';
import '/imports/ui/components/contacts/modals/insert-contact-modal.js';
import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';
import '/imports/ui/components/tags/tag-management/tag-management.js';
import '/imports/ui/components/export/export.js';
import '/imports/ui/components/fab/fab-add.js';
import '/imports/ui/components/search/filters';
import '/imports/ui/components/search/search-results.js';
import '/imports/ui/components/search/local/small-box/small-search-box.js';

Template.contactList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    permissionHelpers.redirectWithoutPermission(Meteor.userId(), 'CanReadContacts');
  });

  this.totalContacts = new ReactiveVar(0);
});

Template.contactList.onRendered(function() {
  this.autorun(() => {
    this.totalContacts.set(Collections['contacts'].index.getComponentDict().get('count'));
  });
});

Template.contactList.helpers({
  contactCount: function() {
    return Template.instance().totalContacts.get();
  },
  hasMultipleContacts: function() {
    return Template.instance().totalContacts.get() !== 1;
  }
});

Template.contactList.events({
  'click #add-contact': function(event) {
    event.preventDefault();
    Modal.show('insertContactModal', this);
  }
});
