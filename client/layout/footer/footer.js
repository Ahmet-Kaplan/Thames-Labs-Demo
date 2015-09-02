Template.footer.helpers({
  tenantName: function() {
    return Tenants.findOne({}).name;
  }
});