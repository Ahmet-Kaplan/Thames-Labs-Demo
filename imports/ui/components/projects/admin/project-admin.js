import './project-admin.html';
import './types/modals/insert-project-type.js';
import './types/project-type.js';
import { Tenants } from '/imports/api/collections.js';

Template.projectAdmin.helpers({
  projectTypes: function() {
    //if (!Meteor.user()) return;
    return Tenants.findOne({
      _id: Meteor.user().group
    }).settings.project.types;
  }
});

Template.projectAdmin.events({
  'click #addProjectType': function(event) {
    event.preventDefault();

    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To create your own project types');
      return;
    }

    Modal.show('insertProjectType');
  }
});
