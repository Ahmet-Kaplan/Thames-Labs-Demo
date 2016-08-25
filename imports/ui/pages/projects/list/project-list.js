import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';
import '/imports/ui/components/tags/tag-management/tag-management.js';
import '/imports/ui/components/projects/project-list-item.js';
import '/imports/ui/components/projects/modals/insert-project-modal.js';
import '/imports/ui/components/import/import.js';
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

  this.totalProjects = new ReactiveVar(0);
});

Template.projectsList.onRendered(function() {
  this.autorun(() => {
    this.totalProjects.set(Collections['projects'].index.getComponentDict().get('count'));
  });

  // Watch for session variable setting search
  Session.set('projectListSearchQuery', null);
  this.autorun(function() {
    const searchQuery = Session.get('projectListSearchQuery');
    if (searchQuery) {
      ProjectsIndex.getComponentMethods().search(searchQuery);
      $('.stick-bar input').val(searchQuery);
    }
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
  projectCount: function() {
    return Template.instance().totalProjects.get();
  },
  hasMultipleProjects: function() {
    return Template.instance().totalProjects.get() !== 1;
  }
});

Template.projectsList.events({
  'click #add-project': function(event) {
    event.preventDefault();
    Modal.show('insertProjectModal', this);
  }
});


