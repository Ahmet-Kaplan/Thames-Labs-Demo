Template.opportunityInformationWidget.onCreated(function() {
  this.totalOpps = new ReactiveVar(0);
  this.totalOppValue = new ReactiveVar(0);
  this.averageOppValue = new ReactiveVar(0);
});

Template.opportunityInformationWidget.onRendered(function() {
  var template = this;

  Meteor.call('rptNumberOfOpportunities', function(err, data) {
    template.totalOpps.set(data.Count);
  });
  Meteor.call('rptValueOfOpportunities', function(err, data) {
    console.log(data);
    template.totalOppValue.set(data.Value);
  });
  Meteor.call('rptAverageOpportunityValue', function(err, data) {
    console.log(data);
    template.averageOppValue.set(data.Value);
  });
});

Template.opportunityInformationWidget.events({
  'click #ref_opportunityInformationWidget': function(event, template) {

      Meteor.call('rptNumberOfOpportunities', function(err, data) {
        template.totalOpps.set(data.Count);
      });
      Meteor.call('rptValueOfOpportunities', function(err, data) {
        template.totalOppValue.set(data.Value);
      });
      Meteor.call('rptAverageOpportunityValue', function(err, data) {
        template.averageOppValue.set(data.Value);
      });
  }
});

Template.opportunityInformationWidget.helpers({
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
