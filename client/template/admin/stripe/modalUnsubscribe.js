Template.stripeUnsubscribe.helpers({
  limitReached: function() {
  return Tenants.findOne({}).totalRecords > MAX_RECORDS;
  }
});

Template.stripeUnsubscribe.events({
  'click #unsubscribe': function() {
    event.preventDefault();
    $('#unsubscribe').prop('disabled', true);
    toastr.info('Processing your changes...');
    Meteor.call('cancelStripeSubscription', function(error, response) {
      if(error) {
        Modal.hide();
        bootbox.alert({
          title: 'Error',
          message: '<div class="bg-danger"><i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to cancel subscription.<br />Please contact us if the problem remains.</div>'
        });
        return false;
      }
      Modal.hide();
      toastr.clear();
      bootbox.alert({
        title: 'Subscription updated',
        message: '<div class="bg-success"><i class="fa fa-check fa-3x pull-left text-success"></i>Your subscription has been cancelled successfully.<br />We welcome any feedback on RealtimeCRM.</div>'
      });
      Session.set('stripeUpdateListener', Session.get('stripeUpdateListener') + 1);
    });
  }
});