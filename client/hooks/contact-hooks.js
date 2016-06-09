AutoForm.hooks({
  insertContactForm: {
    onSuccess: function() {
      toastr.success('Contact created.');
      Modal.hide();
    },
    after: {
      insert: function(error, result) {
        if (error) {
          toastr.error('Contact creation error: ' + error);
          return false;
        }

        FlowRouter.go('/contacts/' + result);
      }
    },
    onError: function(formType, error) {
      toastr.error('Contact creation error: ' + error);
    }
  },
  insertCompanyContactForm: {
    onSuccess: function() {
      toastr.success('Contact created.');
      Modal.hide();
    },
    after: {
      insert: function(error, result) {
        if (error) {
          toastr.error('Contact creation error: ' + error);
          return false;
        }
      }
    },
    onError: function(formType, error) {
      toastr.error('Contact creation error: ' + error);
    }
  },
  editContactForm: {
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
      toastr.success('Contact details updated.');
    },
    onError: function(formType, error) {
      toastr.error('Contact update error: ' + error);
    }
  }
});