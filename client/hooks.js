AutoForm.hooks({
  addTenantUserModal: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('User created.');
    }
  },
  addTenantModal: {

    onSuccess: function() {
      Modal.hide();
      toastr.success('Tenant created.');
    }
  },
  insertCompanyForm: {
    before: {
      insert: function(doc) {
        doc.createdBy = Meteor.userId();
        return doc;
      }
    },
    onSuccess: function() {
      Modal.hide();
      toastr.success('Company created.');
    },
    after: {
      insert: function(error, result) {
        if (error) {
          toastr.success('An error occurred: Company not created.');
          return false;
        }

        Router.go('/companies/' + result);
        $(".modal-backdrop").remove();
        $("body").removeClass('modal-open');
      }
    }
  },
  removeCompanyForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Company removed.');
      Router.go('/companies');
    }
  },
  feedbackForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Feedback submitted.');
    }
  }
});
