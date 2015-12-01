Template.couponModal.helpers({
  activeCoupon: function() {
    return Tenants.findOne().stripe.coupon;
  }
})