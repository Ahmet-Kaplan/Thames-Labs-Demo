Template.tenancyAdminPage.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'Administrator');
  });
  Meteor.subscribe('activeTenantData', Meteor.user().group);
});

Template.tenancyAdminPage.helpers({

  tenantUsers: function() {
    return Meteor.users.find({});
  },
  globalCompanyCustomFields: function() {
    var data = [];
    var user = Meteor.users.findOne(Meteor.userId());
    if (!user) return;

    var tenant = Tenants.findOne(user.group);
    if (!tenant) return;


    var fields = tenant.settings.extInfo.company;
    if (fields) {
      _.each(fields, function(f) {
        data.push(f);
      });
    }

    return data.sort(function(a, b) {
      if (a.dataOrder < b.dataOrder) return -1;
      if (a.dataOrder > b.dataOrder) return 1;
      return 0;
    });
  },
  globalContactCustomFields: function() {
    var data = [];
    var user = Meteor.users.findOne(Meteor.userId());
    if (!user) return;

    var tenant = Tenants.findOne(user.group);
    if (!tenant) return;

    var fields = tenant.settings.extInfo.contact;
    if (fields) {
      _.each(fields, function(f) {
        data.push(f);
      });
    }

    return data.sort(function(a, b) {
      if (a.dataOrder < b.dataOrder) return -1;
      if (a.dataOrder > b.dataOrder) return 1;
      return 0;
    });
  },
  globalProjectCustomFields: function() {
    var data = [];
    var user = Meteor.users.findOne(Meteor.userId());
    if (!user) return;

    var tenant = Tenants.findOne(user.group);
    if (!tenant) return;


    var fields = tenant.settings.extInfo.project;
    if (fields) {
      _.each(fields, function(f) {
        data.push(f);
      });
    }

    return data.sort(function(a, b) {
      if (a.dataOrder < b.dataOrder) return -1;
      if (a.dataOrder > b.dataOrder) return 1;
      return 0;
    });
  },
  globalProductCustomFields: function() {
    var data = [];
    var user = Meteor.users.findOne(Meteor.userId());
    if (!user) return;

    var tenant = Tenants.findOne(user.group);
    if (!tenant) return;


    var fields = tenant.settings.extInfo.product;
    if (fields) {
      _.each(fields, function(f) {
        data.push(f);
      });
    }

    return data.sort(function(a, b) {
      if (a.dataOrder < b.dataOrder) return -1;
      if (a.dataOrder > b.dataOrder) return 1;
      return 0;
    });
  },
  tenantFound: function() {
    return !!Tenants.findOne({});
  }
});


Template.tenancyAdminPage.events({
  'click #btnEditTenantUserGeneralSettings': function() {
    event.preventDefault();
    Modal.show('editTenantUserGeneralSettings', this);
  },
  'click #btnEditTenantUserPermissions': function() {
    event.preventDefault();
    var tenantId = Meteor.user().group;
    if (!IsTenantPro(tenantId)) {
      ShowUpgradeToastr('To set user permissions');
      return;
    }
    Modal.show('editTenantUserPermissions', this);
  },

  'click #addNewUserAccount': function() {
    event.preventDefault();

    var tenantId = Meteor.user().group;
    if (!IsTenantPro(tenantId) && TenantUserCount(tenantId) >= MAX_FREE_USERS) {
      ShowUpgradeToastr('To add more users');
      return;
    }
    Modal.show('addNewUser', this);
  },

  'click #tenantRemoveUser': function() {
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
  'click #addGlobalCustomField': function() {
    Modal.show('addNewGlobalCustomField');
  }
});

Template.adminAreaUser.helpers({
  isSelf: function() {
    return this._id === Meteor.userId();
  }
});

Template.gcf_display.helpers({
  canMoveUp: function() {
    return this.dataOrder > 0;
  },
  canMoveDown: function() {
    var exInfLen = Tenants.findOne({
      _id: Meteor.user().group
    }).settings.extInfo[this.targetEntity].length;
    return this.dataOrder < exInfLen - 1;
  },
  niceEntity: function() {
    var retVal = "";

    switch (this.targetEntity) {
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
    Meteor.call('changeExtInfoOrder', self.targetEntity, self.name, "up", function(err, res) {
      if (err) throw new Meteor.Error(err);
      if (res.exitCode !== 0) {
        toastr.error(res.exitStatus);
      }
    });
  },
  'click #orderDown': function() {
    var self = this;
    Meteor.call('changeExtInfoOrder', self.targetEntity, self.name, "down", function(err, res) {
      if (err) throw new Meteor.Error(err);
      if (res.exitCode !== 0) {
        toastr.error(res.exitStatus);
      }
    });
  },
  'click #delete-global-custom-field': function() {

    var self = this;

    bootbox.confirm("Are you sure you wish to delete this extended information field?", function(result) {
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