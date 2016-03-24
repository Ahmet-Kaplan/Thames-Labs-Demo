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
    },
    onError: function(formType, error) {
      toastr.error('Opportunity creation error: ' + error);
    }
  },
  editOpportunityForm: {
    onSuccess: function() {
      toastr.success('Opportunity details updated.');
      Modal.hide();
    },
    onError: function(formType, error) {
      toastr.error('Opportunity update error: ' + error);
    }
  },
  insertOpportunityItemForm: {
    onSuccess: function() {
      toastr.success('Opportunity line item added.');
      Modal.hide();
    },
    onError: function(formType, error) {
      toastr.error('Opportunity line item creation error: ' + error);
    }
  },
  editOpportunityItemForm: {
    onSuccess: function() {
      toastr.success('Opportunity line item edited.');
      Modal.hide();
    },
    onError: function(formType, error) {
      toastr.error('Opportunity line item update error: ' + error);
    }
  }
});
