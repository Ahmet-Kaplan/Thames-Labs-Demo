import _ from 'lodash';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  'projects.changeMilestoneOrder': function(typeId, milestoneId, newIndex) {

    if (!this.userId) throw new Meteor.Error('Only logged in users may update project milestones');

    if (!Roles.userIsInRole(this.userId, ['Administrator'])) throw new Meteor.Error('Only users with administrator permission can move project milestones');

    var userTenant = Tenants.findOne(Meteor.user().group);
    var projectTypes = userTenant.settings.project.types;
    var typeMilestones = _.find(projectTypes, { 'id': typeId }).milestones;
    const currentMilestone = _.find(typeMilestones, { 'id': milestoneId });
    const currentIndex = _.findIndex(typeMilestones, { 'id': milestoneId });

    //Reorder array
    _.pullAt(typeMilestones, currentIndex);
    typeMilestones.splice(newIndex, 0, currentMilestone);
    _.find(projectTypes, { 'id': typeId }).milestones = typeMilestones;

    //Save changes
    Tenants.update(userTenant._id, {
      $set: {
        'settings.project.types': projectTypes
      }
    });
  }
});
