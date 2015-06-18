AutoForm.hooks({
  addTenant: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Tenant created.');
    }
  }
});


Template.tenantList.helpers({
  tenants: function() {
    return g_Tenants.find({});
  },
  users: function() {
    return Meteor.users.find({
      group: this._id
    });
  },
});

Template.tenantList.events({
  "click #btnAddNewTenant": function(event, template) {
    Modal.show('addTenant');
  }
});

Template.tenant.events({
  "click #btnAddNewTenantUser": function(event, template) {
    Modal.show('addTenantUser', this);
  },
  "click #btnDeleteTenant": function(event, template) {
    g_Tenants.remove({
      _id: this._id
    });
  }
});

Template.user.events({
  "click #btnDeleteTenantUser": function(event, template) {
    Meteor.users.remove({
      _id: this._id
    });
  }
});
