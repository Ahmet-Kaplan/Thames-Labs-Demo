import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './custom-field-panel.html';
import './add-custom-field.js';
import './custom-field-list-item.js';
import './update-custom-field-item.js';
import './update-custom-field.js';
import './customfield.css';

Template.customFieldDisplay.onRendered(function() {
  var collType = this.data.entity_type;
  var entityId = this.data.entity_data._id;

  this.autorun(function() {
    switch (collType) {
      case 'company':
        Meteor.subscribe('customFieldsByEntityId', entityId, 'companies');
        break;
      case 'contact':
        Meteor.subscribe('customFieldsByEntityId', entityId, 'contacts');
        break;
      case 'project':
        Meteor.subscribe('customFieldsByEntityId', entityId, 'projects');
        break;
      case 'product':
        Meteor.subscribe('customFieldsByEntityId', entityId, 'products');
        break;
    }
  });
});

Template.customFieldDisplay.events({
  'click #add-custom-field': function(event) {
    event.preventDefault();

    if (!isProTenant(Meteor.user().group)) {
      if (CustomFields.find({
        entityId: this.entity_data._id
      }).fetch().length === MAX_FREE_ENTITY_LOCAL_FIELDS) {
        showUpgradeToastr('To create more than 5 custom fields against this record');
        return;
      }
    }

    Modal.show('addCustomField', this);
  },
  'click #edit-custom-fields': function(event) {
    event.preventDefault();
    Modal.show('updateCustomField', this);
  },
});

Template.customFieldDisplay.helpers({
  hasCustomFields: function() {
    return CustomFields.find({
      entityId: this.entity_data._id
    }).fetch().length > 0;
  },
  globalFields: function() {
    var arr = CustomFields.find({
      entityId: this.entity_data._id,
      global: true
    }).fetch();

    return arr.sort(function(a, b) {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });
  },
  customFields: function() {
    var arr = CustomFields.find({
      entityId: this.entity_data._id,
      global: false
    }).fetch();

    return arr.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
  },
  noLabels: function() {
    return CustomFields.find({
      entityId: this.entity_data._id,
      type: {
        $ne: 'label'
      }
    }).fetch().length > 0;
  }
});
