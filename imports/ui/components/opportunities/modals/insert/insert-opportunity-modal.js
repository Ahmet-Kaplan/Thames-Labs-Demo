import './insert-opportunity-modal.html';
import { findFirstStageId } from '/imports/api/opportunities/methods.js';
import { verifyOpportunityStagesExist } from '/imports/api/opportunities/methods.js';

Template.insertOpportunityModal.onRendered(function() {
  this.oppComp = new ReactiveVar();
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
      Template.instance().oppComp.set(c);
      Meteor.subscribe('contactsByCompanyId', c);
    } else {
      Template.instance().oppComp.set();
      Meteor.subscribe('allContacts', c);
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
