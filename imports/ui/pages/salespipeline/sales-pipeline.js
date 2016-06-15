import d3 from 'd3';
import d3tip from 'd3-tip';
d3tip(d3);

import './sales-pipeline.html';
import './sales-pipeline.css';

function Bubblechart(el) {
  this.w = $(el).innerWidth();
  this.h = $(el).innerHeight();

  this.svg = d3.select(el)
    .append("svg")
    .attr("width", this.w)
    .attr("height", this.h);

  this.nodes = [];

  this.radiusScale = d3.scale.sqrt()
    .range([2, 85]);

  this.fillColor = d3.scale.category20();

  this.charge = (d) => -Math.pow(this.radiusScale(d.value), 2.0) / 5;

  this.force = d3.layout.force()
    .size([this.w, this.h])
    .charge(this.charge)
    .nodes(this.nodes);

  this.tip = d3.tip().attr('class', 'd3-tip').html((d) => d.name);
  this.svg.call(this.tip);

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
    this.radiusScale
      .domain([0, _.max(this.nodes.map( (d) => d.value ))]);

    const node = this.svg.selectAll(".node")
            .data(this.nodes, (d) => d._id);

    node.enter()
      .append("circle")
      .attr("fill", (d) => this.fillColor(d.currentStageId))
      .attr("stroke-width", 2)
      .attr("stroke", (d) => d3.rgb(this.fillColor(d.currentStageId)).darker())
      .attr("class", "node")
      .on('mouseover', this.tip.show)
      .on('mouseout', this.tip.hide);

    node
      .transition().duration(2000)
      .attr("fill", (d) => this.fillColor(d.currentStageId))
      .attr("stroke-width", 2)
      .attr("stroke", (d) => d3.rgb(this.fillColor(d.currentStageId)).darker())
      .attr("r", (d) => this.radiusScale(d.value));

    node.exit()
      .transition() .duration(2000)
      .attr("r", 0)
      .remove();

    this.force.on("tick", () => {
      node
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y);
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
