import { redirectWithoutPermission } from '/imports/api/global-helpers/permissions-helpers.js';

import '/imports/ui/components/tags/tag-management/tag-management.js';
import '/imports/ui/components/fab/fab-add.js';

Template.contactList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadContacts');
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
  },
  'click #export': function(event) {
    event.preventDefault();
    exportFromSearchToCSV('contacts');
  }
});
