Template.tenancyAdminPage.onCreated(function() {
  // Redirect if read permission changed - we also check the initial load in the router
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'Administrator');
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
  globalCustomFields: function() {
    var data = [];
    var user = Meteor.users.findOne(Meteor.userId());
    var tenant = Tenants.findOne(user.group);

    var fields = tenant.settings.extInfo.company;
    var data = [];

    _.each(fields, function(f) {
      data.push(f);
    });
    fields = tenant.settings.extInfo.contact;
    _.each(fields, function(f) {
      data.push(f);
    });

    return data;
  }
});


Template.tenancyAdminPage.events({
  'click #btnEditTenantUserPermissions': function() {
    Modal.show('editTenantUserPermissions', this);
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
        }

        bootbox.hideAll();
      }
    });
  }
});
