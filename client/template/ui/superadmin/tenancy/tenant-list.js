Template.tenantList.onCreated(function() {

  ServerSession.set('demoDataProgress', {
    completed: 0,
    total: 0
  });
  Meteor.call('setDemoDataFlag', false);
  // Redirect if not superadmin
  this.autorun(function() {
    superAdminOnly(Meteor.userId());
  });

  //Watch for demo data generation
  this.autorun(function() {
    if(ServerSession.get('populatingDemoData')) {
      Modal.show('generatingDemoData');
    } else {
      Modal.hide('generatingDemoData');
    }
  });
});

Template.tenantList.helpers({
  tenants: function(paying) {
    return Tenants.find({
      "plan": 'pro',
      'stripe.stripeSubs': {
        $exists: true
      }
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
        $ne: void 0
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