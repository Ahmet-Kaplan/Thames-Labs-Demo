Template.footer.helpers({
  tenantName: function() {
    var tenant = Tenants.findOne({});
    return !!tenant ? tenant.name : null;
  }
});

Template.footer.events({
  'click #fab-help': function(event) {
      $("#fab-menu").fadeToggle("fast")
  }
});
