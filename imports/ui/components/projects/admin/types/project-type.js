import './modals/update-project-type.js';

import '../milestones/project-milestone.js';
import '../milestones/modals/insert-project-milestone.js';

import './project-type.html';

import 'meteor/mrt:jquery-ui-sortable';
import { Blaze } from 'meteor/blaze';
import bootbox from 'bootbox';

Template.projectType.onRendered(function() {
  const typeId = this.data.id;
  $(`#milestone-list-${typeId}`).sortable({
    handle: '.handle',
    axis: 'y',
    stop: function(event, ui) {
      //Setup needed variables
      const milestoneId = Blaze.getData(ui.item[0]).id;
      const newIndex = $(this).find('.project-milestone').index(ui.item);

      //Update data stores
      Meteor.call('projects.changeMilestoneOrder', typeId, milestoneId, newIndex);

      //Prevent DOM updates to let Meteor + Blaze handle it
      $(this).sortable('cancel');
    }
  });
});

Template.projectType.events({
  'click #addMilestone': function(event) {
    event.preventDefault();
    Modal.show('insertProjectMilestone', this);
  },
  'click #editType': function(event) {
    event.preventDefault();
    Modal.show('updateProjectType', this);
  },
  'click #removeType': function(event) {
    event.preventDefault();

    const typeId = this.id;

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
                toastr.error(`Project type not deleted: ${result.exitStatus}`);
              }
            });
          }
        });

        bootbox.hideAll();
      }
    });
  }
});