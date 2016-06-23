import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Roles } from 'meteor/alanning:roles';

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
    var userTenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    var stages = userTenant.settings.opportunity.stages;
    var length = stages.length - 1;
    var currId = this.opportunity.currentStageId;
    var currOrder = _.findIndex(stages, {
      id: currId
    });
    var nextId = stages[currOrder + 1].id;

    if (nextId > length) nextId = length;

    Opportunities.update(this.opportunity._id, {
      $set: {
        currentStageId: nextId
      }
    });
    var user = Meteor.user();
    var note = user.profile.name + ' moved this opportunity forward from stage "' + stages[currId].title + '" to stage "' + stages[nextId].title + '"';
    var date = new Date();
    Activities.insert({
      type: 'Note',
      notes: note,
      createdAt: date,
      activityTimestamp: date,
      opportunityId: this.opportunity._id,
      primaryEntityId: this.opportunity._id,
      primaryEntityType: 'opportunities',
      primaryEntityDisplayData: this.opportunity.name,
      createdBy: user._id
    });
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
