Template.signUp.onCreated(function() {
  // Redirect if logged in
  this.autorun(function() {
    if (Meteor.user()) FlowRouter.go('dashboard');
  });
});

Template.signUp.onRendered(function() {
  if (!Template.currentData().coupon) return;
  var coupon = Template.currentData().coupon();
  if (coupon) {
    Meteor.call('stripe.getCoupon', coupon, function(err, response) {
      if (err || !response || !response.valid) {
        $('input[name=coupon]').val('');
        $('h1').after('<div class="alert alert-info">The coupon you have provided is not valid. Please contact us to activate it before upgrading.</div>');
      } else {
        var discount = (response.percent_off) ? response.percent_off + "%" : "£" + response.amount_off / 100
        $('h1').after('<div class="alert alert-info">Your coupon \'' + response.id + '\' will give you a ' + discount + ' discount on any subscription to RealTimeCRM.</div>');
      }
    });
  }
});

AutoForm.hooks({
  signUpForm: {
    onSuccess: function(formType, result) {
      toastr.success('Your sign-up was successful - please confirm your email by clicking the link in the email we\'ve just sent you. Thank you for choosing RealTimeCRM.');
      FlowRouter.redirect('/');
      FlowRouter.reload();
    },
  }
});
