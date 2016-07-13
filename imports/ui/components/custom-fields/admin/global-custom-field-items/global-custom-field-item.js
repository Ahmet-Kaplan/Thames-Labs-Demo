import './global-custom-field-item.css';
import './global-custom-field-item.html';

Template.globalCustomFieldItem.helpers({
  canMoveUp: function() {
    return this.order > 0;
  },
  canMoveDown: function() {
    return this.order < CustomFields.find({
      target: this.target
    }).fetch().length - 1;
  },

  niceEntity: function() {
    var retVal = "";

    switch (this.target) {
      case 'company':
        retVal = 'Companies';
        break;
      case 'contact':
        retVal = 'Contacts';
        break;
      case 'project':
        retVal = 'Projects';
        break;
      case 'product':
        retVal = 'Products';
        break;
    }

    return retVal;
  },
  niceType: function() {
    var retVal = "";

    switch (this.type) {
      case 'text':
        retVal = 'Text';
        break;
      case 'advtext':
        retVal = 'Multi-line Text';
        break;
      case 'checkbox':
        retVal = 'Checkbox';
        break;
      case 'date':
        retVal = 'Date/Time';
        break;
      case 'label':
        retVal = 'Label';
        break;
      case 'picklist':
        retVal = 'Picklist';
        break;
    }

    return retVal;
  }
});
Template.globalCustomFieldItem.events({
  'click .order-up': function() {
    var self = this;
    Meteor.call('changeExtInfoOrder', self, "up", function(err, res) {
      if (err) throw new Meteor.Error(err);
      if (res.exitCode !== 0) {
        toastr.error(res.exitStatus);
      }
    });
  },
  'click .order-down': function() {
    var self = this;
    Meteor.call('changeExtInfoOrder', self, "down", function(err, res) {
      if (err) throw new Meteor.Error(err);
      if (res.exitCode !== 0) {
        toastr.error(res.exitStatus);
      }
    });
  },
  'click .delete-global-custom-field': function() {
    var self = this;

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