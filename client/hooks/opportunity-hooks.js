AutoForm.hooks({
  insertOpportunityForm: {
    onSuccess: function() {
      toastr.success('Opportunity added.');
      Modal.hide();
    },
    after: {
      insert: function(error, result) {
        if (error) {
          toastr.error('Opportunity creation error: ' + error);
          return false;
        }

        FlowRouter.go('/opportunities/' + result);
      }
    }
  },
  editOpportunityForm: {
    onSuccess: function() {
      toastr.success('Opportunity details updated.');
      Modal.hide();
    }
  },
  insertOpportunityItemForm: {
    onSuccess: function() {
      toastr.success('Opportunity line item added.');
      Modal.hide();
    }
  },
  editOpportunityItemForm: {
    onSuccess: function() {
      toastr.success('Opportunity line item edited.');
      Modal.hide();
    }
  }
});
