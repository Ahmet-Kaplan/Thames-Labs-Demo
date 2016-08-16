import './custom-field-list-item.html';
import './customfield.css';
import bootbox from 'bootbox';

Template.cfDisplay.helpers({
  parentHelper: function(parentContext) {
    this.parentEntity = parentContext;
  },
  trimmedName: function() {
    return this.name.replace(/\s/g, '');
  },
  isAdvancedText: function() {
    return this.type === "advtext";
  },
  icon: function() {
    const customField = {};

    switch (this.type) {
      case 'text':
        customField.icon = 'text-width';
        break;
      case 'advtext':
        customField.icon = 'align-left';
        break;
      case 'checkbox':
        customField.icon = 'check-square-o';
        break;
      case 'date':
        customField.icon = 'calendar';
        break;
      case 'label':
        customField.icon = 'tag';
        break;
      case 'picklist':
        customField.icon = 'list-ol';
        break;
    }
    return customField.icon;
  }
});

Template.cfDisplay.events({
  'click #delete-custom-field': function(event) {
    event.preventDefault();
    const self = this;
    bootbox.confirm("Are you sure you wish to delete this custom field?", function(result) {
      if (result === true) {
        Meteor.call('customFields.deleteLocal', self._id, function(err, res) {
          if (err) throw new Meteor.Error(err);
          toastr.success('Custom field removed.');
        });
      } else {
        return;
      }
    });
  }
});
