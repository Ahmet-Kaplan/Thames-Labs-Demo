Template.user.onRendered(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

Template.tenantList.helpers({
    tenants: function () {
        return Tenants.find({});
    },
    tenantCount: function () {
        return Tenants.find({}).count();
    },
    users: function () {
        return Meteor.users.find({
            group: this._id
        });
    },
    userCount: function () {
        return Meteor.users.find({}).count();
    }
});


Template.tenant.helpers({
    userCount: function () {
        return Meteor.users.find({
            group: this._id
        }).count();
    }
});

Template.tenantList.events({
    "click #btnAddNewTenant": function (event, template) {
        Modal.show('addTenant');
    }
});

Template.tenant.events({
    "click #btnAddNewTenantUser": function (event, template) {
        Modal.show('addTenantUser', this);
    },
    "click #btnDeleteTenant": function (event, template) {
        Tenants.remove({
            _id: this._id
        });
    },
    "click #btnEditSettings": function (event, template) {
        Modal.show('updateTenantSettings', this);
    },
    'click #btnDemoData': function () {
        Meteor.call('generateDemoData', this._id);
    }
});

Template.user.helpers({
    friendlyLastLogin: function () {
        if (this.profile.lastLogin === null) {
            return "Never logged in.";
        } else {
            return "Last logged in " + moment(this.profile.lastLogin).fromNow();
        }
    }
});

Template.user.events({
    "click #btnDeleteTenantUser": function (event, template) {
        Meteor.users.remove({
            _id: this._id
        });
    }
});
