import _ from 'lodash';
import d3 from 'd3';
import d3tip from 'd3-tip';

d3tip(d3);

function StageChart(el) {
  this.w = $(el).innerWidth();
  this.h = '100px';

  this.stages = [];

  this.svg = d3.select(el)
    .append("svg")
    .attr("width", this.w)
    .attr("height", this.h);

  this.radiusScale = d3.scale.sqrt()
    .range([2, 4]);

  this.fillColor = d3.scale.ordinal()
    .range([
      '#1684c1',
      '#00c99d',
      '#fec41a',
      '#e8425d',
      '#173e5f',
      '#00b3bb',
      '#00c15b',
      '#fd9727',
      '#af1876',
    ]);

  this.updateNodes = (node, stages) => {
    this.node = node;
    this.stages = stages;
    console.log(node);
    this._stagesChart();
    this._drawCircle();
  };

  this._drawCircle = () => {
    console.log('draw circle');
    this.circle = this.svg.selectAll(".node")
      .data(this.node, (d) => d._id);

    this.circle.enter()
      .append("circle")
      .attr("fill", (d) => this.fillColor(d.currentStageIndex))
      .attr("stroke-width", 2)
      .attr("stroke", (d) => d3.rgb(this.fillColor(d.currentStageIndex)).darker())
      .attr("class", "node")
      .style("cursor", "pointer");

    this.circle
      .transition().duration(500)
      .attr("fill", (d) => this.fillColor(d.currentStageIndex))
      .attr("stroke", (d) => d3.rgb(this.fillColor(d.currentStageIndex)).darker())
      .attr("stroke-width", 2)
      .attr("r", 10)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y);

    this.circle.exit()
      .transition() .duration(1000)
      .attr("r", 0);

  };

  this._stagesChart = () => {

    this.stageWidth = this.w / 5;
    this.stages.forEach( (stage, i) => {
      stage.y = (0.5 + i) * this.stageWidth;
    });
    this.w = this.stageWidth * this.stages.length;
    this.h = '100';

    // draw x axis
    const axisContainer = this.svg.append("g")
            .attr("class", "axisContainer");

    axisContainer.append("line")
      .attr("class", "stageAxis")
      .attr("x1", 0)
      .attr("x2", this.w)
      .attr("y1", this.h - (this.h / 3))
      .attr("y2", this.h - (this.h / 3))
      .attr("stroke-width", 2)
      .attr("stroke", "#ccc");

    axisContainer.selectAll(".marker")
      .data(this.stages, (d) => d.id)
      .enter()
      .append("circle")
      .attr("class", "marker")
      .attr("r", 10)
      .attr("fill", (d, i) => this.fillColor(i))
      .attr("stroke", (d, i) => d3.rgb(this.fillColor(i)).darker())
      .attr("stroke-width", 2)
      .attr("cx", (d) => d.y)
      .attr("cy", this.h - (this.h / 3));

    if (this.w > 650) {
      axisContainer.selectAll(".marketText")
        .data(this.stages, (d) => d.id)
        .enter()
        .append("foreignObject")
        .attr("width", this.stageWidth)
        .attr("height", 10)
        .attr("x", (d) => d.y - 30)
        .attr("y", this.h - (this.h / 4))
        .append("xhtml:div")
        .html( (d) => `${d.title}`);
    }
  };
}

export { StageChart };
