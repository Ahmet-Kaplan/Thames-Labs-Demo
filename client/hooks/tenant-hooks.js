AutoForm.hooks({
  addTenantModal: {
    before: {
      insert: function(doc) {
        doc.settings = tenancyDefaultSettings;
        return doc;
      }
    },
    onSuccess: function() {
      Modal.hide();
      toastr.success('Tenant created.');
      //logEvent('verbose', 'A new tenant has been created.', 'Tenant', this.docId);
    }
  },
  updateTenantSettingsModal: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Settings saved.');
      //logEvent('info', 'Tenant settings updated.', 'Tenant', this.docId);
    }
  }
})