Template.tenantList.onCreated(function() {
  Meteor.call('setDemoDataFlag', false);
  // Redirect if not superadmin
  this.autorun(function() {
    superAdminOnly(Meteor.userId());
  });
});

Template.tenantList.helpers({
  tenants: function(paying) {
    var payingTenant = (paying === "true") ? true : false;
    return Tenants.find({
      "stripe.paying": payingTenant
    }, {
      sort: {
        name: 1
      }
    });
  },
  tenantCount: function() {
    return Tenants.find({}).count();
  },
  userCount: function() {
    return Meteor.users.find({
      group: {
        $ne: undefined
      }
    }).count();
  }
});

Template.tenantList.events({
  "click #btnAddNewTenant": function(event, template) {
    event.preventDefault();
    Modal.show('addTenant');
  }
});