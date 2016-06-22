import _ from 'lodash';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { Template } from 'meteor/templating';

import { SalesPipelineChart } from '/imports/ui/components/sales-pipeline/sales-pipeline-chart';

import './sales-pipeline.html';
import './sales-pipeline.css';

Template.salesPipeline.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadOpportunities');

    if (Meteor.user() & !isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To access the Sales Pipeline');
      FlowRouter.go('/');
    }
  });

  this.selectedOpportunity = new ReactiveVar(null);
});

Template.salesPipeline.onRendered(function() {
  this.subscribe('salesPipelineOpportunities');

  this.chart = new SalesPipelineChart('#d3-sales-pipeline');
  this.chartResizeEventHandler = window.addEventListener("resize", this.chart._update);

  this.chart._selectionCallback = (id) => this.selectedOpportunity.set(id);

  // TODO: handle null tenant / stages
  // n.b. stages are currently not reactive - need to find a way to watch for updates without
  // triggering on ANY tenant update
  const stages = Tenants.findOne(Meteor.user().group).settings.opportunity.stages;

  this.autorun( () => {
    // n.b. clone to prevent updates from within chart triggering autorun
    const dataset = _.clone(Opportunities.find({
      isArchived: { $ne: true }
    }).fetch());
    dataset.forEach( (d) => {
      d.currentStageIndex = _.findIndex(stages, {id: d.currentStageId});
    });
    this.chart.updateNodes(dataset, stages);
  });

  this.autorun( () => {
    this.chart.selectOpportunity(this.selectedOpportunity.get());
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
