import './update-tenant.html';

Template.updateTenant.helpers({
  coupon: function() {
    return this.stripe.coupon;
  },
  companyName: function() {
    return this.name;
  }
});

Template.updateTenant.events({
  'click #btnSubmitSettings': function() {

    const coupon = $('#coupon').val();
    const tenantCompanyName = $('#tenantCompanyName').val();

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