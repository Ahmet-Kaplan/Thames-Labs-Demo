import d3 from 'd3';
import d3tip from 'd3-tip';
d3tip(d3);
import _ from 'lodash';

import { decimal } from '/imports/ui/components/currency/decimal.js';

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
    .on("click", (e) => {
      this.selectOpportunity(null);
    });

  this.nodes = [];
  this.selectedNode = null;

  this.radiusScale = d3.scale.sqrt()
    .range([2, 40]);

  this.stageHeight = 100;

  this.fillColor = d3.scale.ordinal()
    .range([
      '#1684c1', // CS blue (primary)
      '#00c99d', // blue-green
      '#fec41a', // yellow
      '#e8425d', // red-pink (danger)
      '#173e5f', // deep blue
      '#00b3bb', // turquoise (info)
      '#00c15b', // green (success)
      '#fd9727', // orange (warning)
      '#af1876', // red-violet
    ]);

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
      const stageNodes = _.filter(this.nodes, {currentStageId: stage.id});
      stage.opportunityCount = stageNodes.length;
      stage.opportunityTotal = _.sumBy(stageNodes, 'value');
      stage.opportunityAvg = stage.opportunityTotal / stageNodes.length;
    });
    this._update();
  };

  this._addOrUpdateNode = (newNode) => {
    // Set defaults to prevent divide by zero errors on init
    newNode.value = _.isFinite(newNode.value) ? newNode.value : 0;
    const existingNode = _.find(this.nodes, {'_id': newNode._id});
    if (existingNode) {
      existingNode.name = newNode.name;
      existingNode.value = newNode.value;
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

    this.radiusScale
      .domain([0, _.max(this.nodes.map( (d) => d.value ))]);

    // Mode specific code
    if (this.splitByStage) {
      this._stagesChart();
    } else {
      this._totalsChart();
    }

    this._drawCircles();

    this.force.start();
  };

  this._drawCircles = () => {
    this.circle = this.svg.selectAll(".node")
      .data(this.nodes, (d) => d._id);

    this.circle.enter()
      .append("circle")
      .attr("fill", (d) => this.fillColor(d.currentStageIndex))
      .attr("stroke-width", 2)
      .attr("stroke", (d) => d3.rgb(this.fillColor(d.currentStageIndex)).darker())
      .attr("class", "node")
      .style("cursor", "pointer")
      .call(this.force.drag)
      .on('click', (d) => {
        if (d3.event.defaultPrevented) return; // Ignore drag
        this._selectionCallback(d._id);
      })
      .on('mouseover', this.tip.show)
      .on('mouseout', this.tip.hide);

    this.circle
      .transition().duration(500)
      .attr("fill", (d) => {
        if (this.selectedNode == d._id) return d3.rgb(this.fillColor(d.currentStageIndex)).brighter();
        return this.fillColor(d.currentStageIndex);
      })
      .attr("stroke", (d) => {
        if (this.selectedNode == d._id) return d3.rgb(this.fillColor(d.currentStageIndex)).darker(2);
        return d3.rgb(this.fillColor(d.currentStageIndex)).darker();
      })
      .attr("stroke-width", 2)
      .attr("r", (d) => this.radiusScale(d.value));

    this.circle.exit()
      .transition() .duration(1000)
      .attr("r", 0)
      .remove();
  };

  // Contains totals specific visualisation
  this._totalsChart = () => {
    // Set layout
    this.w = $(el).innerWidth();
    this.h = window.innerHeight - 120;
    this.svg.attr("height", this.h).attr("width", this.w);
    this.radiusScale.range([2, this.h/10]);
    this.nodes.forEach((d) => d.radius = this.radiusScale(d.value));
    // Set forces
    this.force.size([this.w, this.h]);
    this.force.gravity(0.05);
    this.force.charge( (d) => -(100 + 0.2 * Math.pow(d.radius, 2)) );
    this.force.chargeDistance(this.h/4);
    this.force.on("tick", (e) => {
      this.circle
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y);
    });
    this.force.drag()
      .on("dragend", (d) => {} );
  };

  // Contains stages specific visualisation
  this._stagesChart = () => {
    // Set layout
    this.stageHeight = _.max([100, window.innerHeight / 6]);
    this.stages.forEach( (stage, i) => stage.y = (0.5 + i) * this.stageHeight );
    this.w = $(el).innerWidth();
    this.h = this.stageHeight * this.stages.length;
    this.svg.attr("height", this.h).attr("width", this.w);
    this.radiusScale.range([2, this.stageHeight * 0.3]);
    this.nodes.forEach( (d) => d.radius = this.radiusScale(d.value) );
    // Set forces
    this.force.gravity(0);
    this.force.charge( (d) => -(50 + 0.2 * Math.pow(d.radius, 2)) );
    this.force.chargeDistance(this.stageHeight);
    this.force.on("tick", (e) => {
      this.nodes.forEach((d) => {
        // Attract to stages
        const stage = this.stages[d.currentStageIndex];
        d.y += (stage.y - d.y) * e.alpha * 0.3;
        d.x += (this.w / 2 - d.x) * e.alpha * 0.05;
        // Push away from edges
        if (d.x < 30) d.x += (30 - d.x) * e.alpha;
      });
      this.circle
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y);
    });
    this.force.drag()
      .on("dragend", (d) => {
        // TODO: also make this add activity and check permissions?
        // Also don't update if current stage is new stage
        const closestStage = _.minBy(this.stages, (stage) => Math.abs(d.y - stage.y));
        const indexOfClosestStage = _.findIndex(this.stages, closestStage);
        Opportunities.update(d._id, {
          $set: { currentStageId: indexOfClosestStage }
        });
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
      .attr("cy", (d) => d.y);

    if (this.w > 650) {
      axisContainer.selectAll(".markerText")
        .data(this.stages, (d) => d.id)
        .enter()
        .append("foreignObject")
        .attr("width", this.w/6)
        .attr("height", this.stageHeight)
        .attr("x", 30)
        .attr("y", (d) => d.y - 10)
        .append("xhtml:div")
        .append("p")
        .html( (d) => `${d.title} (${d.opportunityCount})` )
        .append("p")
        .html( (d) => `Total: ${decimal(d.opportunityTotal)}` )
        .append("p")
        .html( (d) => `Average: ${decimal(d.opportunityAvg)}` );
    }

  };

  this._removeStagesChart = () => {
    this.svg.selectAll("g.axisContainer").remove();
  };

  // Resolves collisions between d and all other nodes
  this._collide = (alpha) => {
    const quadtree = d3.geom.quadtree(this.nodes),
          maxRadius = _.chain(this.nodes)
            .map((d) => d.radius)
            .max()
            .value(),
          padding = 5;
    return (d) => {
      const r = d.radius + this.maxRadius + padding,
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;
      quadtree.visit( (quad, x1, y1, x2, y2) => {
        if (quad.point && (quad.point !== d)) {
          let x = d.x - quad.point.x,
              y = d.y - quad.point.y,
              l = Math.sqrt(x*x + y*y);
          const r = d.radius + quad.point.radius + padding;
          if (l < r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
  };

  // This function is for attaching a callback on circle selection
  this._selectionCallback = () => {};

  this.selectOpportunity = (id) => {
    // set to null for nothing selected
    this.selectedNode = id;
    this._drawCircles();
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

  this.selectedOpportunity = new ReactiveVar(null);
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

Template.salesPipeline.onDestroyed(function() {
  // Clean up resize event handler
  window.removeEventListener("resize", this.chartResizeEventHandler);
});
