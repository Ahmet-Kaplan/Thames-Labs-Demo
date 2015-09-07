Template.tenancyAdminPage.onCreated(function() {
  // Redirect if read permission changed - we also check the initial load in the router
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'Administrator');
  });
  Meteor.subscribe('activeTenantData', Meteor.user().group);
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
  hasStripeAccount: function() {
    return !(Tenants.findOne({}).stripeId === undefined || Tenants.findOne({}).stripeId === '');
  },
  lockedUser: function() {
    return Tenants.findOne({}).limit === -1;
  },
  tenantFound: function() {
    return !!Tenants.findOne({});
  },
  totalRecords: function() {
    return Tenants.findOne({}).totalRecords;
  },
  limitRecords: function() {
    return (Tenants.findOne({}).paying === true ? 'unlimited' : MAX_RECORDS);
  },
  totalUsers: function() {
    return Meteor.users.find({group: Meteor.user().group}).count();
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
    var self = this;
    var name = this.profile.name;

    bootbox.confirm("Are you sure you wish to remove the user " + name + "?<br />This action is not reversible.", function(result) {
      if (result === true) {
        Meteor.call('removeUser', self._id, function(error, response) {
          if(error) {
            toastr.error('Unable to remove user. ' + error);
            throw new Meteor.Error('User', 'Unable to remove user.');
          }
          bootbox.alert({
            title: 'User removed',
            message: '<div class="bg-success"><i class="fa fa-check fa-3x pull-left text-success"></i>User ' + name + ' has been removed.<br />Please note that your subscription has been updated accordingly.</div>'
          });
        });
      }
    });
  }
});
