import _ from 'lodash';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import { SalesPipelineChart } from '/imports/ui/components/sales-pipeline/sales-pipeline-chart';
import { redirectWithoutPermission } from '/imports/api/global-helpers/permissions-helpers.js';

import '/imports/ui/components/opportunities/opportunity-details-panel.js';
import '/imports/ui/components/opportunities/stage-control/opportunity-previous-stage-button.js';
import '/imports/ui/components/opportunities/stage-control/opportunity-lost-link.js';

import './sales-pipeline.html';
import './sales-pipeline.css';

Template.salesPipeline.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadOpportunities');
  });

  // Get selected opportunity from URL if present
  const opportunityId = FlowRouter.getParam("id");
  this.selectedOpportunity = new ReactiveVar(opportunityId);

  this.subscribe('salesPipelineOpportunities');
});

Template.salesPipeline.onRendered(function() {
  this.chart = new SalesPipelineChart('#d3-sales-pipeline');
  this.chartResizeEventHandler = window.addEventListener("resize", this.chart._update);

  this.chart._selectionCallback = (id) => this.selectedOpportunity.set(id);

  // n.b. stages are currently not reactive - need to find a way to watch for updates without
  // triggering on ANY tenant update
  const stages = Tenants.findOne(Meteor.user().group).settings.opportunity.stages;

  this.autorun( () => {
    // Update chart data when opportunities change
    // n.b. clone to prevent updates from within chart triggering autorun
    const opportunities = _.clone(Opportunities.find({
      isArchived: { $ne: true }
    }).fetch());
    opportunities.forEach( (d) => {
      d.currentStageIndex = _.findIndex(stages, {id: d.currentStageId});
    });
    this.chart.updateNodes(opportunities, stages);

    // Check if currently selected opportunity is in dataset and set null if not
    if (this.subscriptionsReady()) {
      // Don't check unless all opps arrived to prevent overwriting selected opportunity from url
      const selectedOpportunityId = Tracker.nonreactive( () => this.selectedOpportunity.get() );
      if (!_.find(opportunities, {_id: selectedOpportunityId})) {
        this.selectedOpportunity.set(null);
      }
    }
  });

  this.autorun( () => {
    const opportunityId = this.selectedOpportunity.get();
    // Update chart
    this.chart.selectOpportunity(opportunityId);
    // Update URL to reflect selected opportunity
    FlowRouter.withReplaceState( () => {
      FlowRouter.setParams({
        id: opportunityId
      });
    });
  });
});

Template.salesPipeline.helpers({
  selectedOpportunity: () => {
    const opportunityId = Template.instance().selectedOpportunity.get();
    return Opportunities.findOne(opportunityId);
  }
});

Template.salesPipeline.onDestroyed(function() {
  // Clean up resize event handler
  window.removeEventListener("resize", this.chartResizeEventHandler);
});
