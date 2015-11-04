AutoForm.hooks({
  insertNewCompanyForm: {
    before: {
      insert: function(doc) {
        if (doc.website !== undefined && doc.website.length < 8) {
          doc.website = '';
        }
        return doc;
      }
    },
    onSuccess: function() {
      Modal.hide();
      toastr.success('Company created.');
      //logEvent('info', 'Company created.', 'Company', this.docId);
    },
    after: {
      insert: function(error, result) {
        if (error) {
          $("#address_details").show();
          toastr.error('An error occurred: Company not created.');
          //logEvent('error', 'Company not created: ' + error, 'Company', this.docId);
          return false;
        }

        FlowRouter.go('/companies/' + result);
      }
    }
  },
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
    }
  },
  removeCompanyForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Company removed.');
      //logEvent('warning', 'Company deleted.', 'Company', this.docId);
      FlowRouter.go('/companies');
    }
  }
});