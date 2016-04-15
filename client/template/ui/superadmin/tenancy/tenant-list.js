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
    if (ServerSession.get('populatingDemoData')) {
      Modal.show('generatingDemoData');
    } else {
      Modal.hide('generatingDemoData');
    }
  })
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
        $ne: undefined
      }
    }).count();
  }
});

Template.tenantList.events({
  "click #btnAddNewTenant": function(event, template) {
    event.preventDefault();
    Modal.show('addTenant');
  },
  "click #export-tenants": function(event, template) {
    var collectionName = "tenants";
    var tenantArray = [];

    var index = Collections[collectionName].index,
      searchDefinition = index.getComponentDict().get('searchDefinition'),
      searchOptions = index.getComponentDict().get('searchOptions');

    Meteor.call('search.export', collectionName, searchDefinition, searchOptions, (err, results) => {
      if (err) {
        throw new Meteor.Error('500', err);
      }

      _.each(results, function(tenant) {
        var data = {
          name: tenant.name,
          createdAt: moment(tenant.createdAt).format('DD/MM/YYYY HH:mm'),
          plan: tenant.plan,
          companies: tenant.settings.company.defaultNumber,
          contacts: tenant.settings.contact.defaultNumber,
          opportunities: tenant.settings.opportunity.defaultNumber,
          projects: tenant.settings.project.defaultNumber,
          products: tenant.settings.product.defaultNumber,
          purchaseOrders: tenant.settings.purchaseorder.defaultNumber,
          activities: tenant.settings.activity.defaultNumber,
          tasks: tenant.settings.task.defaultNumber,
          currency: tenant.settings.currency,
          coupon: (tenant.stripe && tenant.stripe.coupon ? tenant.stripe.coupon : '')
        }

        tenantArray.push(data);
      });

      var filename = [
        'realtimecrm-',
        collectionName,
        '-export_',
        moment().format("MMM-Do-YY"),
        '.csv'
      ].join('');

      var fileData = Papa.unparse(tenantArray);

      var blob = new Blob([fileData], {
        type: "text/csv;charset=utf-8"
      });

      saveAs(blob, filename);
    });
  },
  "click #export-users": function(event, template) {
    var collectionName = "tenants";

    var index = Collections[collectionName].index,
      searchDefinition = index.getComponentDict().get('searchDefinition'),
      searchOptions = index.getComponentDict().get('searchOptions');

    Meteor.call('users.export', collectionName, searchDefinition, searchOptions, (err, results) => {
      if (err) {
        throw new Meteor.Error('500', err);
      }

      var filename = [
        'realtimecrm-users-export_',
        moment().format("MMM-Do-YY"),
        '.csv'
      ].join('');

      var fileData = Papa.unparse(results);

      var blob = new Blob([fileData], {
        type: "text/csv;charset=utf-8"
      });

      saveAs(blob, filename);
    });
  }
});