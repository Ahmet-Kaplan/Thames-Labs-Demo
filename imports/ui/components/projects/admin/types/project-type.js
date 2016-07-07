import './modals/update-project-type.js';

import '../milestones/project-milestone.js';
import '../milestones/modals/insert-project-milestone.js';

import './project-type.html';

import 'meteor/mrt:jquery-ui-sortable';
import { Blaze } from 'meteor/blaze';

Template.projectType.onRendered(function() {
  const typeId = this.data.id;
  $('#milestone-list-' + this.data.id).sortable({
    handle: '.project-milestone-handle',
    stop: function(event, ui) {
      //Setup needed variables
      const milestoneId = Blaze.getData(ui.item[0]).id;
      const newIndex = $(this).find('.project-milestone').index(ui.item);

      //Update data stores
      Meteor.call('changeMilestoneOrder', typeId, milestoneId, newIndex);

      //Prevent DOM updates to let Meteor + Blaze handle it
      $(this).sortable('cancel');
    }
  });
});

Template.projectType.events({
  'click #addMilestone': function(event) {
    event.preventDefault();
    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To create your own project type milestones');
      return;
    }

    Modal.show('createProjectMilestone', this);
  },
  'click #editType': function(event) {
    event.preventDefault();
    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To edit your project types');
      return;
    }
    Modal.show('updateProjectType', this);
  },
  'click #removeType': function(event) {
    event.preventDefault();
    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To delete your project types');
      return;
    }

    var typeId = this.id;

    bootbox.confirm("Are you sure you wish to delete this project type?", function(result) {
      if (result === true) {

        Meteor.call('typeIsInUse', typeId, function(err, res) {
          if (err) throw new Meteor.Error(err);
          if (res.exitStatus === true) {
            toastr.error('This project type is currently in use, and cannot be deleted.');
          } else {
            Meteor.call('removeProjectType', typeId, function(error, result) {
              if (error) throw new Meteor.Error(error);
              if (result.exitCode === 0) {
                toastr.success('Project type deleted successfully.');
              } else {
                toastr.error('Project type not deleted: ' + result.exitStatus);
              }
            });
          }
        });

        bootbox.hideAll();
      }
    });
  }
});