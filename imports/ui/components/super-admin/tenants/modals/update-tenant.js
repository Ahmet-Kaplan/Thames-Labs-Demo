import './update-tenant.js';

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

    var coupon = $('#coupon').val();
    var tenantCompanyName = $('#tenantCompanyName').val();

    Tenants.update(this.__originalId, {
      $set: {
        name: tenantCompanyName,
        "stripe.coupon": coupon
      }
    });

    Modal.hide();
    toastr.success("Settings saved.");
  }
});