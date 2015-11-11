AutoForm.hooks({
  insertActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Activity created.');
    }
  },
  insertProjectActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project activity created.');
    }
  },
  insertContactActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Contact activity created.');
    }
  },
  insertPurchaseOrderActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Purchase order activity created.');
    }
  },
  insertOpportunityActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Opportunity activity created.');
    }
  },
  insertTaskActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Task activity created.');
    }
  },
  updateActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Activity updated.');
    }
  }
});
