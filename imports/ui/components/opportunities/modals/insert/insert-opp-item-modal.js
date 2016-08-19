import './insert-opp-item-modal.html';

Template.insertOpportunityItemModal.helpers({
  generatedId: function() {
    return Random.id();
  }
});

Template.insertOpportunityItemModal.events({
  'change input[name=value], blur input[name=value], change input[name=quantity], blur input[name=quantity]': function(event) {
    const totalValue = parseFloat($('input[name=value]').val()) * parseFloat($('input[name=quantity]').val()).toFixed(2);
    if(!isNaN(totalValue)) {
      $('#oppLineTotal').val(totalValue);
    }
  }
});

AutoForm.hooks({
  insertOpportunityItemForm: {
    onSuccess: function() {
      toastr.success('Opportunity line item added.');
      Modal.hide();
    },
    onError: function(formType, error) {
      toastr.error('Opportunity line item creation error: ' + error);
    }
  }
});
