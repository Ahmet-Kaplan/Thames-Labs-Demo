import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { stripeCustomer } from '../helpers.js';

import './coupon-modal.html';

Template.couponModal.helpers({
  activeCoupon: function() {
    return Tenants.findOne({
      _id: Meteor.user().group
    }).stripe.coupon;
  }
});

Template.couponModal.events({
  'keyup #couponName': function(evt) {
    if(evt.keyCode === 13) {
      $('#setCoupon').trigger('click');
    }
  },
  'click #setCoupon': function(evt) {
    evt.preventDefault();

    $('#setCoupon').prop('disabled', true);
    $('#setCoupon').html('<i class="fa fa-cog fa-spin"></i> Verifying coupon...');

    const coupon = $('#couponName').val();
    Meteor.call('stripe.updateCoupon', coupon, function(err, res) {
      if(err) {
        toastr.error('Unable to set your coupon', 'Error');
        $('#setCoupon').prop('disabled', false);
        $('#setCoupon').html('Apply');
      } else if(res === false) {
        toastr.error('This coupon is not valid', 'Error');
        $('#setCoupon').prop('disabled', false);
        $('#setCoupon').html('Apply');
      } else {
        stripeCustomer.update();
        toastr.success('Your coupon has been updated successfully');
        Modal.hide();
      }
    });
  }
});