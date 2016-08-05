import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import './opportunity-details-panel.html';

Template.opportunityDetailsPanel.onCreated(function() {
  this.autorun( () => {
    // Subscribe to reactive data sources
    this.subscribe('companyById', Template.currentData().opportunity.companyId);
    this.subscribe('contactById', Template.currentData().opportunity.contactId);
  });
});

Template.opportunityDetailsPanel.helpers({
  taskOverDue: function() {
    return moment().isAfter(Template.currentData().opportunity.nextActionDue)
  },

  company: function() {
    return Companies.findOne({
      _id: Template.currentData().opportunity.companyId
    });
  },

  contact: function() {
    return Contacts.findOne({
      _id: Template.currentData().opportunity.contactId
    });
  },

  salesManager: function() {
    var user = Meteor.users.findOne({
      _id: Template.currentData().opportunity.salesManagerId
    });
    if (user) return user.profile.name;
  },

  canExportDocx: function() {
    if (bowser.safari) {
      return false;
    }
    return true;
  },

  isDetailsPage: function() {
    return FlowRouter.getRouteName() === 'opportunity';
  }

});

Template.opportunityDetailsPanel.events({

  'click #edit-opportunity': function(event) {
    event.preventDefault();
    Modal.show('editOpportunityModal', this.opportunity);
  },

  'click #reopen-opportunity': function(event) {
    event.preventDefault();
    bootbox.confirm("Are you sure you wish to reopen this opportunity?", (result) => {
      if (result === false) return;

      var user = Meteor.user();
      var note = user.profile.name + ' reopened this opportunity';
      var today = new Date();

      Opportunities.update(this.opportunity._id, {
        $unset: {
          isArchived: 1,
          hasBeenWon: 1,
          reasonLost: 1
        }
      });

      Activities.insert({
        type: 'Note',
        notes: note,
        createdAt: today,
        activityTimestamp: today,
        primaryEntityId: this.opportunity._id,
        primaryEntityType: 'opportunities',
        primaryEntityDisplayData: this.opportunity.name,
        opportunityId: this.opportunity._id,
        createdBy: user._id
      });
    });
  },

  'click #remove-opportunity': function(event) {
    event.preventDefault();
    var oppId = this.opportunity._id;

    bootbox.confirm("Are you sure you wish to delete this opportunity?", function(result) {
      if (result === true) {
        Opportunities.remove(oppId);
      }
    });
  },

});
