Template.tenantList.helpers({
  tenants: function(paying) {
    var payingTenant = (paying === "true") ? true : false;
    return Tenants.find({ paying: payingTenant });
  },
  tenantCount: function() {
    return Tenants.find({}).count();
  },
  users: function() {
    return Meteor.users.find({
      group: this._id
    });
  },
  userCount: function() {
    return Meteor.users.find({}).count();
  }
});


Template.tenant.helpers({
  userCount: function() {
    return Meteor.users.find({
      group: this._id
    }).count();
  },
  recordsCount: function() {
    return this.totalRecords;
  },
  isPaidTenant: function() {
    return this.paying;
  },
  isBlocked: function() {
    return this.limit == -1;
  }
});

Template.tenantList.events({
  "click #btnAddNewTenant": function(event, template) {
    event.preventDefault();
    Modal.show('addTenant');
  }
});

Template.tenant.events({
  "click #btnAddNewTenantUser": function(event, template) {
    event.preventDefault();
    Modal.show('addTenantUser', this);
  },
  "click #btnDeleteTenant": function(event, template) {
    event.preventDefault();
    var tenantId = this._id;

    bootbox.confirm("Are you sure you wish to delete this tenant?", function(result) {
      if (result === true) {
        Tenants.remove(tenantId);
      }
    });
  },
  "click #btnEditSettings": function(event, template) {
    event.preventDefault();
    Modal.show('updateTenantSettings', this);
  },
  'click #btnDemoData': function() {
    Meteor.call('generateDemoData', this._id);
  },
  'click #btnPaidTenant': function(event) {
    event.preventDefault();
    var tenantId = this._id;
    var scheme = (this.paying) ? 'Free' : 'Paying';
    var currentScheme = this.paying

    bootbox.confirm("Are you sure you wish to set this tenant to the " + scheme + " scheme?", function(result) {
      if (result === true) {
        var limit = (!currentScheme) ? 0 : null;
        Tenants.update(tenantId, {
          $set: {
            paying: !currentScheme,
            limit: limit
          }
        });
      }
    });
  },
  'click #btnBlockTenant': function(event) {
    event.preventDefault();
    var tenantId = this._id;
    var blocked = (this.limit == -1) ? 'un' : '';
    var newLimit = (this.limit == -1) ? null : -1;

    bootbox.confirm("Are you sure you wish to " + blocked + "block this tenant?", function(result) {
      if (result === true) {
        Tenants.update(tenantId, {
          $set: {
            limit: newLimit
          }
        });
      }
    });
  }
});

Template.user.helpers({
  friendlyLastLogin: function() {
    if (this.profile.lastLogin === null) {
      return "Never logged in.";
    } else {
      return "Last logged in " + moment(this.profile.lastLogin).fromNow();
    }
  },
  emailAddress: function() {
    return this.emails[0].address;
  }
});

Template.user.events({
  "click #btnDeleteTenantUser": function(event, template) {
    var userId = this._id;
    event.preventDefault();

    bootbox.confirm("Are you sure you wish to delete this user?", function(result) {
      if (result === true) {
        Meteor.call('removeUser', userId);
        Meteor.users.remove(userId);
      }
    });
  },
  "click #btnEditTenantUser": function(event, template) {
    event.preventDefault();
    Modal.show('editTenantUser', this);
  }
});
