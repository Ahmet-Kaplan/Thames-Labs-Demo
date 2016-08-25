import { Meteor } from 'meteor/meteor';
import './overview.html';

export const setValues = (template) => {
  Meteor.call('report.openOpportunities', (err, data) => {
    template.openOpps.set(data);
  });
  Meteor.call('report.archivedOpportunities', (err, data) => {
    template.archivedOpps.set(data);
  });
  Meteor.call('report.wonOpportunities', (err, data) => {
    template.wonOpps.set(data);
  });
  Meteor.call('report.lostOpportunities', (err, data) => {
    template.lostOpps.set(data);
  });
  Meteor.call('report.valueOfOpportunities', (err, data) => {
    template.totalOppValue.set(data);
  });
  Meteor.call('report.averageOpportunityValue', (err, data) => {
    template.averageOppValue.set(data);
  });
};

Template.oppOverview.onCreated(function() {
  this.openOpps = new ReactiveVar(0);
  this.archivedOpps = new ReactiveVar(0);
  this.wonOpps = new ReactiveVar(0);
  this.lostOpps = new ReactiveVar(0);
  this.totalOppValue = new ReactiveVar(0);
  this.averageOppValue = new ReactiveVar(0);
});

Template.oppOverview.onRendered(function() {
  setValues(this);
});

Template.oppOverview.helpers({
  dashboard: function() {
    return FlowRouter.getRouteName() === "dashboard";
  },
  openOpps: function() {
    return Template.instance().openOpps.get();
  },
  archivedOpps: function() {
    return Template.instance().archivedOpps.get();
  },
  wonOpps: function() {
    return Template.instance().wonOpps.get();
  },
  lostOpps: function() {
    return Template.instance().lostOpps.get();
  },
  totalOppValue: function() {
    return Template.instance().totalOppValue.get();
  },
  averageOppValue: function() {
    return Template.instance().averageOppValue.get();
  }
});

Template.oppOverview.events({
  'click #oppsOverviewWidget': function(event, template) {
    setValues(template);
  }
});
