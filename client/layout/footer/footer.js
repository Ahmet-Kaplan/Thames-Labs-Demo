Template.footer.helpers({
  tenantName: function() {
    if (!Meteor.user()) return;

    var tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    return !!tenant ? tenant.name : null;
  }
});

//Hide the splashscreen as quickly as possible
Template.footer.onRendered(function() {
  if (Meteor.isCordova) {
    navigator.splashscreen.hide();
  }
});
