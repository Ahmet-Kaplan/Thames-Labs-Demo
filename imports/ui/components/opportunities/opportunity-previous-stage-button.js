import _ from 'lodash';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './opportunity-previous-stage-button.html';

Template.opportunityPreviousStageButton.helpers({

  isFirstStage: function() {
    var stages = Tenants.findOne({
      _id: Meteor.user().group
    }).settings.opportunity.stages;
    var currentStageId = this.opportunity.currentStageId;
    var firstStageId = stages[0].id;
    if (currentStageId == firstStageId) return true;
    return false;
  },

});

Template.opportunityPreviousStageButton.events({

  'click #previous-stage': function() {
    var userTenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    var stages = userTenant.settings.opportunity.stages;
    var currId = this.opportunity.currentStageId;
    var currOrder = _.findIndex(stages, {
      id: currId
    });
    var nextId = stages[currOrder - 1].id;

    if (nextId < 0) nextId = 0;

    Opportunities.update(this.opportunity._id, {
      $set: {
        currentStageId: nextId
      }
    });
    var user = Meteor.user();
    var note = user.profile.name + ' moved this opportunity from stage "' + stages[currId].title + '" back to stage "' + stages[nextId].title + '"';
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

})
