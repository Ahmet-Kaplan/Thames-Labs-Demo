AutoForm.hooks({
  insertOpportunityForm: {
    onSuccess: function() {
      toastr.success('Opportunity added.');
      Modal.hide();
    },
    after: {
      insert: function(error, result) {
        if (error) {
          toastr.error('An error occurred: Opportunity not created.');
          //logEvent('error', 'Company not created: ' + error, 'Company', this.docId);
          return false;
        }

        FlowRouter.go('/opportunities/' + result);
      }
    }
  },
  editOpportunityForm: {
    onSuccess: function() {
      toastr.success('Opportunity edited.');
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