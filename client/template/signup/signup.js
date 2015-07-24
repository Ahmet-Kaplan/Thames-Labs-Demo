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
