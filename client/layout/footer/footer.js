Template.footer.helpers({
  tenantName: function() {
    var tenant = Tenants.findOne({});
    return !!tenant ? tenant.name : null;
  }
});
