import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';

import '/imports/ui/components/bulk-management/bulk-management.js';
import '/imports/ui/components/companies/company-list-item.js';
import '/imports/ui/components/tags/tag-management/tag-management.js';
import '/imports/ui/components/activity/activity-management/activity-management.js';
import '/imports/ui/components/fab/fab-add.js';
import '/imports/ui/components/import/import.js';
import '/imports/ui/components/search/filters';
import '/imports/ui/components/search/search-results.js';
import '/imports/ui/components/search/local/small-box/small-search-box.js';
import '/imports/ui/components/export/export.js';

import './company-list.css';
import './company-list.html';

Template.companyList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    permissionHelpers.redirectWithoutPermission(Meteor.userId(), 'CanReadCompanies');
  });
});

Template.companyList.events({
  'click #add-company': function(event) {
    event.preventDefault();
    Modal.show('insertCompanyModal', this);
  }
});
