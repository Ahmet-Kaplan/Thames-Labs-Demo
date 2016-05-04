Template.updateCustomField.onRendered(function() {
  $.getScript('/vendor/medium/medium-editor.min.js');
  var self = this;

  Meteor.call('customFields.getGlobalsByTenantEntity', Meteor.user().group, self.data.entity_type, function(e, r) {
    _.each(r, function(cf, i) {
      var exists = CustomFields.findOne({
        name: cf.name
      });
      if (!exists) {
        CustomFields.insert({
          name: cf.name,
          value: cf.value,
          defaultValue: (cf.type === 'picklist' ? '' : cf.value),
          type: cf.type,
          global: true,
          order: i,
          target: self.data.entity_type,
          listValues: (cf.type !== 'picklist' ? '' : cf.value),
          entityId: self.data.entity_data._id
        });
      }
    })
  })
});

Template.updateCustomField.helpers({
  extInfos: function() {
    var data = [];

    var arr = CustomFields.find({
      entityId: this.entity_data._id,
      global: true,
      type: {
        $ne: 'label'
      }
    }).fetch();

    arr = arr.sort(function(a, b) {
      if (a.order < b.order) {
        return -1;
      }
      if (a.order > b.order) {
        return 1;
      }
      return 0;
    });

    _.each(arr, function(a) {
      data.push(a);
    });

    arr = CustomFields.find({
      entityId: this.entity_data._id,
      global: false
    }).fetch();

    arr = arr.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });

    _.each(arr, function(b) {
      data.push(b);
    });

    return data;
  }
});

Template.updateCustomField.events({
  'click #submit-ext-info': function() {

    var arr = CustomFields.find({
      entityId: this.entity_data._id
    }).fetch();

    _.each(arr, function(field) {
      var name = field.name.replace(/ /g, '');
      var safeName = '#extInfos' + name;

      var newValue = '';
      switch (field.type) {
        case 'text':
          newValue = $(safeName + "TextValue").val();
          break;
        case 'advtext':
          newValue = $(safeName + "AdvTextValue").html();
          break;
        case 'checkbox':
          newValue = $(safeName + "BooleanValue").prop('checked');
          break;
        case 'date':
          newValue = $(safeName + "DateValue").val();
          break;
        case 'picklist':
          newValue = $(safeName + 'PicklistValue').val().trim();
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
        var selectorName = safeName + "TypeOptions";
        var newType = $(selectorName).val();

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