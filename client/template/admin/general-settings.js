Template.generalSettings.events({
  'change #currencySelect': function(event) {
    event.preventDefault();
    Meteor.call('setNewCurrency', $(event.target).val(), function(err, res) {
      if(err) {
        toastr.error('Unable to change your currency.');
      } else {
        toastr.success('Your currency has been updated to <b>' + res.toUpperCase() + '</b>');
      }
    })
  }
})