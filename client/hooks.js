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

      logEvent("info", profile.name + " logged in.");
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
  //         //logEvent("warning", "Attempted sign-up with in-use email.");
  //       }
  //     }
  //   },
  //   onSuccess: function(formType, result) {
  //     Meteor.loginWithPassword(details.email, details.password, function() {
  //       FlowRouter.redirect('/');
  //       FlowRouter.reload();
  //       //logEvent("verbose", details.email + " successfully signed up and logged in.");
  //     });
  //   },
  //   beginSubmit: function() {
  //     details.email = $("#email-field").val();
  //     details.password = $("#password-field").val();
  //     //logEvent("debug", "Submitting sign-up application...");
  //   },
  // },
  insertContactForm: {
    onSuccess: function() {
      toastr.success('Contact created.');
      Modal.hide();
      FlowRouter.go('/contacts/' + this.docId);
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
  updatePurchaseOrderForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Purchase details updated.');
      //logEvent('info', 'Contact created.', 'Contact', this.docId);
    }
  },
  newProjectForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project created.');
      //logEvent('info', 'Project created.', 'Project', this.docId);
    },
    after: {
      insert: function(error, result) {
        if (error) {
          toastr.error('An error occurred: Project not created.');
          return false;
        }
        FlowRouter.go('/projects/' + result);
      }
    }
  },
  newContactProjectForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project created.');
      //logEvent('info', 'Contact project created.', 'Contact', this.docId);
    }
  },
  updateProjectForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project updated.');
      //logEvent('info', 'Project updated.', 'Project', this.docId);
    }
  },
  updateActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Activity updated.');
      //logEvent('info', 'Activity updated.');
    }
  },
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
  // insertPurchaseOrderActivityForm: {
  //   onSuccess: function() {
  //     Modal.hide();
  //     toastr.success('Purchase order activity created.');
  //     //logEvent('info', 'Purchase order activity created.', 'Purchase Order', this.docId);
  //   }
  // },
  insertContactActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Contact activity created.');
      //logEvent('info', 'Contact activity created.');
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
      //logEvent('verbose', 'A new tenant user has been created.', 'User', this.docId);
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
      //logEvent('verbose', 'A new tenant has been created.', 'Tenant', this.docId);
    }
  },
  removeCompanyForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Company removed.');
      //logEvent('warning', 'Company deleted.', 'Company', this.docId);
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
      //logEvent('info', 'Tenant settings updated.', 'Tenant', this.docId);
    }
  },
  newTaskForm: {
    before: {
      insert: function(doc) {
        doc.createdBy = Meteor.userId();
        if(doc.remindMe && doc.reminder) { 
          var reminderDate = moment(doc.reminder);
          var dueDate = moment(doc.dueDate);
          if(reminderDate.diff(moment()) < 0){
            toastr.error('The reminder date is in the past.')
            return false;
          } else if(doc.dueDate && reminderDate.diff(dueDate) > 0) {
            toastr.error('The reminder date is after the due Date.');
            return false;
          }
        }
        return doc;
      }
    },
    onError: function(formType, error) {
      if (error) {
        toastr.error('An error occurred: Task not created.');
        //logEvent('error', 'Task not created: ' + error);
      }
    },
    onSuccess: function(formType, result) {
      Modal.hide('');
      toastr.success('Task created.');
      //logEvent('info', 'Task created.');
    }
  },
  editTaskForm: {
    onError: function(formType, error) {
      if (error) {
        toastr.error('An error occurred: Task not updated.');
        //logEvent('error', 'Task not updated: ' + error);
      }
    },
    onSuccess: function() {
      Modal.hide('');
      toastr.success('Task updated.');
      //logEvent('info', 'Task updated.');
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
      //logEvent('error', 'Purchase order not created: ' + error, 'Purchase Order', this.docId);
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
      //logEvent('info', 'Purchase order created.', 'Purchase Order', this.docId);
    },
    after: {
      insert: function(error, result) {
        if(error) {
          toastr.error('An error has occured, purchase order not raised.');
          return false;
        }

        FlowRouter.go('/purchaseorders/' + result);

      }
    }
  },
  addPurchaseOrderItem: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Item added.');
      //logEvent('info', 'Purchase order item added.');
    }
  },
  editPurchaseOrderItem: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Item edited.');
      //logEvent('info', 'Purchase order item edited.');
    }
  },
  insertPurchaseOrderActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Purchase order activity added.');
      //logEvent('info', 'Purchase order activity added.');
    }
  },
  insertCompanyContactForm: {
    onSuccess: function() {
      toastr.success('Contact created.');
      Modal.hide();
    }
  },
  insertNewStageForm: {
    onSuccess: function() {
      toastr.success('Stage created.');
      Modal.hide();
    }
  },
  editStageForm: {
    onSuccess: function() {
      toastr.success('Stage edited.');
      Modal.hide();
    }
  },
  insertOpportunityForm: {
    onSuccess: function() {
      toastr.success('Opportunity added.');
      Modal.hide();
    },
    after: {
      insert: function(error, result) {
        if (error) {
          toastr.error('An error occurred: Opportunity not created.');
          //logEvent('error', 'Company not created: ' + error, 'Company', this.docId);
          return false;
        }

        FlowRouter.go('/opportunities/' + result);
      }
    }
  },
  editOpportunityForm: {
    onSuccess: function() {
      toastr.success('Opportunity edited.');
      Modal.hide();
    }
  },
  insertOpportunityItemForm: {
    onSuccess: function() {
      toastr.success('Opportunity line item added.');
      Modal.hide();
    }
  },
  editOpportunityItemForm: {
    onSuccess: function() {
      toastr.success('Opportunity line item edited.');
      Modal.hide();
    }
  },
  insertOpportunityActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Opportunity activity created.');
    }
  },
});
