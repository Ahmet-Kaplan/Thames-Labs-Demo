import d3 from 'd3';
import d3tip from 'd3-tip';
import _ from 'lodash';

d3tip(d3);

function StageChart(el) {

  var width = $(el).innerWidth(),
      height = 100,
      nodeR = 20,
      markerR = 5;

  var color = d3.scale.ordinal()
        .range([
          '#1684c1',
          '#00c99d',
          '#fec41a',
          '#e8425d',
          '#173e5f',
          '#00b3bb',
          '#00c15b',
          '#fd9727',
          '#af1876'
        ]);

  var svg = d3.select(el).append("svg")
        .attr("width", width)
        .attr("height", height);

  var force = d3.layout.force()
        .gravity(0.2)
        .charge(0);

  var nodes = [];

  var tip = d3.tip().attr('class', 'd3-tip').html((d) => d.description);
  svg.call(tip);

  this.draw = (entity, stages) => {
    nodes.push(entity);

    const stageWidth = width / stages.length;
    stages.forEach( (stage, i) => {
      stage.x = (0.5 + i) * stageWidth;
    });

    const axisContainer = svg.append("g")
            .attr("class", "axisContainer");

    //Draw axis
    axisContainer.append("line")
      .attr("class", "stageAxis")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", height / 2)
      .attr("y2", height / 2)
      .attr("stroke-width", 2)
      .attr("stroke", "#ccc");

    axisContainer.selectAll(".marker")
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

    axisContainer.selectAll(".marker")
      .append("text")
      .attr("class", "marker-label")
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
      .attr("x", (d) => d.x)
      .attr("y", height - (height / 8))
      .text((d) => d.title);

    //Draw node
    svg.append("circle")
      .attr("class", "node")
      .attr("r", nodeR)
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .data(nodes)
      .call(force.drag);

    force
      .nodes(nodes);

  };

  this.update = (entity, stages) => {

    //Get current stage
    const currentStage = stages[entity.currentStageIndex];

    //force.size divides by 2 so multiply stage.x by 2 for node x
    var nodeX = currentStage.x * 2;

    //Update node colours
    var circle = svg.selectAll(".node")
          .style("fill", color(entity.currentStageIndex))
          .attr("stroke", d3.rgb(color(entity.currentStageIndex)).darker());

    //Update node position
    var tick = (e) => {
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
      .on("tick", tick)
      .start();
  };

  //Attach callback for circle dragend
  this._dragCallBack = () => {};

}

export { StageChart };
