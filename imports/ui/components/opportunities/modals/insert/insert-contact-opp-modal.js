import './insert-contact-opp-modal.html';
import { findFirstStageId } from '/imports/api/opportunities/methods.js';
import { verifyOpportunityStagesExist } from '/imports/api/opportunities/methods.js';

Template.insertContactOpportunityModal.onRendered(function() {
  verifyOpportunityStagesExist();
});

Template.insertContactOpportunityModal.helpers({
  firstStageId: function() {
    return findFirstStageId();
  },
  createdBy: function() {
    return Meteor.userId();
  },
  companyName: function() {
    return Companies.findOne({
      _id: this.companyId
    }).name;
  },
  contactName: function() {
    const contact = Contacts.findOne(this.contactId);
    return `${contact.forename} ${contact.surname}`;
  }
});

AutoForm.hooks({
  insertContactOpportunityForm: {
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
