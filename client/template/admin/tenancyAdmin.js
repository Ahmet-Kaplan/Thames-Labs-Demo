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
  hasStripeAccount: function() {
    return !(Tenants.findOne({}).stripeId === undefined || Tenants.findOne({}).stripeId === '');
  },
  lockedUser: function() {
    return Tenants.findOne({}).limit === -1;
  },
  tenantFound: function() {
    return !!Tenants.findOne({});
  }
});

Template.tenancyAdminPage.events({
  'click #btnEditTenantUserPermissions': function() {
    Modal.show('editTenantUserPermissions', this);
  },

  'click #upScheme': function(e) {
    Modal.show('stripeSubscribe', this);
  },

  'click #reUpScheme': function(e) {
    Modal.show('stripeResubscribe', this);
  },

  'click #downScheme': function(e) {
    Modal.show('stripeUnsubscribe', this);
  },

  'click #addNewUserAccount': function() {
    Modal.show('addNewUser', this);
  },

  'click #tenantRemoveUser': function() {
    event.preventDefault();
    self = this;

    bootbox.confirm("Are you sure you wish to remove the user" + this.name + "?<br />This action is not reversible.", function(result) {
      if (result === true) {
        Meteor.call('removeUser', self._id);
      }
    });
  }
});
