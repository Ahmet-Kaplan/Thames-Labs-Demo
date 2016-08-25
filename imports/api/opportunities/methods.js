import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Opportunities } from '/imports/api/collections.js';

Meteor.methods({

  'opportunities.advanceStage': function(id, stagesToAdvance) {
    // Called to advance / retreat a stage by stagesToAdvance steps

    check(id, String);
    check(stagesToAdvance, Match.Integer);
    if (!this.userId) throw new Meteor.Error('Only logged in users may update opportunity stage');
    if (!Roles.userIsInRole(this.userId, ['CanEditOpportunities'])) throw new Meteor.Error('Only users with permission to edit opportunities can move opportunity stage');

    const tenant = Tenants.findOne(Meteor.user().group),
          stages = _.get(tenant, 'settings.opportunity.stages');
    if (!stages) throw new Meteor.Error('Opportunity stages not found');

    const opportunity = Opportunities.findOne(id);
    if (!opportunity) throw new Meteor.Error('Opportunity not found');

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

    if (!this.userId) throw new Meteor.Error('Only logged in users may update opportunity stage');
    if (!Roles.userIsInRole(this.userId, ['CanEditOpportunities'])) throw new Meteor.Error('Only users with permission to edit opportunities can move opportunity stage');

    const tenant = Tenants.findOne(Meteor.user().group),
          stages = _.get(tenant, 'settings.opportunity.stages');
    if (!stages) throw new Meteor.Error('Opportunity stages not found');

    const opportunity = Opportunities.findOne(id);
    if (!opportunity) throw new Meteor.Error('Opportunity not found');

    const newStage = _.find(stages, { id: stageId });
    check(newStage, Object);

    Opportunities.update(opportunity._id, { $set: { currentStageId: newStage.id } });

    return;
  },


  'opportunities.changeStageOrder': function(stageId, newIndex) {

    if (!this.userId) throw new Meteor.Error('Only logged in users may update opportunity stages');

    if (!Roles.userIsInRole(this.userId, ['Administrator'])) throw new Meteor.Error('Only users with administrator permission can move opportunity stage');

    var userTenant = Tenants.findOne(Meteor.user().group);
    var currentStages = userTenant.settings.opportunity.stages;
    const currentStage = _.find(currentStages, { 'id': stageId });
    const currentIndex = _.findIndex(currentStages, { 'id': stageId });

    //Reorder array
    _.pullAt(currentStages, currentIndex);
    currentStages.splice(newIndex, 0, currentStage);

    //Update order field for timeline on opp page
    _.each(currentStages, function(value, key) {
      value.order = key;
    });

    //Save changes
    Tenants.update(userTenant._id, {
      $set: {
        'settings.opportunity.stages': currentStages
      }
    });
  }

});

export function verifyOpportunityStagesExist() {
  if (FlowRouter.subsReady()) {
    const userTenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (userTenant) {
      const stages = userTenant.settings.opportunity.stages;
      if (!stages || stages.length === 0) {
        Meteor.call("createDefaultOpportunityStages");
      }
    }
  }
}

export function findFirstStageId() {
  const userTenant = Tenants.findOne({
          _id: Meteor.user().group
        }),
        stages = userTenant.settings.opportunity.stages,
        id = _.result(_.find(stages, function(stg) {
          return stg.order === 0;
        }), 'id');

  if (!stages || stages.length === 0) return null;
  return id;
}
