import './modals/update-job-type.js';

import '../milestones/job-milestone.js';
import '../milestones/modals/insert-job-milestone.js';

import './job-type.html';

import 'meteor/mrt:jquery-ui-sortable';
import { Blaze } from 'meteor/blaze';
import bootbox from 'bootbox';

Template.jobType.onRendered(function() {
  const typeId = this.data.id;
  $(`#milestone-list-${typeId}`).sortable({
    handle: '.handle',
    axis: 'y',
    stop: function(event, ui) {
      //Setup needed variables
      const milestoneId = Blaze.getData(ui.item[0]).id;
      const newIndex = $(this).find('.job-milestone').index(ui.item);

      //Update data stores
      Meteor.call('jobs.changeMilestoneOrder', typeId, milestoneId, newIndex);

      //Prevent DOM updates to let Meteor + Blaze handle it
      $(this).sortable('cancel');
    }
  });
});

Template.jobType.events({
  'click #addMilestone': function(event) {
    event.preventDefault();
    Modal.show('insertJobMilestone', this);
  },
  'click #editType': function(event) {
    event.preventDefault();
    Modal.show('updateJobType', this);
  },
  'click #removeType': function(event) {
    event.preventDefault();

    const typeId = this.id;

    bootbox.confirm("Are you sure you wish to delete this job type?", function(result) {
      if (result === true) {

        Meteor.call('typeIsInUse', typeId, function(err, res) {
          if (err) throw new Meteor.Error(err);
          if (res.exitStatus === true) {
            toastr.error('This job type is currently in use, and cannot be deleted.');
          } else {
            Meteor.call('removeJobType', typeId, function(error, result) {
              if (error) throw new Meteor.Error(error);
              if (result.exitCode === 0) {
                toastr.success('Job type deleted successfully.');
              } else {
                toastr.error(`Job type not deleted: ${result.exitStatus}`);
              }
            });
          }
        });

        bootbox.hideAll();
      }
    });
  }
});