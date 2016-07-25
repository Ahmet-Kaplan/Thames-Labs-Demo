import './update-custom-field.html';
import './customfield.css';

Template.updateCustomField.onRendered(function() {

  $.getScript('/vendor/medium/medium-editor.min.js');

  const entity = this.data.entity_data,
        collType = this.data.entity_type,
        entityId = entity._id;

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

Template.updateCustomField.helpers({
  globalFields: function() {
    return CustomFields.find({
      entityId: this.entity_data._id
    }, {
      sort: { order: 1 }
    });
  }
});

Template.updateCustomField.events({
  'click #submit-ext-info': function() {

    const arr = CustomFields.find({
      entityId: this.entity_data._id
    }).fetch();

    _.each(arr, function(field) {
      const name = field.name.replace(/ /g, ''),
            safeName = `#customField${name}`;

      let newValue = '';
      switch (field.type) {
        case 'text':
          newValue = $(`${safeName}TextValue`).val();
          break;
        case 'advtext':
          newValue = $(`${safeName}AdvTextValue`).html();
          break;
        case 'checkbox':
          newValue = $(`${safeName}BooleanValue`).prop('checked');
          break;
        case 'date':
          newValue = $(`${safeName}DateValue`).val();
          break;
        case 'picklist':
          newValue = $(`${safeName}PicklistValue`).val().trim();
          if (newValue === "") newValue = null;
          break;
      }

      if (field.global) {
        CustomFields.update({
          _id: field._id
        }, {
          $set: {
            value: newValue
          }
        });
      } else {
        const selectorName = `${safeName}TypeOptions`,
              newType = $(selectorName).val();

        CustomFields.update({
          _id: field._id
        }, {
          $set: {
            value: newValue,
            type: newType
          }
        });
      }
    });

    Modal.hide();
  }
});
