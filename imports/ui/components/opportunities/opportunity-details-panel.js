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

});
