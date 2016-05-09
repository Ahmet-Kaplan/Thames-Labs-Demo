import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { _ } from 'lodash';
import { $ } from 'meteor/jquery';

// import components
import './card-form.js';

// import ui
import './card-form-modal.html';

Template.cardFormModal.events({
  'submit #subscribe': function(event) {
    event.preventDefault();

    //Retrieve cardDetails ReactiveVar to update parent template
    var cardDetails = Template.currentData().cardDetails;

    //Disable the submit button to prevent repeated clicks
    $('#submit').prop('disabled', true);

    toastr.info('Validating your card details...');
    Stripe.card.createToken({
      number: $('[data-stripe=number]').val(),
      exp_month: $('[data-stripe=exp-month]').val(),
      exp_year: $('[data-stripe=exp-year]').val(),
      cvc: $('[data-stripe=cvc]').val(),
      name: $('[data-stripe=name]').val()
    }, (status, response) => {
      if (response.error) {
        toastr.error(response.error.message);
        $('#submit').prop('disabled', false);
        return;
      } else {
        Meteor.call('stripe.updateCard', response.id, (error, newCard) => {
          if (error || newCard === false) {
            Modal.hide();
            toastr.error('Unable to update card details');
            return false;
          }
          cardDetails.set(newCard);
          toastr.clear();
          toastr.success('Your card details have been updated.');
          Modal.hide();
        });
      }
    });
  }
});