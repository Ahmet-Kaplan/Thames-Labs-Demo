AutoForm.hooks({
  insertActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Activity created.');
      //logEvent('info', 'Activity created.');
    }
  },
  insertProjectActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project activity created.');
      //logEvent('info', 'Project activity created.', 'Project', this.docId);
    }
  },
  insertContactActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Contact activity created.');
      //logEvent('info', 'Contact activity created.');
    }
  },
  insertPurchaseOrderActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Purchase order activity added.');
      //logEvent('info', 'Purchase order activity added.');
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
      //logEvent('info', 'Activity updated.');
    }
  }
});