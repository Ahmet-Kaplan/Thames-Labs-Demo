import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';
import '/imports/ui/components/tags/tag-management/tag-management.js';
import '/imports/ui/components/search/search-results.js';
import '/imports/ui/components/search/local/small-box/small-search-box.js';
import '/imports/ui/components/search/filters';
import '/imports/ui/components/projects/project-list-item.js';
import '/imports/ui/components/projects/modals/insert-project-modal.js';
import '/imports/ui/components/export/export.js';
import '/imports/ui/components/projects/reports/overview.js';

import './project-list.html';

Template.projectsList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    permissionHelpers.redirectWithoutPermission(Meteor.userId(), 'CanReadProjects');
  });

  // Store search index dict on template to allow helpers to access
  this.index = ProjectsIndex;

  // Summary stats
  this.activeProjects = new ReactiveVar(0);
  this.projectTotal = new ReactiveVar(0);
  this.projectsAverage = new ReactiveVar(0);
  this.totalProjects = new ReactiveVar(0);
});

Template.projectsList.onRendered(function() {
  this.autorun(() => {
    this.totalProjects.set(Collections['projects'].index.getComponentDict().get('count'));
  });

  $('[data-toggle="popover"]').popover({
    html: true,
    placement: "bottom",
    container: '.list-header-right'
  });

  if(!_.get(Collections['projects'].index.getComponentDict().get('searchOptions').props, "active")) {
    Collections['projects'].index.getComponentMethods().addProps('active', 'Yes');
  }
});

Template.projectsList.helpers({
  totalProjects: function() {
    return Template.instance().totalProjects.get();
  },
  activeProjects: function() {
    return Template.instance().activeProjects.get();
  },
  projectTotal: function() {
    return Template.instance().projectTotal.get();
  },
  projectsAverage: function() {
    return Template.instance().projectsAverage.get();
  }
});

Template.projectsList.events({
  'click #add-project': function(event) {
    event.preventDefault();
    Modal.show('insertProjectModal', this);
  }
});


