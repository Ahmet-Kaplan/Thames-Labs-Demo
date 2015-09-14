cardDetailsDep = new Tracker.Dependency();
var cardDetails = {};

function updateCardDetails() {
  Meteor.call('getStripeCardDetails', function(error, response) {
    cardDetails = response;
    cardDetailsDep.changed();
  });
}

Template.cardDetailsTemplate.onRendered(function() {
  var stripeId = Tenants.findOne({}).stripeId;
  if(!stripeId) {
    throw new Meteor.Error(400, 'No stripe account could be found.');
  }
  updateCardDetails();
});

Template.cardDetailsTemplate.helpers({
  cardDetails: function() {
    cardDetailsDep.depend();
    return cardDetails;
  }
});

Template.cardDetailsTemplate.events({
  'click #updateCardDetails': function(event) {
    event.preventDefault();
    Modal.show('cardFormModal');
  }
});
