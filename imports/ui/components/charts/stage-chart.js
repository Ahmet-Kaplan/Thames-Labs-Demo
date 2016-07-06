import d3 from 'd3';
import _ from 'lodash';

function StageChart(el) {
  var width = $(el).innerWidth(),
      height = 100,
      nodeR = 20;

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

  this.draw = (entity, stages) => {

    const stageWidth = width / stages.length;
    stages.forEach( (stage, i) => {
      stage.x = (0.5 + i) * stageWidth;
    });
    const axisContainer = svg.append("g")
            .attr("class", "axisContainer");

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
      .append("circle")
      .attr("class", "marker")
      .attr("r", 5)
      .attr("fill", (d, i) => color(i))
      .attr("stroke", (d, i) => d3.rgb(color(i)).darker())
      .attr("stroke-width", 2)
      .attr("cx", (d) => d.x)
      .attr("cy", height / 2);

    svg.append("circle")
      .attr("class", "node")
      .attr("r", nodeR);

  };

  this.update = (entity, stages) => {
    //set vars
    var n = 1;

    var nodes = d3.range(n).map(function() {
      var i = entity.currentStageId;
      return {
        color: color(i)
      };
    });

    const stage = stages[entity.currentStageId];
    var nodeX = stage.x * 2;

    d3.nest()
      .key((d) => d.color)
      .entries(nodes)
      .forEach(force);

    //draw node and set force
    function force(entry, i) {
      var nodes = entry.values;

      var force = d3.layout.force()
            .nodes(nodes)
            .size([nodeX, height])
            .gravity(0.2)
            .charge(0)
            .on("tick", tick)
            .start();

      var circle = svg.selectAll(".node")
            .data(nodes)
            .call(force.drag);

      function tick(e) {
        circle
          .attr("cx", (d) => d.x)
          .attr("cy", (d) => d.y)
          .style("fill", (d) => d.color);
      }
    }
  };
}

export { StageChart };
