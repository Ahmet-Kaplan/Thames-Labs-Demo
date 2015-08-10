Accounts.onLogin(function(cb) {

  if (!Roles.userIsInRole(Meteor.user(), ['superadmin'])) {
    // Meteor.logoutOtherClients();
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

      LogEvent("info", profile.name + " logged in.");
    }
  }

  FlowRouter.reload();

});

AutoForm.hooks({
  // signUpForm: {
  //   onError: function(formType, error) {
  //     if (typeof error.reason === 'string') {
  //       if (error.reason.indexOf('email') !== -1) {
  //         //Get appropriate message shown when user enters a taken email
  //         //because the server is the only place that can verify this
  //         this.addStickyValidationError('email', 'emailTaken');
  //         AutoForm.validateField(this.formId, 'email');
  //         //LogEvent("warning", "Attempted sign-up with in-use email.");
  //       }
  //     }
  //   },
  //   onSuccess: function(formType, result) {
  //     Meteor.loginWithPassword(details.email, details.password, function() {
  //       FlowRouter.redirect('/');
  //       FlowRouter.reload();
  //       //LogEvent("verbose", details.email + " successfully signed up and logged in.");
  //     });
  //   },
  //   beginSubmit: function() {
  //     details.email = $("#email-field").val();
  //     details.password = $("#password-field").val();
  //     //LogEvent("debug", "Submitting sign-up application...");
  //   },
  // },
  updatePurchaseOrderForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Purchase Order updated.');
      //LogEvent('info', 'Purchase order updated.', 'Purchase Order', this.docId);
    }
  },
  editContactForm: {
    onSuccess: function() {
      Modal.hide();
      FlowRouter.go('/contacts/' + this.docId);
      console.log('updated');
      toastr.success('Contact details updated.');
    }
  },
  updatePurchaseOrderForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Contact created.');
      //LogEvent('info', 'Contact created.', 'Contact', this.docId);
    }
  },
  newProjectForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project created.');
      //LogEvent('info', 'Project created.', 'Project', this.docId);
    }
  },
  newContactProjectForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project created.');
      //LogEvent('info', 'Contact project created.', 'Contact', this.docId);
    }
  },
  updateProjectForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project updated.');
      //LogEvent('info', 'Project updated.', 'Project', this.docId);
    }
  },
  updateActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Activity updated.');
      //LogEvent('info', 'Activity updated.');
    }
  },
  insertNewCompanyForm: {
    onSuccess: function() {
      Modal.hide();
      $('[data-toggle="tooltip"]').tooltip();
      toastr.success('Company created.');
      //LogEvent('info', 'Company created.', 'Company', this.docId);
    },
    after: {
      insert: function(error, result) {
        if (error) {
          toastr.error('An error occurred: Company not created.');
          //LogEvent('error', 'Company not created: ' + error, 'Company', this.docId);
          return false;
        }

        FlowRouter.go('/companies/' + result);
      }
    }
  },
  insertActivityForm: {
    onSuccess: function() {
      Modal.hide();
      $('[data-toggle="tooltip"]').tooltip();
      toastr.success('Activity created.');
      //LogEvent('info', 'Activity created.');
    }
  },
  insertProjectActivityForm: {
    onSuccess: function() {
      Modal.hide();
      $('[data-toggle="tooltip"]').tooltip();
      toastr.success('Project activity created.');
      //LogEvent('info', 'Project activity created.', 'Project', this.docId);
    }
  },
  // insertPurchaseOrderActivityForm: {
  //   onSuccess: function() {
  //     Modal.hide();
  //     $('[data-toggle="tooltip"]').tooltip();
  //     toastr.success('Purchase order activity created.');
  //     //LogEvent('info', 'Purchase order activity created.', 'Purchase Order', this.docId);
  //   }
  // },
  insertContactActivityForm: {
    onSuccess: function() {
      Modal.hide();
      $('[data-toggle="tooltip"]').tooltip();
      toastr.success('Contact activity created.');
      //LogEvent('info', 'Contact activity created.');
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
      //LogEvent('verbose', 'A new tenant user has been created.', 'User', this.docId);
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
      //LogEvent('verbose', 'A new tenant has been created.', 'Tenant', this.docId);
    }
  },
  removeCompanyForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Company removed.');
      //LogEvent('warning', 'Company deleted.', 'Company', this.docId);
      FlowRouter.go('/companies');
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
      //LogEvent('info', 'Tenant settings updated.', 'Tenant', this.docId);
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
        toastr.error('An error occurred: Task not created.');
        //LogEvent('error', 'Task not created: ' + error);
      }
    },
    onSuccess: function() {
      Modal.hide('');
      toastr.success('Task created.');
      //LogEvent('info', 'Task created.');
    }
  },
  editTaskModal: {
    onError: function(formType, error) {
      if (error) {
        toastr.error('An error occurred: Task not updated.');
        //LogEvent('error', 'Task not updated: ' + error);
      }
    },
    onSuccess: function() {
      Modal.hide('');
      toastr.success('Task updated.');
      //LogEvent('info', 'Task updated.');
    }
  },
  newPurchaseOrderForm: {
    before: {
      insert: function(doc) {
        var t = Tenants.find({}).fetch()[0];
        if (t) {
          doc.orderNumber = String(t.settings['PurchaseOrderPrefix']) + "" + String(t.settings['PurchaseOrderStartingValue']);
          return doc;
        }
      }
    },
    onError: function(formType, error) {
      toastr.error('An error occurred: Purchase order not created.');
      //LogEvent('error', 'Purchase order not created: ' + error, 'Purchase Order', this.docId);
    },
    onSuccess: function() {
      var t = Tenants.find({}).fetch()[0];
      if (t) {
        var val = t.settings['PurchaseOrderStartingValue'];
        var newVal = Number(val) + 1;

        var o = {
          PurchaseOrderPrefix: t.settings['PurchaseOrderPrefix'],
          PurchaseOrderStartingValue: newVal
        };

        Tenants.update(t._id, {
          $set: {
            settings: o
          }
        });
      }

      Modal.hide();
      toastr.success('Purchase Order raised.');
      //LogEvent('info', 'Purchase order created.', 'Purchase Order', this.docId);
    }
  },
  addPurchaseOrderItem: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Item added.');
      //LogEvent('info', 'Purchase order item added.');
    }
  },
  editPurchaseOrderItem: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Item edited.');
      //LogEvent('info', 'Purchase order item edited.');
    }
  },
  insertPurchaseOrderActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Purchase order activity added.');
      //LogEvent('info', 'Purchase order activity added.');
    }
  },
  insertCompanyContactForm: {
    onSuccess: function() {
      toastr.success('Contact created.');
      Modal.hide();
    }
  },
  insertContactForm: {
    onSuccess: function() {
      toastr.success('Contact created.');
      Modal.hide();
    }
  }
});
