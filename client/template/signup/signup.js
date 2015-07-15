Template.signUp.events({
	'click #email-field': function() {
		removeSignUpEmailValidationError('email');
	} 
}); 

AutoForm.hooks({
  signUpForm: {
    onError: function(formType, error) {
      if (typeof error.reason === 'string') {
        if (error.reason.indexOf('email') !== -1) {
          this.addStickyValidationError('email', 'emailTaken');
          AutoForm.validateField(this.formId, 'email');
        }
      }
   },
	 onSuccess: function(formType, result) {
		  FlowRouter.redirect('/');
		  FlowRouter.reload();	
	 }
  }
});

function removeSignUpEmailValidationError(key) {
    delete AutoForm.templateInstanceForForm("signUpForm")._stickyErrors[key];
    AutoForm.validateForm("signUpForm");
}