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

  this.stageHeight = 100;

  this.fillColor = d3.scale.category20();

  this.force = d3.layout.force()
    .size([this.w, this.h])
    .nodes(this.nodes);

  this.tip = d3.tip().attr('class', 'd3-tip').html((d) => d.name);
  this.svg.call(this.tip);

  this.updateNodes = (newNodes, stages) => {
    newNodes.forEach( (newNode) => {
      this._addOrUpdateNode(newNode);
    });
    this._cleanNodes(newNodes);
    this.force.nodes(this.nodes);
    this.stages = stages;
    // calculate stage totals
    _.each(this.stages, (stage) => {
        stage.opportunityCount = _.filter(this.nodes, {currentStageId: stage.id}).length;
    });
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
    // Remove any mode specific things
    this._removeStagesChart();

    // Mode specific code
    if (this.splitByStage) {
      this._stagesChart();
    } else {
      this._totalsChart();
    }

    // What follows happens regardless of chart mode
    this.radiusScale
      .domain([0, _.max(this.nodes.map( (d) => d.value ))]);

    this.circle = this.svg.selectAll(".node")
            .data(this.nodes, (d) => d._id);

    this.circle.enter()
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

    this.circle
      .transition().duration(2000)
      .attr("fill", (d) => this.fillColor(d.currentStageIndex))
      .attr("stroke-width", 2)
      .attr("stroke", (d) => d3.rgb(this.fillColor(d.currentStageIndex)).darker())
      .attr("r", (d) => this.radiusScale(d.value));

    this.circle.exit()
      .transition() .duration(2000)
      .attr("r", 0)
      .remove();

    this.force.start();
  };

  // Contains totals specific visualisation
  this._totalsChart = () => {
    // Set layout
    this.w = $(el).innerWidth();
    this.h = window.innerHeight - 120;
    this.svg.attr("height", this.h).attr("width", this.w);
    this.radiusScale.range([2, this.h/10]);
    // Set forces
    this.force.size([this.w, this.h]);
    this.force.gravity(0.1);
    this.force.charge( (d) => -Math.pow(this.radiusScale(d.value), 2.0) * 0.2 );
    this.force.on("tick", (e) => {
      this.force.nodes(this.nodes);
      this.circle
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y);
    });
  };

  // Contains stages specific visualisation
  this._stagesChart = () => {
    // Set layout
    this.stageHeight = window.innerHeight / 6;
    this.w = $(el).innerWidth();
    this.h = this.stageHeight * this.stages.length;
    this.svg.attr("height", this.h).attr("width", this.w);
    this.radiusScale.range([2, this.stageHeight * 0.4]);
    // Set forces
    this.force.gravity(0);
    this.force.charge( (d) => -this.stageHeight*0.1 -Math.pow(this.radiusScale(d.value), 1.7) );
    this.force.chargeDistance(this.stageHeight);
    this.force.on("tick", (e) => {
      this.nodes.forEach((d) => {
        // Attract to stages
        const targetY = (0.5 + d.currentStageIndex) * this.stageHeight;
        d.y += (targetY - d.y) * e.alpha * 0.3;
        d.x += (this.w / 2 - d.x) * e.alpha * 0.05;
      });
      this.force.nodes(this.nodes);
      this.circle
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y);
    });

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
      .attr("cy", (d, i) => (0.5 + i) * this.stageHeight);

    axisContainer.selectAll(".markerText")
      .data(this.stages, (d) => d.id)
      .enter()
      .append("text")
      .attr("x", 30)
      .attr("y", (d, i) => (0.5 + i) * this.stageHeight)
      .attr("fill", "rgb(51,51,51)")
      .attr("dominant-baseline", "central")
      .text((d) => `${d.title} (${d.opportunityCount})`);

  };

  this._removeStagesChart = () => {
    this.svg.selectAll("g.axisContainer").remove();
  };

};

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
  this.chartResizeEventHandler = window.addEventListener("resize", this.chart._update);

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

Template.salesPipeline.onDestroyed(function() {
  // Clean up resize event handler
  window.removeEventListener("resize", this.chartResizeEventHandler);
});
