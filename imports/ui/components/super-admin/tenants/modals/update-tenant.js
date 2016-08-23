import './update-tenant.html';

Template.updateTenant.helpers({
  coupon: function() {
    return this.stripe.coupon;
  },
  companyName: function() {
    return this.name;
  },
  freeUsers: function() {
    return Tenants.findOne({
      _id: this.__originalId
    }).stripe.maxFreeUsers;
  }
});

Template.updateTenant.events({
  'click #btnSubmitSettings': function() {

    const coupon = $('#coupon').val();
    const tenantCompanyName = $('#tenantCompanyName').val();
    const freeUsers = parseInt($('#freeUsers').val(), 10);

    Tenants.update(this.__originalId, {
      $set: {
        name: tenantCompanyName,
        "stripe.coupon": coupon,
        "stripe.maxFreeUsers": freeUsers
      }
    });

    Modal.hide();
    toastr.success("Settings saved.");
  }
});