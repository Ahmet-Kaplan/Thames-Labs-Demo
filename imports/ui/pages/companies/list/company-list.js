import './company-list.html';
import '/imports/ui/components/companies/company-list-item.js';
import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';
import '/imports/ui/components/tags/tag-management/tag-management.js';
import '/imports/ui/components/fab/fab-add.js';
import '/imports/ui/components/export/export.js';

Template.companyList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    permissionHelpers.redirectWithoutPermission(Meteor.userId(), 'CanReadCompanies');
  });

  this.totalCompanies = new ReactiveVar(0);
});

Template.companyList.onRendered(function() {
  this.autorun(() => {
    this.totalCompanies.set(Collections['companies'].index.getComponentDict().get('count'));
  });
});

Template.companyList.helpers({
  companyCount: function() {
    return Template.instance().totalCompanies.get();
  },
  hasMultipleCompanies: function() {
    return Template.instance().totalCompanies.get() !== 1;
  }
});

Template.companyList.events({
  'click #add-company': function(event) {
    event.preventDefault();
    Modal.show('insertCompanyModal', this);
  }
});
