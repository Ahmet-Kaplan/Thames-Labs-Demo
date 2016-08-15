Template.opportunityInformationWidget.onCreated(function() {
  this.openOpps = new ReactiveVar(0);
  this.archivedOpps = new ReactiveVar(0);
  this.totalOppValue = new ReactiveVar(0);
  this.averageOppValue = new ReactiveVar(0);
});

Template.opportunityInformationWidget.onRendered(function() {
  const template = this;

  Meteor.call('report.openOpportunities', function(err, data) {
    template.openOpps.set(data.Count);
  });
  Meteor.call('report.archivedOpportunities', function(err, data) {
    template.archivedOpps.set(data.Count);
  });
  Meteor.call('report.valueOfOpportunities', function(err, data) {
    template.totalOppValue.set(data.Value);
  });
  Meteor.call('report.averageOpportunityValue', function(err, data) {
    template.averageOppValue.set(data.Value);
  });
});

Template.opportunityInformationWidget.events({
  'click #ref_opportunityInformationWidget': function(event, template) {

    Meteor.call('report.openOpportunities', function(err, data) {
      template.openOpps.set(data.Count);
    });
    Meteor.call('report.archivedOpportunities', function(err, data) {
      template.archivedOpps.set(data.Count);
    });
    Meteor.call('report.valueOfOpportunities', function(err, data) {
      template.totalOppValue.set(data.Value);
    });
    Meteor.call('report.averageOpportunityValue', function(err, data) {
      template.averageOppValue.set(data.Value);
    });
  }
});

Template.opportunityInformationWidget.helpers({
  openOpps: function() {
    return Template.instance().openOpps.get();
  },
  archivedOpps: function() {
    return Template.instance().archivedOpps.get();
  },
  totalOppValue: function() {
    return Template.instance().totalOppValue.get();
  },
  averageOppValue: function() {
    return Template.instance().averageOppValue.get();
  }
});
