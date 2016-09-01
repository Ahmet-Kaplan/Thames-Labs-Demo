import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';

import '/imports/ui/components/bulk-management/bulk-management.js';
import '/imports/ui/components/contacts/contact-list-item.js';
import '/imports/ui/components/contacts/modals/insert-contact-modal.js';
import '/imports/ui/components/export/export.js';
import '/imports/ui/components/import/import.js';
import '/imports/ui/components/fab/fab-add.js';
import '/imports/ui/components/search/filters';
import '/imports/ui/components/search/search-results.js';
import '/imports/ui/components/search/local/small-box/small-search-box.js';

import './contact-list.html';

Template.contactList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    permissionHelpers.redirectWithoutPermission(Meteor.userId(), 'CanReadContacts');
  });
});

Template.contactList.events({
  'click #add-contact': function(event) {
    event.preventDefault();
    Modal.show('insertContactModal', this);
  }
});
