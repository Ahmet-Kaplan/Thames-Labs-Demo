import './insert-company-opp-modal.html';
import '/imports/ui/components/autosuggest/autosuggest.js';
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

AutoForm.hooks({
  insertCompanyOpportunityForm: {
    onSuccess: function() {
      toastr.success('Opportunity added.');
      Modal.hide();
    },
    after: {
      insert: function(error, result) {
        if (error) {
          toastr.error('Opportunity creation error: ' + error);
          return false;
        }

        FlowRouter.go('/opportunities/' + result);
      }
    },
    onError: function(formType, error) {
      toastr.error('Opportunity creation error: ' + error);
    }
  }
});
