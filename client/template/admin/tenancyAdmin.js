Template.tenancyAdminPage.onRendered(function() {
  handler = StripeCheckout.configure({
    key: 'pk_test_W7Cx4LDFStOIaJ2g5DufAIaE',
    locale: 'auto',
    token: function(token) {
      Meteor.call('tenantSubscription', token)
      // Use the token to create the charge with a server-side script.
      // You can access the token ID with `token.id`
    }
  });
});

Template.tenancyAdminPage.helpers({
  tenantUsers: function() {
    return Meteor.users.find({
      _id: {
        $ne: Meteor.userId()
      }
    });
  },
  payingScheme: function() {
    return Tenants.findOne({}).paying;
  },
  lockedUser: function() {
    return Tenants.findOne({}).limit === -1;
  }
});

Template.tenancyAdminPage.events({
  'click #btnEditTenantUserPermissions': function() {
    Modal.show('editTenantUserPermissions', this);
  },

  'click #upScheme': function(e) {
    Modal.show('stripeSubscribe', this);
  }
});
