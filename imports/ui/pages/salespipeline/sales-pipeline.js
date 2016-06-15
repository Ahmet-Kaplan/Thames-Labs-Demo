import d3 from 'd3';

import './sales-pipeline.html';

function Bubblechart(el) {
  this.w = $(el).innerWidth();
  this.h = $(el).innerHeight();

  this.svg = d3.select(el)
    .append("svg")
    .attr("width", this.w)
    .attr("height", this.h);

  this.nodes = [];

  this.force = d3.layout.force()
    .nodes(this.nodes)
    .charge(-200)
    .size([this.w, this.h]);

  this.radiusScale = d3.scale.sqrt()
    .range([5, 50]);

  this.categoryColorScale = d3.scale.category20();

  this.updateNodes = (newNodes) => {
    newNodes.forEach( (newNode) => {
      this._addOrUpdateNode(newNode);
    });
    this._cleanNodes(newNodes);
    this.force.nodes(this.nodes);
    this._update();
  };

  this._addOrUpdateNode = (newNode) => {
    const existingNode = _.find(this.nodes, {'_id': newNode._id});
    if (existingNode) {
      existingNode.name = newNode.name;
      existingNode.value = _.isFinite(newNode.value) ? newNode.value : 0;
      existingNode.currentStageId = newNode.currentStageId;
    } else {
      this.nodes.push(newNode);
    }
  };

  this._cleanNodes = (newNodes) => {
    const idsToRemove = _.difference(
      this.nodes.map( (node) => _.get(node, '_id')),
      newNodes.map((node) => _.get(node, '_id'))
    );
    this.nodes = _.reject(this.nodes, (node) => _.includes(idsToRemove, node._id));
  };

  this._update = () => {
    const radii = this.nodes.map( (d) => { return d.value; });
    this.radiusScale
      .domain([_.min(radii), _.max(radii)]);

    const node = this.svg.selectAll(".node")
            .data(this.nodes, (d) => { return d._id; });

    node.enter()
      .append("circle")
      .attr("fill", (d) => this.categoryColorScale(d.currentStageId))
      .attr("class", "node");

    node
      .transition().duration(2000)
      .attr("fill", (d) => this.categoryColorScale(d.currentStageId))
      .attr("r", (d) => { return this.radiusScale(d.value); });

    node.exit()
      .transition() .duration(2000)
      .attr("r", 0)
      .remove();

    this.force.on("tick", () => {
      node
        .attr("cx", (d) => { return d.x; })
        .attr("cy", (d) => { return d.y; });
    })
      .start();
  };
}

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
  this.subscribe('salesPipelineOpportunities');

  const chart = new Bubblechart('#d3-sales-pipeline');

  this.autorun(function() {
    const dataset = Opportunities.find().fetch();
    chart.updateNodes(dataset);
  });
});
