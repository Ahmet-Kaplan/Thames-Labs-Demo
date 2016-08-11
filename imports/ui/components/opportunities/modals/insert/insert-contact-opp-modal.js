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