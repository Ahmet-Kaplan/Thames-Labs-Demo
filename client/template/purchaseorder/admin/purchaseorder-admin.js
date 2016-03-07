Template.purchaseOrderAdminPanel.onRendered(function() {
  var tenant = Tenants.findOne({});
  var currVal = tenant.settings.purchaseorder.defaultPrefix;
  $('#poAdminCurrentPrefix').val((currVal === " " ? "" : currVal));
});

Template.purchaseOrderAdminPanel.events({
  'click #poAdminUpdatePrefix': function(event) {
    event.preventDefault();

    if (!IsTenantPro(Meteor.user().group)) {
      ShowUpgradeToastr('To set your own purchase order prefix');
      return;
    }

    var newVal = $('#poAdminCurrentPrefix').val();

    bootbox.confirm("Updating the purchase order prefix will not affect existing purchase orders - only new ones will reflect the new change. Update it anyway?", function(result) {
      if (result === true) {
        var tenant = Tenants.findOne({});
        Tenants.update({
          _id: tenant._id
        }, {
          $set: {
            'settings.purchaseorder.defaultPrefix': (newVal === "" ? " " : newVal)
          }
        });
        $('#poAdminCurrentPrefix').val(newVal);

        toastr.success('Purchase order prefix update successfully.');
      }
    });
  }
});
