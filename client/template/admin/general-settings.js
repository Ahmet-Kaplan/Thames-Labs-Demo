Template.generalSettings.helpers({
  tenant: function() {
    return Tenants.findOne({_id: Partitioner.group()});
  },
  phoneNumber: function() {
    return _.get(Meteor.user(), 'profile.telephone');
  }
});

Template.generalSettings.events({
  'submit #tenantPhoneForm': function(event) {
    event.preventDefault();
    $('#tenantPhoneForm button[type=submit]').prop('disabled', true);
    const tel = $(event.target).find('input').val();
    let modifier = null;
    if(tel == '') {
      modifier = {
        $unset: {
          'profile.telephone': ''
        }
      };
    } else {
      modifier = {
        $set: {
          'profile.telephone': tel
        }
      };
    }
    Meteor.users.update({
      _id: Meteor.userId()
    }, modifier, (err, res) => {
      if(res) {
        toastr.success('Your telephone number has been updated.');
        Meteor.call('notify.telephoneUpdated');
      } else if(err) {
        toastr.error('Unable to update your phone number');
      }
      $('#tenantPhoneForm button[type=submit]').prop('disabled', false);
    });
  },
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

