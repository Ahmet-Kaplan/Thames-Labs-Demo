import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Roles } from 'meteor/alanning:roles';
import toastr from 'meteor/chrismbeckett:toastr';

import './opportunity-next-stage-button.html';

Template.opportunityNextStageButton.helpers({

  isLastStage: function() {
    var stages = Tenants.findOne({
      _id: Meteor.user().group
    }).settings.opportunity.stages;
    var currentStageId = this.opportunity.currentStageId;
    var lastStageId = stages[stages.length - 1].id;
    if (currentStageId == lastStageId) return true;
    return false;
  },

});

Template.opportunityNextStageButton.events({

  'click #next-stage': function(event) {
    event.preventDefault();

    Meteor.call(
      'opportunities.advanceStage',
      this.opportunity._id,
      1,
      (err, res) => { if (err) return toastr.error(err); }
    );
  },

  'click #won-opportunity': function(event) {
    event.preventDefault();
    var opp = this.opportunity;
    var selectOptions = Tenants.findOne({
      _id: Meteor.user().group
    }).settings.project.types.map(function(t) {
      return {
        label: t.name,
        value: t.id
      };
    });
    var selectDisplay = "<select id='selectedProjectType' style='margin-left:10px;'>";
    var firstFlag = true;
    _.each(selectOptions, function(d) {
      selectDisplay += "<option value='" + d.value + "'" + (firstFlag === true ? " selected" : "") + ">" + d.label + "</option>";
      firstFlag = false;
    });
    selectDisplay += "</select>";

    bootbox.dialog({
      title: "Confirm action",
      message: '<div class="row">  ' +
        '<div class="col-md-12"> ' +
        '<p>Are you sure you wish to mark this opportunity as won? This action will create a new project, and is not reversible.</p>' +
        '<form class="form-horizontal"> ' +
        '<div class="form-group"> ' +
        '<label class="control-label" for="selectedProjectType" style="margin-left:15px;">Project Type</label> ' +
        selectDisplay +
        '</div> ' +
        '</form> </div>  </div>',
      buttons: {
        cancel: {
          label: "Cancel",
          className: "btn-default",
          callback: function() {}
        },
        success: {
          label: "OK",
          className: "btn-primary",
          callback: function() {
            var type = $('#selectedProjectType').val();

            Meteor.call('winOpportunity', opp, parseInt(type, 10), function(err, id) {
              if (Roles.userIsInRole(Meteor.userId(), ['CanReadProjects'])) {
                FlowRouter.go('/projects/' + id);
              }
            });

          }
        }
      }
    });
  },

});
