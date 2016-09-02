import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import toastr from 'meteor/chrismbeckett:toastr';
import { Tenants } from '/imports/api/collections.js';

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

  'click #previous-stage': function(event) {
    event.preventDefault();

    Meteor.call(
      'opportunities.advanceStage',
      this.opportunity._id,
      -1,
      (err) => {
        if (err) return toastr.error(err.error);
      }
    );
  },

});
