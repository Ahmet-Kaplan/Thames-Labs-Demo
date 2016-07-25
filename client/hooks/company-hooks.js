AutoForm.hooks({
  editCompanyForm: {
    before: {
      update: function(doc) {
        var oldValues = this.currentDoc,
            modifications = true;
        $.each(['address', 'address2', 'city', 'country', 'county', 'postcode'], function(i, field) {
          modifications = (oldValues[field] === doc.$set[field]);
          return modifications;
        });
        if (!modifications) {
          doc.$set.lat = '';
          doc.$set.lng = '';
        }
        return doc;
      }
    },
    onSuccess: function() {
      Modal.hide();
      toastr.success('Company details updated.');
    },
    onError: function(formType, error) {
      toastr.error('Company update error: ' + error);
    }
  },
  removeCompanyForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Company removed.');
      FlowRouter.go('/companies');
    },
    onError: function(formType, error) {
      toastr.error('Company delete error: ' + error);
    }
  }
});