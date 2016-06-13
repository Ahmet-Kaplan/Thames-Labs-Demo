Template.generalSettings.helpers({
  tenant: function() {
    return Tenants.findOne({_id: Partitioner.group()});
  }
});

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
  'submit #tenantNameForm': function(event, template) {
    event.preventDefault();
    var newName = $(event.target).find('input').val();

    if (newName === "") {
      toastr.error('You must provide a name.');
      return;
    }

    Tenants.update(Partitioner.group(), {$set: {"name": newName}}, function(err) {
      if(err) {
        toastr.error(err.reason);
        return;
      }
      toastr.success("Company name updated successfully.");
    });

  }
});

