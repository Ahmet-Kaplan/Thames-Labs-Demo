import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { CustomFields } from '/imports/api/collections.js';

import './custom-field-panel.html';
import './custom-field-list-item.js';
import './update-custom-field-item.js';
import './update-custom-field.js';
import './customfield.css';

Template.customFieldDisplay.onRendered(function() {
  const collType = this.data.entity_type,
        entityId = this.data.entity_data._id;

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
      global: true,
      entityId: this.entity_data._id
    }, {
      sort: { order: 1 }
    });
  },
  customFields: function() {
    return CustomFields.find({
      global: false,
      entityId: this.entity_data._id
    }, {
      sort: { order: 1 }
    });
  },
  noLabels: function() {
    return CustomFields.find({
      type: {
        $ne: 'label'
      }
    }).fetch().length > 0;
  }
});
