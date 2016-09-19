import '/imports/ui/components/search/local/box/search-box.js';
import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';
import '/imports/ui/components/super-admin/demo-data/demo-data-generator.js';
import '/imports/ui/components/super-admin/demo-data/modals/generating-demo-data.js';
import '/imports/ui/components/super-admin/tenants/tenant-list-item.js';
import '/imports/ui/components/super-admin/tenants/modals/insert-tenant.js';
import './tenant-list.html';
import { Tenants } from '/imports/api/collections.js';

Template.tenantList.onCreated(function() {

  ServerSession.set('demoDataProgress', {
    completed: 0,
    total: 0
  });
  Meteor.call('setDemoDataFlag', false);
  // Redirect if not superadmin
  this.autorun(function() {
    permissionHelpers.superAdminOnly(Meteor.userId());
  });

  //Watch for demo data generation
  this.autorun(function() {
    if (ServerSession.get('populatingDemoData')) {
      Modal.show('generatingDemoData');
    } else {
      Modal.hide('generatingDemoData');
    }
  });
});

Template.tenantList.helpers({
  tenants: function(paying) {
    return Tenants.find({
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
    Modal.show('insertTenant');
  },
  "click #export-tenants": function(event, template) {
    var collectionName = "tenants";

    var index = Collections[collectionName].index;
    var searchDefinition = index.getComponentDict().get('searchDefinition');
    var searchOptions = index.getComponentDict().get('searchOptions');

    toastr.info("Exporting, please wait...", "RealTimeCRM", {
      timeOut: 6000,
      closeButton: false,
      "debug": false,
      "newestOnTop": true,
      "positionClass": "toast-bottom-right",
      "preventDuplicates": true,
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    });

    Meteor.call('search.export', collectionName, searchDefinition, searchOptions, (err, results) => {
      if (err) {
        throw new Meteor.Error('500', err);
      }
      Meteor.call('tenant.getExportData', results, function(err, res) {
        if(err) throw new Meteor.Error(err);
        var filename = [
          'realtimecrm-',
          collectionName,
          '-export_',
          moment().format("MMM-Do-YY"),
          '.csv'
        ].join('');

        var fileData = Papa.unparse(res);

        var blob = new Blob([fileData], {
          type: "text/csv;charset=utf-8"
        });

        toastr.clear();
        saveAs(blob, filename);
      });
    });
  },
  "click #export-users": function(event, template) {
    var collectionName = "tenants";

    var index = Collections[collectionName].index;
    var searchDefinition = index.getComponentDict().get('searchDefinition');
    var searchOptions = index.getComponentDict().get('searchOptions');

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
