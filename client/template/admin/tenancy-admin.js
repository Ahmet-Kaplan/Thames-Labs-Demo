Template.tenancyAdminPage.onCreated(function() {
  // Redirect if read permission changed
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
  globalCompanyCustomFields: function() {
    var data = [];
    var user = Meteor.users.findOne(Meteor.userId());
    var tenant = Tenants.findOne(user.group);

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
    var tenant = Tenants.findOne(user.group);

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
    var tenant = Tenants.findOne(user.group);

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
    var tenant = Tenants.findOne(user.group);

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
    Modal.show('editTenantUserGeneralSettings', this);
  },
  'click #btnEditTenantUserPermissions': function() {
    Modal.show('editTenantUserPermissions', this);
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
        var targets = null;
        switch (self.targetEntity) {

          case "company":
            targets = Companies.find({}).fetch();

            _.each(targets, function(cx) {

              var cfMaster = [];

              if (cx.extendedInformation) {
                for (var cf in cx.extendedInformation) {
                  if (cx.extendedInformation[cf].dataName !== self.name) {
                    cfMaster.push(cx.extendedInformation[cf]);
                  }
                }
                Companies.update(cx._id, {
                  $set: {
                    extendedInformation: cfMaster
                  }
                });
              }
            });
            break;

          case "contact":
            targets = Contacts.find({}).fetch();

            _.each(targets, function(cx) {

              var cfMaster = [];

              if (cx.extendedInformation) {
                for (var cf in cx.extendedInformation) {
                  if (cx.extendedInformation[cf].dataName !== self.name) {
                    cfMaster.push(cx.extendedInformation[cf]);
                  }
                }
                Contacts.update(cx._id, {
                  $set: {
                    extendedInformation: cfMaster
                  }
                });
              }
            });
            break;

          case "project":
            targets = Projects.find({}).fetch();

            _.each(targets, function(cx) {

              var cfMaster = [];

              if (cx.extendedInformation) {
                for (var cf in cx.extendedInformation) {
                  if (cx.extendedInformation[cf].dataName !== self.name) {
                    cfMaster.push(cx.extendedInformation[cf]);
                  }
                }
                Projects.update(cx._id, {
                  $set: {
                    extendedInformation: cfMaster
                  }
                });
              }
            });
            break;

          case "product":
            targets = Products.find({}).fetch();

            _.each(targets, function(cx) {

              var cfMaster = [];

              if (cx.extendedInformation) {
                for (var cf in cx.extendedInformation) {
                  if (cx.extendedInformation[cf].dataName !== self.name) {
                    cfMaster.push(cx.extendedInformation[cf]);
                  }
                }
                Products.update(cx._id, {
                  $set: {
                    extendedInformation: cfMaster
                  }
                });
              }
            });
            break;
        }

        var user = Meteor.users.findOne(Meteor.userId());
        var tenant = Tenants.findOne(user.group);
        var fields = null;

        switch (self.targetEntity) {
          case 'company':
            fields = tenant.settings.extInfo.company;
            break;
          case 'contact':
            fields = tenant.settings.extInfo.contact;
            break;
          case 'project':
            fields = tenant.settings.extInfo.project;
            break;
          case 'product':
            fields = tenant.settings.extInfo.product;
            break;
        }

        var data = [];
        _.each(fields, function(f) {
          if (f.name !== self.name) {
            data.push(f);
          }
        });

        switch (self.targetEntity) {
          case 'company':
            Tenants.update(user.group, {
              $set: {
                'settings.extInfo.company': data
              }
            });
            break;
          case 'contact':
            Tenants.update(user.group, {
              $set: {
                'settings.extInfo.contact': data
              }
            });
            break;
          case 'project':
            Tenants.update(user.group, {
              $set: {
                'settings.extInfo.project': data
              }
            });
            break;
          case 'product':
            Tenants.update(user.group, {
              $set: {
                'settings.extInfo.product': data
              }
            });
            break;
        }

        bootbox.hideAll();
      }
    });
  }
});
