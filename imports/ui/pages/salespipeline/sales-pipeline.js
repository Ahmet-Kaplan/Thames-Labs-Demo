import d3 from 'd3';

import './sales-pipeline.html';

Template.salesPipeline.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadOpportunities');

    if (Meteor.user() & !isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To access the Sales Pipeline');
      FlowRouter.go('/');
    }
  });
});

Template.salesPipeline.onRendered(function() {
  this.subscribe('allOpportunities');

  const diameter = 500;

  const svg = d3.select('#d3-sales-pipeline')
          .append("svg")
          .attr("width", diameter)
          .attr("height", diameter);

  this.autorun(function() {
    let dataset = Opportunities.find().fetch();
    console.log(dataset);
    var opps = svg.selectAll("rect")
      .data(dataset, (d) => { return d._id; });

    opps.enter()
      .append("rect")
      .attr("y", (d, i) => { return i*25 })
      .attr("height", 20)
      .attr("width", (d, i) => {return d.value });

    opps.exit()
      .remove();
  });
});

Template.salesPipeline.helpers({
});
