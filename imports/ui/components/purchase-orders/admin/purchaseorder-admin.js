import './purchaseorder-admin.css';
import './purchaseorder-admin.html';
import bootbox from 'bootbox';

Template.purchaseOrderAdminPanel.onRendered(function() {
  const tenant = Tenants.findOne({
    _id: Meteor.user().group
  });
  const currVal = tenant.settings.purchaseorder.defaultPrefix;
  $('#poAdminCurrentPrefix').val((currVal === " " ? "" : currVal));
});

Template.purchaseOrderAdminPanel.events({
  'click #poAdminUpdatePrefix': function(event) {
    event.preventDefault();

    const newVal = $('#poAdminCurrentPrefix').val();

    bootbox.confirm("Updating the purchase order prefix will not affect existing purchase orders - only new ones will reflect the new change. Update it anyway?", function(result) {
      if (result === true) {
        const tenant = Tenants.findOne({
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
