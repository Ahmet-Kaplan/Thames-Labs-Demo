Template.footer.helpers({
  tenantName: function() {
    if (!Meteor.user()) return;

    var tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    return !!tenant ? tenant.name : null;
  }
});