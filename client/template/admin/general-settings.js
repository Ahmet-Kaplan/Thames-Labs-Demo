Template.generalSettings.events({
  'change #currencySelect': function(event) {
    event.preventDefault();
    Meteor.call('setNewCurrency', $(event.target).val(), function(err, res) {
      if(err) {
        toastr.error('Unable to change your currency.');
      } else {
        toastr.success('Your currency has been updated to <b>' + res.toUpperCase() + '</b>');
      }
    });
  },
  'click #saveTenantName': function(event, template) {
    event.preventDefault();
    var newName = $('#tenantNameEditor').val();
    if (newName === "") {
      toastr.error('You must provide a tenant name.');
      return;
    }
    var user = Meteor.user();
    var tenant = Tenants.findOne({_id: user.group});

    Tenants.update(tenant._id, {$set: {"name": newName}}, function(err) {
      if(err) {
        toastr.error(err.reason);
        $('#tenantNameEditor').val(tenant.name);
      }
    });

    toastr.success("Tenant name updated successfully.");
  }
});

Template.generalSettings.onRendered(function() {
  var user = Meteor.user();
  var tenant = Tenants.findOne({_id: user.group});
  $('#tenantNameEditor').val(tenant.name);
});
