Template.tenancyAdminPage.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'Administrator');
  });
  Meteor.subscribe('activeTenantData');
});

Template.tenancyAdminPage.helpers({
  isFreeProTenant: function() {
    if (!Meteor.user() || !Meteor.user().group) return false;
    var user = Meteor.user(),
        tenant = Tenants.findOne(user.group);
    return tenant.plan === 'pro' && !tenant.stripe.stripeSubs;
  },

  tenantUsers: function() {
    return Meteor.users.find({});
  },

  globalCompanyCustomFields: function() {
    return CustomFields.find({
      target: 'company'
    }).fetch().sort(function(a, b) {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });
  },
  globalContactCustomFields: function() {
    return CustomFields.find({
      target: 'contact'
    }).fetch().sort(function(a, b) {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });
  },
  globalProjectCustomFields: function() {
    return CustomFields.find({
      target: 'project'
    }).fetch().sort(function(a, b) {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });
  },
  globalProductCustomFields: function() {
    return CustomFields.find({
      target: 'product'
    }).fetch().sort(function(a, b) {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });
  },
  tenantFound: function() {
    return !!Tenants.findOne({
      _id: Meteor.user().group
    });
  }
});


Template.tenancyAdminPage.events({
  'click #btnEditTenantUserGeneralSettings': function(event) {
    event.preventDefault();
    Modal.show('editTenantUserGeneralSettings', this);
  },
  'click #btnEditTenantUserPermissions': function(event) {
    event.preventDefault();
    var tenantId = Meteor.user().group;
    if (!isProTenant(tenantId)) {
      showUpgradeToastr('To set user permissions');
      return;
    }
    Modal.show('editTenantUserPermissions', this);
  },

  'click #addNewUserAccount': function(event) {
    event.preventDefault();

    var tenantId = Meteor.user().group;
    if (!isProTenant(tenantId) && isTenantOverFreeUserLimit(tenantId)) {
      showUpgradeToastr('To add more users');
      return;
    }
    Modal.show('addNewUser', this);
  },

  'click #tenantRemoveUser': function(event) {
    event.preventDefault();
    var self = this;
    var name = this.profile.name;

    bootbox.confirm("Are you sure you wish to remove the user " + name + "?<br />This action is not reversible.", function(result) {
      if (result === true) {
        Meteor.call('removeUser', self._id, function(error, response) {
          if (error) {
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
  },
  'click #addGlobalCustomField': function(event) {
    event.preventDefault();
    Modal.show('addNewGlobalCustomField');
  }
});

Template.gcf_display.helpers({
  canMove: function() {
    return CustomFields.find({
      target: this.target
    }).fetch().length > 1;
  },
  canMoveUp: function() {
    return this.order > 0;
  },
  canMoveDown: function() {
    return this.order < CustomFields.find({
      target: this.target
    }).fetch().length - 1;
  },
  niceEntity: function() {
    var retVal = "";

    switch (this.target) {
      case 'company':
        retVal = 'Companies';
        break;
      case 'contact':
        retVal = 'Contacts';
        break;
      case 'project':
        retVal = 'Projects';
        break;
      case 'product':
        retVal = 'Products';
        break;
    }

    return retVal;
  },
  niceType: function() {
    var retVal = "";

    switch (this.type) {
      case 'text':
        retVal = 'Text';
        break;
      case 'advtext':
        retVal = 'Multi-line Text';
        break;
      case 'checkbox':
        retVal = 'Checkbox';
        break;
      case 'date':
        retVal = 'Date/Time';
        break;
      case 'label':
        retVal = 'Label';
        break;
      case 'picklist':
        retVal = 'Picklist';
        break;
    }

    return retVal;
  }
});
Template.gcf_display.events({
  'click #orderUp': function() {
    var self = this;
    Meteor.call('changeExtInfoOrder', self, "up", function(err, res) {
      if (err) throw new Meteor.Error(err);
      if (res.exitCode !== 0) {
        toastr.error(res.exitStatus);
      }
    });
  },
  'click #orderDown': function() {
    var self = this;
    Meteor.call('changeExtInfoOrder', self, "down", function(err, res) {
      if (err) throw new Meteor.Error(err);
      if (res.exitCode !== 0) {
        toastr.error(res.exitStatus);
      }
    });
  },
  'click #delete-global-custom-field': function() {

    var self = this;

    bootbox.confirm("Are you sure you wish to delete this custom field?", function(result) {
      if (result === true) {
        Meteor.call('extInfo.deleteGlobal', self, function(err, res) {
          if (err) throw new Meteor.Error(err);
          if (res === true) {
            toastr.success('Global field deleted successfully.');
            bootbox.hideAll();
          }
        });
      }
    });
  }
});