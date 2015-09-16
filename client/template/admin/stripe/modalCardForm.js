Template.cardForm.onRendered(function() {
  $.getScript('/vendor/jquery.card.js').then(function() {
    $('form').card({
      container: '.card-wrapper',
      formSelectors: {
        numberInput: 'input#cardNumber',
        expiryInput: 'input#expMonth, input#expYear',
        cvcInput: 'input#cardCVC',
        nameInput: 'input#cardName'
      }
    });
  });
});

Template.cardForm.helpers({
  userEmail: function() {
    return Meteor.user().emails[0].address;
  }
});

Template.cardFormModal.events({
  'submit #subscribe': function(event) {
    event.preventDefault();

    //Disable the submit button to prevent repeated clicks
    $('#submit').prop('disabled', true);

    var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    if(!emailRegex.test($('#email').val())) {
      toastr.error('Please enter a valid email address.');
      $('#submit').prop('disabled', false);
      return false;
    }

    toastr.info('Validating your card details...');
    Stripe.card.createToken({
      number: $('[data-stripe=number]').val(),
      exp_month: $('[data-stripe=exp-month]').val(),
      exp_year: $('[data-stripe=exp-year]').val(),
      cvc: $('[data-stripe=cvc]').val(),
      name: $('[data-stripe=name]').val()
    }, function(status, response) {
      if (response.error) {
          toastr.error(response.error.message);
          $('#submit').prop('disabled', false);
          return;
        } else {
          Meteor.call('updateStripeCard', response.id, function(error, response) {
            if(error) {
              Modal.hide();
              toastr.error('Unable to update card details');
              return false;
            }
            toastr.clear();
            toastr.success('Your card details have been updated.');
            Modal.hide();
            Session.set('listenCardUpdate', Session.get('listenCardUpdate') + 1);
          });
        }
    });
  }
});
