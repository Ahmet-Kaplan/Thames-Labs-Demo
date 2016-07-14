import './update-currency.html';

Template.updateCurrency.onRendered(function() {
  $('.selectpicker').selectpicker();
});

Template.updateCurrency.helpers({
  tenant: function() {
    return Tenants.findOne({_id: Partitioner.group()});
  }
});

Template.updateCurrency.events({
  'change #currencySelect': function(event) {
    event.preventDefault();
    Meteor.call('setNewCurrency', $(event.target).val(), function(err, res) {
      if(err) {
        toastr.error('Unable to change your currency.');
      } else {
        toastr.success('Your currency has been updated to <b>' + res.toUpperCase() + '</b>');
      }
    });
  }
});

