import './free-plan.html';

Template.freePlan.helpers({
  tenantName: function() {
    return Tenants.findOne({
      _id: Meteor.user().group
    }).name;
  },
  tenantUserCount: function() {
    return Meteor.users.find({}).count();
  },
  hasPreviousSubscription: function() {
    //Note that this helper is called only after the customer details have been retrieved from the api
    var stripeDetails = Tenants.findOne({
      _id: Meteor.user().group
    }).stripe.stripeSubs;
    console.log(stripeDetails);
    return (stripeDetails);
  },
});

Template.freePlan.events({
  'click #pro-upgrade': function(e) {
    e.preventDefault();
    Modal.show('stripeSubscribe', this);
  },
  'click #resume-subscription': function(e) {
    e.preventDefault();
    bootbox.confirm('Do you wish to resume your subscription to RealtimeCRM?', function(result) {
      if (result === true) {
        toastr.info('Resuming your subscription...');
        Meteor.call('stripe.resumeSubscription', function(error, result) {
          if (error) {
            bootbox.alert({
              title: 'Error',
              message: '<div class="bg-danger"><i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to resume your subscription.<br />Please contact us if the problem remains.</div>'
            });
          } else {
            bootbox.alert({
              title: 'Subscription complete',
              message: '<div class="bg-success"><i class="fa fa-check fa-3x pull-left text-success"></i>Your subscription has been successful.<br />We\'re glad to have you back!'
            });
          }
          Session.set('stripeUpdateListener', Session.get('stripeUpdateListener') + 1);
        });
      }
    });
  }
});