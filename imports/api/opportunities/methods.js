import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

Meteor.methods({

  'opportunities.advanceStage': function(id, stagesToAdvance) {
    // Called to advance / retreat a stage by stagesToAdvance steps

    check(id, String);
    check(stagesToAdvance, Match.Integer);
    if (!this.userId) throw new Meteor.error('Only logged in users may update opportunity stage');

    const tenant = Tenants.findOne(Meteor.user().group),
          stages = _.get(tenant, 'settings.opportunity.stages');
    if (!stages) throw new Meteor.error('Opportunity stages not found');

    const opportunity = Opportunities.findOne(id);
    if (!opportunity) throw new Meteor.error('Opportunity not found');

    const currentIndex = _.findIndex(stages, { id: opportunity.currentStageId }),
          newIndex = currentIndex + stagesToAdvance,
          newStage = stages[newIndex];
    check(newStage, Object);

    Opportunities.update(opportunity._id, { $set: { currentStageId: newStage.id } });

    return;
  },

  'opportunities.setStage': function(id, stageId) {
    // Called to set an opportunity to a specific stage, checks for existence first
    check(id, String);
    check(stageId, Match.Integer);

    if (!this.userId) throw new Meteor.error('Only logged in users may update opportunity stage');

    const tenant = Tenants.findOne(Meteor.user().group),
          stages = _.get(tenant, 'settings.opportunity.stages');
    if (!stages) throw new Meteor.error('Opportunity stages not found');

    const opportunity = Opportunities.findOne(id);
    if (!opportunity) throw new Meteor.error('Opportunity not found');

    const newStage = _.find(stages, { id: stageId });
    check(newStage, Object);

    Opportunities.update(opportunity._id, { $set: { currentStageId: newStage.id } });

    return;
  }

});
