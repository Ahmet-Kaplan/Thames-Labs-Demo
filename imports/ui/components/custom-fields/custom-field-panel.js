import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './custom-field-panel.html';
import './custom-field-list-item.js';
import './update-custom-field-item.js';
import './update-custom-field.js';
import './customfield.css';

Template.customFieldDisplay.onRendered(function() {
  const collType = this.data.entity_type;
  const entityId = this.data.entity_data._id;

  this.autorun(function() {
    switch (collType) {
      case 'company':
        Meteor.subscribe('customFieldsByEntityId', entityId, collType, 'companies');
        break;
      case 'contact':
        Meteor.subscribe('customFieldsByEntityId', entityId, collType, 'contacts');
        break;
      case 'project':
        Meteor.subscribe('customFieldsByEntityId', entityId, collType, 'projects');
        break;
      case 'product':
        Meteor.subscribe('customFieldsByEntityId', entityId, collType, 'products');
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

    Modal.show('insertGlobalCustomField', this);
  },
  'click #edit-custom-fields': function(event) {
    event.preventDefault();
    Modal.show('updateCustomField', this);
  }
});

Template.customFieldDisplay.helpers({
  hasCustomFields: function() {
    return CustomFields.find({
      entityId: this.entity_data._id
    }).fetch().length > 0;
  },
  globalFields: function() {
    return CustomFields.find({
      entityId: this.entity_data._id,
      global: true
    }, {
      sort: { order: 1 }
    });
  },
  customFields: function() {
    return CustomFields.find({
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
