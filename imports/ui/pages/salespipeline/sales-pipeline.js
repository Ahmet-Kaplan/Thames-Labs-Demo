import d3 from 'd3';
import d3tip from 'd3-tip';
d3tip(d3);

import './sales-pipeline.html';
import './sales-pipeline.css';

function Bubblechart(el) {
  this.w = $(el).innerWidth();
  this.h = $('.footer').offset().top - $(el).offset().top;

  this.stages = [];
  this.splitByStage = true;

  this.svg = d3.select(el)
    .append("svg")
    .attr("width", this.w)
    .attr("height", this.h)
    .on("click", () => {
      this.splitByStage = !this.splitByStage;
      this._update();
    });

  this.nodes = [];

  this.radiusScale = d3.scale.sqrt()
    .range([2, 40]);

  this.fillColor = d3.scale.category20();

  this.charge = (d) => {
    // When splitting by stage the additional y-force means we want a stronger charge
    const scaleFactor = this.splitByStage ? 0.3 : 0.2;
    return -Math.pow(this.radiusScale(d.value), 2.0) * scaleFactor;
  };

  this.force = d3.layout.force()
    .size([this.w, this.h])
    .charge(this.charge)
    .chargeDistance(100)
    .nodes(this.nodes);

  this.tip = d3.tip().attr('class', 'd3-tip').html((d) => d.name);
  this.svg.call(this.tip);

  this.updateNodes = (newNodes, stages) => {
    newNodes.forEach( (newNode) => {
      this._addOrUpdateNode(newNode);
    });
    this.stages = stages;
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
      existingNode.currentStageIndex = newNode.currentStageIndex;
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
    this._removeStageAxis();
    if (this.splitByStage) this._drawStageAxis();

    this.radiusScale
      .domain([0, _.max(this.nodes.map( (d) => d.value ))]);

    const circle = this.svg.selectAll(".node")
            .data(this.nodes, (d) => d._id);

    circle.enter()
      .append("circle")
      .attr("fill", (d) => this.fillColor(d.currentStageIndex))
      .attr("stroke-width", 2)
      .attr("stroke", (d) => d3.rgb(this.fillColor(d.currentStageIndex)).darker())
      .attr("class", "node")
      .on('click', (d) => {
        this.tip.hide();
        FlowRouter.go('opportunity', {id: d._id});
      })
      .on('mouseover', this.tip.show)
      .on('mouseout', this.tip.hide);

    circle
      .transition().duration(2000)
      .attr("fill", (d) => this.fillColor(d.currentStageIndex))
      .attr("stroke-width", 2)
      .attr("stroke", (d) => d3.rgb(this.fillColor(d.currentStageIndex)).darker())
      .attr("r", (d) => this.radiusScale(d.value));

    circle.exit()
      .transition() .duration(2000)
      .attr("r", 0)
      .remove();

    this.force.on("tick", (e) => {
      if (this.splitByStage) {
        this.nodes.forEach((node) => this._attractToStage(node, e.alpha));
        this.force.nodes(this.nodes);
      }
      circle
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y);
    })
      .start();
  };

  this._attractToStage = (d, alpha) => {
    const targetY = 50 + d.currentStageIndex * 100;
    d.y += (targetY - d.y) * alpha * 0.3;
    d.x += (this.w / 2 - d.x) * alpha * 0.1;
  };

  this._removeStageAxis = () => {
    this.svg.selectAll("g.axisContainer").remove();
    this.force.gravity(0.1);
  };

  this._drawStageAxis = () => {
    this.force.gravity(0);

    // draw y axis
    const axisContainer = this.svg.append("g")
            .attr("class", "axisContainer");

    axisContainer.append("line")
      .attr("class", "stageAxis")
      .attr("x1", 12)
      .attr("y1", 5)
      .attr("x2", 12)
      .attr("y2", this.h - 5)
      .attr("stroke-width", 2)
      .attr("stroke", "rgb(51,51,51)");

    axisContainer.selectAll(".marker")
      .data(this.stages, (d) => d.id)
      .enter()
      .append("circle")
      .attr("class", "marker")
      .attr("r", 10)
      .attr("fill", (d, i) => this.fillColor(i))
      .attr("stroke", (d, i) => d3.rgb(this.fillColor(i)).darker())
      .attr("stroke-width", 2)
      .attr("cx", 12)
      .attr("cy", (d, i) => 50 + i * 100);

    axisContainer.selectAll(".markerText")
      .data(this.stages, (d) => d.id)
      .enter()
      .append("text")
      .attr("x", 30)
      .attr("y", (d, i) => 50 + i * 100)
      .attr("fill", "rgb(51,51,51)")
      .attr("dominant-baseline", "central")
      .text((d) => d.title);
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

  this.chart = new Bubblechart('#d3-sales-pipeline');

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
});
