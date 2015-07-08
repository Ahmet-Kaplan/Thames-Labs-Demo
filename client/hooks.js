Accounts.onLogin(function(cb) {

  if (!Roles.userIsInRole(Meteor.user(), ['superadmin'])) {
    Meteor.logoutOtherClients();
  }

  var user = Meteor.users.find({
    _id: Meteor.userId()
  }).fetch()[0];

  var snapshot = new Date();

  if (user) {

    var profile = user.profile;
    if (profile) {
      profile.lastLogin = snapshot;

      Meteor.users.update(user._id, {
        $set: {
          profile: profile
        }
      });
    }
  }
});

AutoForm.hooks({
  insertNewCompanyForm:{
    onSuccess: function() {
      Modal.hide();
      $('[data-toggle="tooltip"]').tooltip();
      toastr.success('Company created.');
    },
    after: {
      insert: function(error, result) {
        if (error) {
          toastr.error('An error occurred: Company not created.');
          return false;
        }

        Router.go('/companies/' + result);
      }
    }
  },
  insertActivityForm: {
    onSuccess: function() {
      Modal.hide();
      $('[data-toggle="tooltip"]').tooltip();
    }
  },
  insertProjectActivityForm: {
    onSuccess: function() {
      Modal.hide();
      $('[data-toggle="tooltip"]').tooltip();
    }
  },
  insertPurchaseOrderActivityForm: {
    onSuccess: function() {
      Modal.hide();
      $('[data-toggle="tooltip"]').tooltip();
    }
  },
  insertContactActivityForm: {
    onSuccess: function() {
      Modal.hide();
      $('[data-toggle="tooltip"]').tooltip();
    }
  },
  addTenantUserModal: {
    before: {
      insert: function(doc) {
        doc.createdBy = Meteor.userId();
        return doc;
      }
    },
    onSuccess: function() {
      Modal.hide();
      toastr.success('User created.');
    }
  },
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
          toastr.error('An error occurred: Company not created.');
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
  },
  updateTenantSettingsModal: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Settings saved.');
    }
  },
  newTaskModal: {
    before: {
      insert: function(doc) {
        doc.createdBy = Meteor.userId();
        return doc;
      }
    },
    onError: function(formType, error) {
      if (error) {
        console.log(error);
      }
    },
    onSuccess: function() {
      Modal.hide('');
      toastr.success('Task created.');
    }
  },
  editTaskModal: {
    onError: function(formType, error) {
      if (error) {
        console.log(error);
      }
    },
    onSuccess: function() {
      Modal.hide('');
      toastr.success('Task updated.');
    }
  }
});
