import _ from 'lodash';
import d3 from 'd3';
import d3tip from 'd3-tip';
import toastr from 'meteor/chrismbeckett:toastr';
import { Meteor } from 'meteor/meteor';

import { decimal } from '/imports/ui/components/currency/decimal.js';
import { colours } from '/imports/api/lookup/colours.js';

d3tip(d3);

function SalesPipelineChart(el) {
  this.w = $(el).innerWidth();
  this.h = $('.footer').offset().top - $(el).offset().top;

  this.stages = [];
  this.splitByStage = true;
  this.collisionDetection = false;

  this.svg = d3.select(el)
    .append("svg")
    .attr("width", this.w)
    .attr("height", this.h)
    .on("click", (e) => {
      if (d3.event.defaultPrevented) return;
      this._selectionCallback(null);
    });

  this.nodes = [];
  this.selectedNode = null;

  this.radiusScale = d3.scale.sqrt()
    .range([2, 40]);

  this.stageHeight = 100;

  this.fillColor = d3.scale.ordinal()
    .range([
      colours.hex.csBlue,
      colours.hex.blueGreen,
      colours.hex.yellow,
      colours.hex.redPink,
      colours.hex.deepBlue,
      colours.hex.turquoise,
      colours.hex.green,
      colours.hex.orange,
      colours.hex.redViolet,
    ]);

  this.force = d3.layout.force()
    .size([this.w, this.h])
    .nodes(this.nodes);

  this.tip = d3.tip().attr('class', 'd3-tip').html((d) => `${d.name} | ${decimal(d.value)}`);
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
        if (d3.event.defaultPrevented) return;
        d3.event.stopPropagation();
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
    this.radiusScale.range([2, this.h / 10]);
    this.nodes.forEach((d) => {
      d.radius = this.radiusScale(d.value);
    });
    // Set forces
    this.force.size([this.w, this.h]);
    this.force.gravity(0.05);
    this.force.charge( (d) => -(100 + 0.2 * Math.pow(d.radius, 2)) );
    this.force.chargeDistance(this.h / 4);
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
    this.stages.forEach( (stage, i) => {
      stage.y = (0.5 + i) * this.stageHeight;
    });
    this.w = $(el).innerWidth();
    this.h = this.stageHeight * this.stages.length;
    this.svg.attr("height", this.h).attr("width", this.w);
    this.radiusScale.range([2, this.stageHeight * 0.3]);
    this.nodes.forEach( (d) => {
      d.radius = this.radiusScale(d.value);
    });
    // Set forces
    this.force.gravity(0);
    this.force.charge( (d) => -(50 + 0.2 * Math.pow(d.radius, 2)) );
    this.force.chargeDistance(this.stageHeight);
    this.force.on("tick", (e) => {
      // Perform collision detection
      if (this.collisionDetection) {
        const q = d3.geom.quadtree(this.nodes);
        this.nodes.forEach( (d) => q.visit(this._collide(d, 0.5)) );
      }

      // Attract to stages
      this.nodes.forEach((d) => {
        const stage = this.stages[d.currentStageIndex];
        d.y += (stage.y - d.y) * e.alpha * 0.3;
        d.x += (this.w / 2 - d.x) * e.alpha * 0.05;
        // Push away from edges
        if (d.x < 30) d.x += (30 - d.x) * e.alpha;
      });

      // Update circle location
      this.circle
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y);
    });
    this.force.drag()
      .on("dragend", (d) => {
        // Update opportunity to move it the closest stage
        const closestStage = _.minBy(this.stages, (stage) => Math.abs(d.y - stage.y));
        if (closestStage.id === d.currentStageId) return;
        Meteor.call('opportunities.setStage', d._id, closestStage.id, (err) => {
          if (err) toastr.error(err.error);
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
        .attr("width", this.w / 6)
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

  // Really resolves collisions between d and all other nodes!
  this._collide = (node, aggression) => {
    var radius = node.radius + 16,
        nx1 = node.x - radius,
        nx2 = node.x + radius,
        ny1 = node.y - radius,
        ny2 = node.y + radius;
    return function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== node)) {
        var x = node.x - quad.point.x,
            y = node.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = node.radius + quad.point.radius + 3;
        if (l < r) {
          l = (l - r) / l * aggression;
          node.x -= x *= l;
          node.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2
          || x2 < nx1
          || y1 > ny2
          || y2 < ny1;
    };
  };

  // This function is for attaching a callback on circle selection
  this._selectionCallback = () => {};

  this.selectOpportunity = (id) => {
    // set to null for nothing selected
    this.selectedNode = id;
    this._drawCircles();
  };

}

export { SalesPipelineChart };
