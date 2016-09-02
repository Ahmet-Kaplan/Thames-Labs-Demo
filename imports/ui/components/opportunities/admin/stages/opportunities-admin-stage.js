import './opportunities-admin-stage.html';
import './modals/update-opp-stage.js';
import _ from 'lodash';
import bootbox from 'bootbox';
import { Tenants } from '/imports/api/collections.js';

Template.opportunityAdminStage.helpers({
  isFirstStage: function() {
    const stages = Tenants.findOne({
      _id: Meteor.user().group
    }).settings.opportunity.stages.sort(function(a, b) {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });
    if (_.findIndex(stages, this) === 0) return true;
    return false;
  },
  isLastStage: function() {
    const stages = Tenants.findOne({
      _id: Meteor.user().group
    }).settings.opportunity.stages.sort(function(a, b) {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });
    const maxVal = stages.length - 1;
    if (_.findIndex(stages, this) == maxVal) return true;
    return false;
  }
});

Template.opportunityAdminStage.events({
  'click .opportunity-stage-link': function(event) {
    event.preventDefault();
    Modal.show('updateOppStage', this);
  },

  'click #delete': function(event) {
    event.preventDefault();

    const userTenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    const stages = userTenant.settings.opportunity.stages;
    const count = stages.length;
    if (count == 1) {
      bootbox.alert("You must have at least one opportunity stage.");
      return;
    }

    const id = this.id;
    Meteor.call('checkStageInUse', id, function(error, result) {
      if (error) throw new Meteor.Error(error);
      if (result === true) {
        bootbox.alert("This opportunity stage is currently in use, and cannot be deleted.");
        return;
      }
      bootbox.confirm("Are you sure you wish to delete this stage?", function(result) {
        if (result === true) {
          Meteor.call('deleteOpportunityStage', id);
        }
      });
    });
  }
});