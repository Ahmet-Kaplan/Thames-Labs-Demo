import './pro-plan.html';

Template.proPlan.helpers({
  tenantName: function() {
    return Tenants.findOne({
      _id: Meteor.user().group
    }).name;
  },
  tenantUserCount: function() {
    return Meteor.users.find({}).count();
  },
});

Template.proPlan.events({
  'click #downgrade-plan': function(e) {
    e.preventDefault();
    Modal.show('stripeUnsubscribe', this);
  }
});