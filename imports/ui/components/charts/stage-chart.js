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
    this.svg.selectAll("g.axisContainer").remove();
    this.node = node;
    console.log(this.node);
    this.stages = stages;
    this._stagesChart();
  };


  this._stagesChart = () => {

    //Layout
    this.stageWidth = this.w / this.stages.length;
    this.stages.forEach( (stage, i) => {
      stage.y = (0.5 + i) * this.stageWidth;
      console.log(stage.id);
      console.log(this.node.currentStageId);
      if (stage.id == this.node.currentStageId) {
        stage.r = "30";
      }else {
        stage.r = "5";
      }
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
      .attr("y1", this.h / 3)
      .attr("y2", this.h / 3)
      .attr("stroke-width", 2)
      .attr("stroke", "#ccc");

    axisContainer.selectAll(".marker")
      .data(this.stages, (d) => d.id)
      .enter()
      .append("circle")
      .attr("class", "marker")
      .attr("r", (d) => d.r)
      .attr("fill", (d, i) => this.fillColor(i))
      .attr("stroke", (d, i) => d3.rgb(this.fillColor(i)).darker())
      .attr("stroke-width", 2)
      .attr("cx", (d) => d.y)
      .attr("cy", this.h / 3);

//     if (this.w > 650) {
//       axisContainer.selectAll(".marketText")
//         .data(this.stages, (d) => d.id)
//         .enter()
//         .append("foreignObject")
//         .attr("width", this.stageWidth)
//         .attr("height", 10)
//         .attr("x", (d) => d.y - 30)
//         .attr("y", this.h - (this.h / 4))
//         .append("xhtml:div")
//         .html( (d) => `${d.title}`);
//     }
  };
}

export { StageChart };
