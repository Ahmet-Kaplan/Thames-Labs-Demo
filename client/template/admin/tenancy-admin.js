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
  globalCustomFields: function() {
    var data = [];
    var user = Meteor.users.findOne(Meteor.userId());
    var tenant = Tenants.findOne(user.group);

    var fields = tenant.settings.extInfo.company;
    _.each(fields, function(f) {
      data.push(f);
    });
    fields = tenant.settings.extInfo.contact;
    _.each(fields, function(f) {
      data.push(f);
    });
    fields = tenant.settings.extInfo.project;
    _.each(fields, function(f) {
      data.push(f);
    });

    return data;
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
          if(error) {
            toastr.error('Unable to remove user. ' + error);
            throw new Meteor.Error('User', 'Unable to remove user.');
          }
          bootbox.alert({
            title: 'User removed',
            message: '<div class="bg-success"><i class="fa fa-check fa-3x pull-left text-success"></i>User ' + name + ' has been removed.<br />Please note that your subscription has been updated accordingly.</div>'
          });
          upcomingInvoiceDep.changed();
        });
      }
    });
  },
  'click #addGlobalCustomField': function() {
    Modal.show('addNewGlobalCustomField');
  }
});

Template.gcf_display.helpers({
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
    }

    return retVal;
  },
  niceType: function() {
    var retVal = "";

    switch (this.type) {
      case 'text':
        retVal = 'Text';
        break;
      case 'checkbox':
        retVal = 'Checkbox';
        break;
      case 'date':
        retVal = 'Date/Time';
        break;
    }

    return retVal;
  }
});
Template.gcf_display.events({
  'click #delete-global-custom-field': function() {

    var self = this;

    bootbox.confirm("Are you sure you wish to delete this extended information field?", function(result) {
      if (result === true) {
        switch (self.targetEntity) {

          case "company":
            var targets = Companies.find({}).fetch();

            _.each(targets, function(cx) {

              var cfMaster = {};

              if (cx.customFields) {
                for (var cf in cx.customFields) {
                  if (cf !== self.name) {
                    cfMaster[cf] = cx.customFields[cf];
                  }
                }
                Companies.update(cx._id, {
                  $set: {
                    customFields: cfMaster
                  }
                });
              }
            });
            break;

          case "contact":
            var targets = Contacts.find({}).fetch();

            _.each(targets, function(cx) {

              var cfMaster = {};

              if (cx.customFields) {
                for (var cf in cx.customFields) {
                  if (cf !== self.name) {
                    cfMaster[cf] = cx.customFields[cf];
                  }
                }
                Contacts.update(cx._id, {
                  $set: {
                    customFields: cfMaster
                  }
                });
              }
            });
            break;

          case "project":
            var targets = Projects.find({}).fetch();

            _.each(targets, function(cx) {

              var cfMaster = {};

              if (cx.customFields) {
                for (var cf in cx.customFields) {
                  if (cf !== self.name) {
                    cfMaster[cf] = cx.customFields[cf];
                  }
                }
                Projects.update(cx._id, {
                  $set: {
                    customFields: cfMaster
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
        }

        bootbox.hideAll();
      }
    });
  }
});
