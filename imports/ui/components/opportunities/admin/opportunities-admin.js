import './opps-add-stage.js';
import './opps-edit-stage.js';
import './opportunities-admin.css';
import './opportunities-admin.html';

import _ from 'lodash';
import 'meteor/mrt:jquery-ui-sortable';
import { Blaze } from 'meteor/blaze';


Template.opportunitiesAdmin.onRendered(function() {
  $('#opp-stages').sortable({
    handle: '.opportunity-stage-handle',
    stop: function(event, ui) {
      //Setup needed variables
      const stageId = Blaze.getData(ui.item[0]).id;
      const newIndex = $(this).find('.opportunity-stage').index(ui.item);

      //Update data stores
      Meteor.call('changeStageOrder', stageId, newIndex);

      //Prevent DOM updates to let Meteor + Blaze handle it
      $(this).sortable('cancel');
    }
  });
});

Template.opportunitiesAdmin.onCreated(function() {
  this.stages = new ReactiveVar();
  this.autorun(() => {
    var currentStages = Tenants.findOne({
      _id: Meteor.user().group
    }).settings.opportunity.stages;
    this.stages.set(currentStages);
  });
});

Template.opportunitiesAdmin.helpers({
  stages: function() {
    return Template.instance().stages.get();
  },
  hasStages: function() {
    var userTenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (!userTenant || !userTenant.settings) return false;
    var stages = userTenant.settings.opportunity.stages;
    if (!stages) return false;
    return stages.length > 0;
  },
  options: {
    sort: true,
    sortField: 'order'
  }
});

Template.opportunitiesAdmin.events({
  'click #btnAddStage': function(event) {
    event.preventDefault();

    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To create your own opportunity stages');
      return;
    }

    Modal.show('insertNewStageModal', this);
  }
});

Template.opportunityAdminStage.helpers({
  isFirstStage: function() {
    var stages = Tenants.findOne({
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
    var stages = Tenants.findOne({
      _id: Meteor.user().group
    }).settings.opportunity.stages.sort(function(a, b) {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });
    var maxVal = stages.length - 1;
    if (_.findIndex(stages, this) == maxVal) return true;
    return false;
  }
});

Template.opportunityAdminStage.events({
  'click .opportunity-stage': function(event) {
    event.preventDefault();
    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To edit your opportunity stages');
      return;
    }
    Modal.show('editStageModal', this);
  },

  'click #btnDelete': function(event) {
    event.preventDefault();

    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To delete your opportunity stages');
      return;
    }

    var userTenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    var stages = userTenant.settings.opportunity.stages;
    var count = stages.length;
    if (count == 1) {
      bootbox.alert("You must have at least one opportunity stage.");
      return;
    }

    var id = this.id;
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