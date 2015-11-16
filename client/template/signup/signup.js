function removeSignUpEmailValidationError(key) {
  delete AutoForm.templateInstanceForForm("signUpForm")._stickyErrors[key];
  AutoForm.validateForm("signUpForm");
}

Template.signUp.onCreated(function() {
  // Redirect if logged in
  this.autorun(function() {
    if (Meteor.user()) FlowRouter.go('dashboard');
  });
});

Template.signUp.onRendered(function() {
  var coupon = Template.currentData().coupon;
  if(coupon) {
    Meteor.call('getStripeCoupon', coupon,  function(err, response) {
      if(err || !response || !response.valid) {
        $('input[name=coupon]').val('');
        $('h1').after('<div class="alert alert-info">The coupon you have provided is not valid. Please contact us to activate it before upgrading.</div>');
      } else {
        var discount = (response.percent_off) ? response.percent_off + "%" : "£" + response.amount_off / 100
        $('h1').after('<div class="alert alert-info">Your coupon \'' + response.id + '\' will give you a ' + discount + ' discount on any subscription to RealTimeCRM.</div>');
      }
    });
  }
});

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
  before: {
    method: function(doc) {
      if(!doc.coupon) {
        return doc;
      }
      Meteor.call('getStripeCoupon', function(err, response) {
        if(err || !response) {
          doc.coupon = '';
          toastr.error('The coupon you have provided is not valid.<br />Please contact us to activate it before upgrading.');
        }
        return doc;
      });
    }
  },
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
      });
    },
    beginSubmit: function() {
      details.email = $("#email-field").val().toLowerCase();
      details.password = $("#password-field").val();
    },
  }
});
