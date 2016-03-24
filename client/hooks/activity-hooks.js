AutoForm.hooks({
  insertActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Activity created.');
    },
    onError: function(formType, error) {
      toastr.error('Activity creation error: ' + error);
    }
  },
  insertProjectActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project activity created.');
    },
    onError: function(formType, error) {
      toastr.error('Activity creation error: ' + error);
    }
  },
  insertContactActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Contact activity created.');
    },
    onError: function(formType, error) {
      toastr.error('Activity creation error: ' + error);
    }
  },
  insertPurchaseOrderActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Purchase order activity created.');
    },
    onError: function(formType, error) {
      toastr.error('Activity creation error: ' + error);
    }
  },
  insertOpportunityActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Opportunity activity created.');
    },
    onError: function(formType, error) {
      toastr.error('Activity creation error: ' + error);
    }
  },
  insertTaskActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Task activity created.');
    },
    onError: function(formType, error) {
      toastr.error('Activity creation error: ' + error);
    }
  },
  updateActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Activity updated.');
    },
    onError: function(formType, error) {
      toastr.error('Activity creation error: ' + error);
    }
  }
});
