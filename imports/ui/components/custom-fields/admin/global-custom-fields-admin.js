import './modals/insert-global-custom-field.js';
import './global-custom-field-items/global-custom-field-item.js';
import './global-custom-field-list/global-custom-field-list.js';
import './global-custom-fields-admin.html';

Template.globalCustomFieldsAdmin.onCreated(function() {
  Meteor.subscribe('globalCustomFields');
});

Template.globalCustomFieldsAdmin.helpers({

  hasCompanyFields: function() {
    return CustomFields.find({
      target: 'company'
    }).fetch().length > 0;
  },
  hasContactFields: function() {
    return CustomFields.find({
      target: 'contact'
    }).fetch().length > 0;
  },
  hasProjectFields: function() {
    return CustomFields.find({
      target: 'project'
    }).fetch().length > 0;
  },
  hasProductFields: function() {
    return CustomFields.find({
      target: 'product'
    }).fetch().length > 0;
  }

  // globalCompanyCustomFields: function() {
  //   return CustomFields.find({
  //     target: 'company'
  //   }).fetch().sort(function(a, b) {
  //     if (a.order < b.order) return -1;
  //     if (a.order > b.order) return 1;
  //     return 0;
  //   });
  // },
  // globalContactCustomFields: function() {
  //   return CustomFields.find({
  //     target: 'contact'
  //   }).fetch().sort(function(a, b) {
  //     if (a.order < b.order) return -1;
  //     if (a.order > b.order) return 1;
  //     return 0;
  //   });
  // },
  // globalProjectCustomFields: function() {
  //   return CustomFields.find({
  //     target: 'project'
  //   }).fetch().sort(function(a, b) {
  //     if (a.order < b.order) return -1;
  //     if (a.order > b.order) return 1;
  //     return 0;
  //   });
  // },
  // globalProductCustomFields: function() {
  //   return CustomFields.find({
  //     target: 'product'
  //   }).fetch().sort(function(a, b) {
  //     if (a.order < b.order) return -1;
  //     if (a.order > b.order) return 1;
  //     return 0;
  //   });
  // }

});

Template.globalCustomFieldsAdmin.events({
  'click #addGlobalCustomField': function(event) {
    event.preventDefault();
    Modal.show('insertGlobalCustomField');
  }
});
