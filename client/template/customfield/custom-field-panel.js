Template.customFieldDisplay.events({
  'click #add-custom-field': function(event) {
    event.preventDefault();
    Modal.show('addCustomField', this);
  },
  'click #edit-custom-fields': function(event) {
    event.preventDefault();
    Modal.show('updateCustomField', this);
  },
});

Template.customFieldDisplay.helpers({
  customFields: function() {
    var ret = [];

    for (var cf in this.entity_data.customFields) {

      switch (this.entity_data.customFields[cf].dataType) {
        case 'text':
          var cfObj = {
            name: cf,
            value: this.entity_data.customFields[cf].dataValue,
            type: this.entity_data.customFields[cf].dataType,
            displayValue: this.entity_data.customFields[cf].dataValue,
            isGlobal: this.entity_data.customFields[cf].isGlobal
          };
          ret.push(cfObj);
          break;
        case 'checkbox':
          var cfObj = {
            name: cf,
            value: this.entity_data.customFields[cf].dataValue,
            type: this.entity_data.customFields[cf].dataType,
            displayValue: (this.entity_data.customFields[cf].dataValue ? this.entity_data.customFields[cf].dataValue : "false"),
            isGlobal: this.entity_data.customFields[cf].isGlobal
          };
          ret.push(cfObj);
          break;
        case 'date':
          var cfObj = {
            name: cf,
            value: this.entity_data.customFields[cf].dataValue,
            type: this.entity_data.customFields[cf].dataType,
            displayValue: new moment(this.entity_data.customFields[cf].dataValue).format('MMMM Do YYYY'),
            isGlobal: this.entity_data.customFields[cf].isGlobal
          };
          ret.push(cfObj);
          break;
      }
    }

    return ret.sort(function(a, b) {
      if (a.isGlobal === false && b.isGlobal === true) return -1;
      if (a.isGlobal === true && b.isGlobal === false) return 1;
      return 0;
    });
  }
});
