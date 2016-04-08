Template.footer.helpers({
  tenantName: function() {
    var tenant = Tenants.findOne({});
    return !!tenant ? tenant.name : null;
  }
});

//Hide the splashscreen as quickly as possible
Template.footer.onRendered(function () {
    navigator.splashscreen.hide();
});
