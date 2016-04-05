Template.opportunityList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadOpportunities');
  });

  // Summary stats
  this.totalOpps = new ReactiveVar(0);
  this.archivedOpps = new ReactiveVar(0);
  this.totalOppValue = new ReactiveVar(0);
  this.averageOppValue = new ReactiveVar(0);

  this.oppsListCount = new ReactiveVar(0);

  // Store search index dict on template to allow helpers to access
  this.index = OpportunitiesIndex;

  // Store search prop state - seems necessary as helpers can't access
  // index.getComponentDict()
  this.showArchived = new ReactiveVar(false);
  this.sortByCloseDate = new ReactiveVar(false);
});

Template.opportunityList.onRendered(function() {

  this.autorun(() => {
    this.oppsListCount.set(Collections['opportunities'].index.getComponentDict().get('count'));
  });

  // Update reactive vars if search props updated
  this.autorun(() => {
    const searchComponent = this.index.getComponentDict(),
          searchOptions = searchComponent.get('searchOptions'),
          props = searchOptions.props ? searchOptions.props : {};

    this.showArchived.set(props.showArchived ? true : false);
    this.sortByCloseDate.set(props.sortByCloseDate ? true : false);
  });

  Meteor.call('report.numberOfOpportunities', (err, data) => {
    this.totalOpps.set(data.Count);
  });
  Meteor.call('report.archivedOpportunities', (err, data) => {
    this.archivedOpps.set(data.Count);
  });
  Meteor.call('report.valueOfOpportunities', (err, data) => {
    this.totalOppValue.set(data.Value);
  });
  Meteor.call('report.averageOpportunityValue', (err, data) => {
    this.averageOppValue.set(data.Value);
  });

  $('[data-toggle="popover"]').popover({
    html: true,
    placement: "bottom",
    container: '.list-header-right'
  });

});

Template.opportunityList.helpers({
  showArchived: function() {
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
  },
  sortByCloseDate: function() {
    return Template.instance().sortByCloseDate.get();
  },
  oppCount: function() {
     return Template.instance().oppsListCount.get();
  },
  hasMultipleOpps: function() {
     return Template.instance().oppsListCount.get() !== 1;
  }
});

Template.opportunityList.events({
  'click #toggle-close-sort': function(event, template) {
    const indexMethods = Template.instance().index.getComponentMethods();
    if (Template.instance().sortByCloseDate.get()) {
      indexMethods.removeProps('sortByCloseDate');
    } else {
      indexMethods.addProps('sortByCloseDate', 'true');
    }
    $(event.target).blur();
  },
  'click #create-opportunity': function(event) {
    event.preventDefault();
    Modal.show('insertOpportunityModal');
  },
  'click #toggle-archived': function(event) {
    event.preventDefault();
    const indexMethods = Template.instance().index.getComponentMethods();
    if (Template.instance().showArchived.get()) {
      indexMethods.removeProps('showArchived');
    } else {
      indexMethods.addProps('showArchived', 'true');
    }
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
