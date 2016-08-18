import { permissionHelpers } from '/imports/api/permissions/permission-helpers.js';
import '/imports/ui/components/tags/tag-management/tag-management.js';
import '/imports/ui/components/opportunities/opportunity-list-item.js';
import '/imports/ui/components/opportunities/modals/insert/insert-opportunity-modal.js';
import '/imports/ui/components/opportunities/reports/overview.js';
import './opportunity-list.html';

Template.opportunityList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    permissionHelpers.redirectWithoutPermission(Meteor.userId(), 'CanReadOpportunities');
  });

  this.oppsListCount = new ReactiveVar(0);

  // Store search index dict on template to allow helpers to access
  this.index = OpportunitiesIndex;

  // Store search prop state - seems necessary as helpers can't access
  // index.getComponentDict()
  this.sortByCloseDate = new ReactiveVar(false);
  this.sortByValue = new ReactiveVar(false);
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

    this.sortByCloseDate.set(!!props.sortByCloseDate);
    this.sortByValue.set(!!props.sortByValue);
  });

  $('[data-toggle="popover"]').popover({
    html: true,
    placement: "bottom",
    container: '.list-header-right'
  });

  if(!_.get(Collections['opportunities'].index.getComponentDict().get('searchOptions').props, "state")) {
    Collections['opportunities'].index.getComponentMethods().addProps('state', 'Open');
  }
});

Template.opportunityList.helpers({

  sortByCloseDate: function() {
    return Template.instance().sortByCloseDate.get();
  },
  sortByValue: function() {
    return Template.instance().sortByValue.get();
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
  'click #toggle-value-sort': function(event, template) {
    const indexMethods = Template.instance().index.getComponentMethods();
    if (Template.instance().sortByValue.get()) {
      indexMethods.removeProps('sortByValue');
    } else {
      indexMethods.addProps('sortByValue', 'true');
    }
    $(event.target).blur();
  },
  'click #create-opportunity': function(event) {
    event.preventDefault();
    Modal.show('insertOpportunityModal');
  },
  'click #export': function(event) {
    event.preventDefault();
    exportFromSearchToCSV('opportunities');
  }
});
