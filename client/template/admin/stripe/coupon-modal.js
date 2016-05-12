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

    var coupon = $('#couponName').val();
    Meteor.call('stripe.updateCoupon', coupon, function(err, res) {
      if(err) {
        toastr.error('Unable to set your coupon', 'Error');
        $('#setCoupon').prop('disabled', false);
        $('#setCoupon').html('Apply');
      } else if(!res) {
        toastr.error('This coupon is not valid', 'Error');
        $('#setCoupon').prop('disabled', false);
        $('#setCoupon').html('Apply');
      } else {
        toastr.success('Your coupon has been updated successfully');
        Modal.hide();
      }
    })
  }
})