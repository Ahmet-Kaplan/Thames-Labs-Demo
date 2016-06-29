import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './card-form.html';

Template.cardForm.onRendered(function() {
  $.getScript('/vendor/jquery.card.js').then(function() {
    $('form#subscribe').card({
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