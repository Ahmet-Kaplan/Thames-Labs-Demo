import './global-custom-field-item.html';

const setData = (type) => {

  const customField = {};

  switch (type) {
    case 'text':
      customField.type = 'Text';
      customField.icon = 'text-width';
      break;
    case 'advtext':
      customField.type = 'Multi-line Text';
      customField.icon = 'align-left';
      break;
    case 'checkbox':
      customField.type = 'Checkbox';
      customField.icon = 'check-square-o';
      break;
    case 'date':
      customField.type = 'Date/Time';
      customField.icon = 'calendar';
      break;
    case 'label':
      customField.type = 'Label';
      customField.icon = 'tag';
      break;
    case 'picklist':
      customField.type = 'Picklist';
      customField.icon = 'list-ol';
      break;
  }

  return customField;
};

Template.globalCustomFieldItem.helpers({
  niceEntity: function() {
    return this.target.toUpperCase;
  },
  niceType: function() {
    const cf = setData(this.type);
    return cf.type;
  },
  icon: function() {
    const cf = setData(this.type);
    return cf.icon;
  }
});
Template.globalCustomFieldItem.events({
  'click .delete-global-custom-field': function() {
    const self = this;

    bootbox.confirm("Are you sure you wish to delete this custom field?", function(result) {
      if (result === true) {
        Meteor.call('extInfo.deleteGlobal', self, function(err, res) {
          if (err) throw new Meteor.Error(err);
          if (res === true) {
            toastr.success('Global field deleted successfully.');
            bootbox.hideAll();
          }
        });
      }
    });
  }
});
