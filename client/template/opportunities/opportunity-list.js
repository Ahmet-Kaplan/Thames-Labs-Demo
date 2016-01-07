Template.opportunityList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadOpportunities');
  });
  // Search props
  this.showArchived = new ReactiveVar(false);
  this.totalOpps = new ReactiveVar(0);
  this.archivedOpps = new ReactiveVar(0);
  this.totalOppValue = new ReactiveVar(0);
  this.averageOppValue = new ReactiveVar(0);
});

Template.opportunityList.onRendered(function() {
  // Update search props if reactive vars changed
  this.autorun( () => {
    var searchComponent = OpportunitiesIndex.getComponentMethods();
    if (this.showArchived.get()) {
      searchComponent.addProps('showArchived', 'true');
    } else {
      searchComponent.removeProps('showArchived');
    }
  });

  var template = this;

  Meteor.call('report.numberOfOpportunities', function(err, data) {
    template.totalOpps.set(data.Count);
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

  $('[data-toggle="popover"]').popover({html: true, placement: "bottom", container: '#btn-popover'});

});

Template.opportunityList.helpers({
  archivedShown: function() {
    return Template.instance().showArchived.get();
  },
  totalOpps: function() {
    return Template.instance().totalOpps.get();
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

Template.opportunityList.events({
  'click #create-opportunity': function(event) {
    event.preventDefault();
    Modal.show('insertOpportunityModal');
  },
  'click #toggle-archived': function(event) {
    event.preventDefault();
    var showArchived = Template.instance().showArchived.get();
    Template.instance().showArchived.set(!showArchived);
    $(event.target).blur();
  },
  'click #export': function(event) {
    event.preventDefault();
    exportFromSearchToCSV('opportunities');
  },
  'click #oppsOverviewWidget': function(event, template) {

      Meteor.call('report.numberOfOpportunities', function(err, data) {
        template.totalOpps.set(data.Count);
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
