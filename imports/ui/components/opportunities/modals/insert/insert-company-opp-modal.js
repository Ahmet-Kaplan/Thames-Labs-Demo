import './insert-company-opp-modal.html';
import { findFirstStageId } from '/imports/api/opportunities/methods.js';
import { verifyOpportunityStagesExist } from '/imports/api/opportunities/methods.js';

Template.insertCompanyOpportunityModal.onRendered(function() {
  verifyOpportunityStagesExist();
});

Template.insertCompanyOpportunityModal.helpers({
  firstStageId: function() {
    return findFirstStageId();
  },
  createdBy: function() {
    return Meteor.userId();
  },
  companyName: function() {
    return Companies.findOne(this.companyId).name;
  }
});
