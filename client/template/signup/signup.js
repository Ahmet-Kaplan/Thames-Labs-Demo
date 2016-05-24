Template.signUp.onCreated(function() {
  // Redirect if logged in
  this.autorun(function() {
    if (Meteor.user()) FlowRouter.go('dashboard');
  });
});

Template.signUp.onRendered(function() {

  var params = FlowRouter.current().queryParams;
  if (params.company) this.$('#company-name-field').val(params.company);
  if (params.name) this.$('#name-field').val(params.name);
  if (params.email) this.$('#email-field').val(params.email);

  if (Template.currentData().coupon) {
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
  }
});

AutoForm.hooks({
  signUpForm: {
    onSuccess: function(formType, result) {
      bootbox.alert({
        title: 'Sign-up successful!',
        message: '<i class="fa fa-check fa-3x pull-left text-success"></i>Your account has been created but is not active yet. To do so, click the link in the email we\'ve just sent you and set your password.<br>Thank you for choosing RealTimeCRM.',
        className: 'bootbox-success',
        callback() {
          FlowRouter.redirect('/');
          FlowRouter.reload();
        },
      });

    },
  }
});