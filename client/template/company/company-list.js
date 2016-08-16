import '/imports/ui/components/tags/tag-management/tag-management.js';
import '/imports/ui/components/fab/fab-add.js';
import '/imports/ui/components/search/search-results.js';
import '/imports/ui/components/search/local/small-box/small-search-box.js';

Template.companyList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadCompanies');
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
  },
  'click #export': function(event) {
    event.preventDefault();
    exportFromSearchToCSV('companies');
  }
});
