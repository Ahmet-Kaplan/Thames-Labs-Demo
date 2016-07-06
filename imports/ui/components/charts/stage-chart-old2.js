import _ from 'lodash';
import d3 from 'd3';

function StageChart(el) {
  var width = $(el).innerWidth(),
      height = '100',
      markerRadius = 5;

  var fillColor = d3.scale.ordinal()
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

  var svg = d3.select(el).append('svg')
        .attr("width", width)
        .attr("height", height);

  var drawAxis = (stages) => {
    console.log("axis");
    var stageWidth = width / stages.length;
    stages.forEach( (stage, i) => {
      stage.x = (0.5 + i) * stageWidth;
    });
    width = stageWidth * stages.length;

    // draw x axis
    const axisContainer = svg.append("g")
            .attr("class", "axisContainer");

    axisContainer.append("line")
      .attr("class", "stageAxis")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", height / 3)
      .attr("y2", height / 3)
      .attr("stroke-width", 2)
      .attr("stroke", "#ccc");

    axisContainer.selectAll(".marker")
      .data(stages, (d) => d.id)
      .enter()
      .append("circle")
      .attr("class", "marker")
      .attr("r", (d) => markerRadius)
      .attr("fill", (d, i) => fillColor(i))
      .attr("stroke", (d, i) => d3.rgb(fillColor(i)).darker())
      .attr("stroke-width", 2)
      .attr("cx", (d) => d.x)
      .attr("cy", height / 3);
  };

  var drawCircle = (node) => {
    console.log("circle");
    svg.append("g")
          .attr("transform", "translate( 50 )")
          .selectAll("circle")
          .data(node)
          .enter().append("circle")
          .attr("r", 20);
  };

  var setForce = (node) => {
    console.log("force");
  };

  this.start = (node, stages) => {
    drawAxis(stages);
    drawCircle(node);
    setFetForce(node);
  };
}

export { StageChart };
