import './purchaseorder-admin.css';
import './purchaseorder-admin.html';
import bootbox from 'bootbox';

Template.purchaseOrderAdminPanel.onRendered(function() {
  var tenant = Tenants.findOne({
    _id: Meteor.user().group
  });
  var currVal = tenant.settings.purchaseorder.defaultPrefix;
  $('#poAdminCurrentPrefix').val((currVal === " " ? "" : currVal));
});

Template.purchaseOrderAdminPanel.events({
  'click #poAdminUpdatePrefix': function(event) {
    event.preventDefault();

    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To set your own purchase order prefix');
      return;
    }

    var newVal = $('#poAdminCurrentPrefix').val();

    bootbox.confirm("Updating the purchase order prefix will not affect existing purchase orders - only new ones will reflect the new change. Update it anyway?", function(result) {
      if (result === true) {
        var tenant = Tenants.findOne({
          _id: Meteor.user().group
        });
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
