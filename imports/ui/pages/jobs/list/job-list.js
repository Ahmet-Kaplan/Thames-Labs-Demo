import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';
import '/imports/ui/components/tags/tag-management/tag-management.js';
import '/imports/ui/components/search/search-results.js';
import '/imports/ui/components/search/local/small-box/small-search-box.js';
import '/imports/ui/components/search/filters';
import '/imports/ui/components/jobs/job-list-item.js';
import '/imports/ui/components/jobs/modals/insert-job-modal.js';
import '/imports/ui/components/export/export.js';
import '/imports/ui/components/jobs/reports/overview.js';

import './job-list.html';

Template.jobsList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    permissionHelpers.redirectWithoutPermission(Meteor.userId(), 'CanReadJobs');
  });

  // Store search index dict on template to allow helpers to access
  this.index = JobsIndex;

  // Summary stats
  this.activeJobs = new ReactiveVar(0);
  this.jobTotal = new ReactiveVar(0);
  this.jobsAverage = new ReactiveVar(0);
  this.totalJobs = new ReactiveVar(0);
});

Template.jobsList.onRendered(function() {
  this.autorun(() => {
    this.totalJobs.set(Collections['jobs'].index.getComponentDict().get('count'));
  });

  $('[data-toggle="popover"]').popover({
    html: true,
    placement: "bottom",
    container: '.list-header-right'
  });

  if(!_.get(Collections['jobs'].index.getComponentDict().get('searchOptions').props, "active")) {
    Collections['jobs'].index.getComponentMethods().addProps('active', 'Yes');
  }
});

Template.jobsList.helpers({
  totalJobs: function() {
    return Template.instance().totalJobs.get();
  },
  activeJobs: function() {
    return Template.instance().activeJobs.get();
  },
  jobTotal: function() {
    return Template.instance().jobTotal.get();
  },
  jobsAverage: function() {
    return Template.instance().jobsAverage.get();
  }
});

Template.jobsList.events({
  'click #add-job': function(event) {
    event.preventDefault();
    Modal.show('insertJobModal', this);
  }
});


