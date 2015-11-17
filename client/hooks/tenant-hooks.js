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
    }
  },
  updateTenantSettingsModal: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Tenant settings updated.');
    }
  }
})
