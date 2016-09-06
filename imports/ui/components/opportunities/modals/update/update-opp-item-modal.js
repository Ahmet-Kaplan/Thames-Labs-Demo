import { Opportunities } from '/imports/api/collections.js';
import './update-opp-item-modal.html';

Template.updateOpportunityItemModal.helpers({
  opportunity: function() {
    return Opportunities.findOne(this.oppId);
  },
  fieldName: function() {
    return "items." + this.index + ".name";
  },
  fieldDesc: function() {
    return "items." + this.index + ".description";
  },
  fieldVal: function() {
    return "items." + this.index + ".value";
  },
  fieldQuantity: function() {
    return "items." + this.index + ".quantity";
  },
  fieldLineTotal: function() {
    const value = this.data.value * this.data.quantity;
    if(!isNaN(value)) return value;
  }
});

Template.updateOpportunityItemModal.events({
  'change #fieldVal, blur #fieldVal, change #fieldQuantity, blur #fieldQuantity': function(event) {
    const totalValue = (parseFloat($('#fieldVal').val()) * parseFloat($('#fieldQuantity').val())).toFixed(2);
    if(!isNaN(totalValue)) {
      $('#oppLineTotal').val(totalValue);
    }
  }
});

AutoForm.hooks({
  updateOpportunityItemForm: {
    onSuccess: function() {
      toastr.success('Opportunity line item edited.');
      Modal.hide();
    },
    onError: function(formType, error) {
      toastr.error('Opportunity line item update error: ' + error);
    }
  }
});
