import _ from 'lodash';
import d3 from 'd3';
import d3tip from 'd3-tip';

import { colours } from '/imports/api/lookup/colours.js';

d3tip(d3);

function StageChart(el) {

  const width = $(el).innerWidth(),
        height = 100,
        //Update this to change the radius of the circle
        nodeR = 20,
        //Update this to change the radius of the stage markers
        markerR = 5,
        color = d3.scale.ordinal()
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
          ]),
        svg = d3.select(el).append("svg")
          .attr("width", width)
          .attr("height", height),
        force = d3.layout.force()
          .gravity(0.2)
          .charge(0),
        nodes = [],
        tip = d3.tip().attr('class', 'd3-tip').html((d) => d.description);

  svg.call(tip);

  this.draw = (entity, stages) => {
    //Draw axis container here so it doesn't get re-drawn on top of the node
    svg.append("g")
      .attr("class", "axisContainer");
    this.drawAxis(entity, stages);
    this.drawCircle();
    this.setForce(entity, stages);
  };

  this.resize = (entity, stages) => {
    svg.selectAll("g.axis").remove();
    this.drawAxis(entity, stages);
    this.setForce(entity, stages);
  };

  this.drawAxis = (entity, stages) => {
    const axisContainer = svg.selectAll(".axisContainer"),
          stageWidth = _.divide(width, stages.length);

    svg
      .attr("width", width);

    nodes.push(entity);

    stages.forEach( (stage, i) => {
      stage.x = (0.5 + i) * stageWidth;
      if( width < 375 && stage.id % 2 == 0) {
        stage.y = height / 8;
      }else {
        stage.y = height - (height / 8);
      }
    });

    axisContainer.append("g")
      .attr("class", "axis");

    const axis = svg.selectAll(".axis");

    //Draw axis
    axis.append("line")
      .attr("class", "stageAxis")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", height / 2)
      .attr("y2", height / 2)
      .attr("stroke-width", 2)
      .attr("stroke", "#ccc");

    axis.selectAll(".marker")
      .data(stages, (d) => d.id)
      .enter()
      .append("g")
      .attr("class", "marker")
      .style("text-anchor", "middle")
      .append("circle")
      .attr("class", "stage")
      .attr("r", markerR)
      .attr("fill", (d, i) => color(i))
      .attr("stroke", (d, i) => d3.rgb(color(i)).darker())
      .attr("stroke-width", 2)
      .attr("cx", (d) => d.x)
      .attr("cy", height / 2);

    if(width > 250) {
      axis.selectAll(".marker")
        .append("text")
        .attr("class", "marker-label")
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
        .text((d) => d.title);
    }

  };

  this.drawCircle = () => {

    svg.append("circle")
      .attr("class", "node")
      .attr("r", nodeR)
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .data(nodes)
      .call(force.drag);
  };

  this.setForce = (entity, stages) => {

    force
      .nodes(nodes);

    //Get current stage
    const currentStage = stages[entity.currentStageIndex],

          //force.size divides by 2 so multiply stage.x by 2 for node x
          nodeX = currentStage.x * 2,

          //Update node colours
          circle = svg.selectAll(".node")
            .style("fill", color(entity.currentStageIndex))
            .attr("stroke", d3.rgb(color(entity.currentStageIndex)).darker()),

          //Update node position
          moveNode = (e) => {
            circle
              .attr("cx", (d) => d.x)
              .attr("cy", (d) => d.y);

            force.drag()
              .on("dragend", (d) => {
                const closestStage = _.minBy(stages, (stage) => Math.abs(d.x - stage.x));
                if (closestStage.id === entity.currentStageIndex) return;
                this._dragCallBack(d._id, closestStage.id);
              });
          };

    //Update force position
    force
      .size([nodeX, height])
      .on("tick", moveNode)
      .start();
  };

  //Attach callback for circle dragend
  this._dragCallBack = () => {};

}

export { StageChart };
