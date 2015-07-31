function removeSignUpEmailValidationError(key) {
  delete AutoForm.templateInstanceForForm("signUpForm")._stickyErrors[key];
  AutoForm.validateForm("signUpForm");
};

Template.signUp.events({
  'click #email-field': function() {
    removeSignUpEmailValidationError('email');
  }
});
var details = {
  email: "",
  password: ""
};
AutoForm.hooks({
  signUpForm: {
    onError: function(formType, error) {
      if (typeof error.reason === 'string') {
        if (error.reason.indexOf('email') !== -1) {
          //Get appropriate message shown when user enters a taken email
          //because the server is the only place that can verify this
          this.addStickyValidationError('email', 'emailTaken');
          AutoForm.validateField(this.formId, 'email');
        }
      }
    },
    onSuccess: function(formType, result) {
      Meteor.loginWithPassword(details.email, details.password, function() {
        FlowRouter.redirect('/');
        FlowRouter.reload();
      });
    },
    beginSubmit: function() {
      details.email = $("#email-field").val().toLowerCase();
      details.password = $("#password-field").val();
    },
  }
});
