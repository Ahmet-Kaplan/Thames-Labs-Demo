import './modals/insert-global-custom-field.js';
import './global-custom-field-items/global-custom-field-item.js';
import './global-custom-field-list/global-custom-field-list.js';
import './global-custom-fields-admin.html';
import { CustomFields } from '/imports/api/collections.js';

Template.globalCustomFieldsAdmin.onCreated(function() {
  Meteor.subscribe('globalCustomFields');
});

Template.globalCustomFieldsAdmin.helpers({
  hasCustomFields: function() {
    return CustomFields.find({}).fetch().length > 0;
  },
  hasCompanyFields: function() {
    return CustomFields.find({
      global: true,
      target: 'company'
    }).fetch().length > 0;
  },
  hasContactFields: function() {
    return CustomFields.find({
      global: true,
      target: 'contact'
    }).fetch().length > 0;
  },
  hasJobFields: function() {
    return CustomFields.find({
      global: true,
      target: 'job'
    }).fetch().length > 0;
  },
  hasProductFields: function() {
    return CustomFields.find({
      global: true,
      target: 'product'
    }).fetch().length > 0;
  }
});

Template.globalCustomFieldsAdmin.events({
  'click #addGlobalCustomField': function(event) {
    event.preventDefault();
    Modal.show('insertGlobalCustomField');
  }
});
