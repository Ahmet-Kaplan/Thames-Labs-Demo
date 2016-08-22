import './insert-opportunity-modal.html';
import { findFirstStageId } from '/imports/api/opportunities/methods.js';
import { verifyOpportunityStagesExist } from '/imports/api/opportunities/methods.js';

Template.insertOpportunityModal.onRendered(function() {
  Session.set('oppComp', null);
  verifyOpportunityStagesExist();
});

Template.insertOpportunityModal.helpers({
  firstStageId: function() {
    return findFirstStageId();
  },
  createdBy: function() {
    return Meteor.userId();
  }
});

Template.insertOpportunityModal.events({
  'change #selectedCompany': function() {
    const c = $('select#selectedCompany').val();
    if (c) {
      Session.set('oppComp', c);
      Meteor.subscribe('contactsByCompanyId', c);
    } else {
      Meteor.subscribe('allContacts', c);
      Session.set('oppComp', null);
    }
  }
});

AutoForm.hooks({
  insertOpportunityForm: {
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
