import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './opportunity-lost-link.html';

Template.opportunityLostLink.events({

  'click #lost-opportunity': function(event) {
    event.preventDefault();
    const opportunity = this.opportunity;
    bootbox.prompt("Are you sure you wish to mark this opportunity as lost? To continue, give a reason below and press OK, otherwise press Cancel.", function(result) {
      if (result !== null) {
        Opportunities.update(opportunity._id, {
          $set: {
            isArchived: true,
            hasBeenWon: false,
            reasonLost: result
          }
        });
        var user = Meteor.user();
        var note = user.profile.name + ' marked this opportunity as lost';
        if (result) {
          note += ": <br />" + result;
        }
        var date = new Date();
        Activities.insert({
          type: 'Note',
          notes: note,
          createdAt: date,
          activityTimestamp: date,
          primaryEntityId: opportunity._id,
          primaryEntityType: 'opportunities',
          primaryEntityDisplayData: opportunity.name,
          opportunityId: opportunity._id,
          createdBy: user._id
        });
      }
    });
  },

});
