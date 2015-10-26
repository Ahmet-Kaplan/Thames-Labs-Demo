Template.oppsOverviewWidget.onCreated(function() {
  this.totalOpps = new ReactiveVar(0);
  this.totalOppValue = new ReactiveVar(0);
  this.averageOppValue = new ReactiveVar(0);
});

Template.oppsOverviewWidget.onRendered(function() {
  var template = this;

  Meteor.call('report.numberOfOpportunities', function(err, data) {
    template.totalOpps.set(data.Count);
  });
  Meteor.call('report.valueOfOpportunities', function(err, data) {
    template.totalOppValue.set(data.Value);
  });
  Meteor.call('report.averageOpportunityValue', function(err, data) {
    template.averageOppValue.set(data.Value);
  });
});

Template.oppsOverviewWidget.events({
  'click #ref_oppsOverviewWidget': function(event, template) {

      Meteor.call('report.numberOfOpportunities', function(err, data) {
        template.totalOpps.set(data.Count);
      });
      Meteor.call('report.valueOfOpportunities', function(err, data) {
        template.totalOppValue.set(data.Value);
      });
      Meteor.call('report.averageOpportunityValue', function(err, data) {
        template.averageOppValue.set(data.Value);
      });
  }
});

Template.oppsOverviewWidget.helpers({
  totalOpps: function() {
    return Template.instance().totalOpps.get();
  },
  totalOppValue: function() {
    return Template.instance().totalOppValue.get();
  },
  averageOppValue: function() {
    return Template.instance().averageOppValue.get();
  }
});
