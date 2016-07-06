import _ from 'lodash';
import d3 from 'd3';
import d3tip from 'd3-tip';

d3tip(d3);

function StageChart(el) {
  this.w = $(el).innerWidth();
  this.h = '100px';
  this.r = '5';

  this.stages = [];
  this.node = [];

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

  this.force = d3.layout.force()
    .size([this.w, this.h])
    .nodes(this.node);

  this.draw = (node, stages) => {
    this.stages = stages;
    this.node.push(node);
    // this._setNodeX();
    this._stagesChart();
    this._drawNode();
    this.force.start();
  };

  this.updateNode = (node) => {
    this.node = [];
    this.node.push(node);
    this.force.nodes(this.node);
    // this._setNodeX();
    this._updateNode();
  };

  // this._setNodeX = () => {
  //   this.stages.forEach( (stage) => {
  //     if(stage.id == this.node[0].currentStageId) {
  //       this.node[0].x = stage.x;
  //       console.log(stage.x);
  //       console.log(this.node[0].x);
  //     }
  //   });
  // };

  this._drawNode = () => {

    this.svg
      .append("circle")
      .attr("class", "node");

    this.svg.selectAll(".node")
      .attr("fill", this.fillColor(this.node[0].currentStageId))
      .attr("stroke-width", 2)
      .attr("stroke", d3.rgb(this.fillColor(this.node[0].currentStageId)).darker())
      .attr("r", "30")
      .attr("cy", this.h / 3)
      .attr("cx", this.node[0].x)
      .call(this.force.drag);
  };

  this._updateNode = () => {

    this.svg.selectAll(".node")
      .attr("fill", this.fillColor(this.node[0].currentStageId))
      .attr("stroke", d3.rgb(this.fillColor(this.node[0].currentStageId)).darker())
      .attr("cx", this.node[0].x);
  };


  this._stagesChart = () => {

    //Layout
    this.stageWidth = this.w / this.stages.length;
    this.stages.forEach( (stage, i) => {
      stage.x = (0.5 + i) * this.stageWidth;
    });
    this.w = this.stageWidth * this.stages.length;
    this.h = $(el).innerHeight();

    //Forces
    this.force.size([this.w, this.h]);
    this.force.gravity(0.05);
    this.force.on("tick", (e) => {

      const stage = this.stages[this.node[0].currentStageId];
      this.node[0].x = stage.x * e.alpha * 0.3;
      console.log(stage.x);
      console.log(this.node[0]);
      this.svg.selectAll(".node")
        .attr("cx", stage.x);
    });
    this.force.drag()
      .on("dragend", (d) => {});


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
      .attr("r", (d) => this.r)
      .attr("fill", (d, i) => this.fillColor(i))
      .attr("stroke", (d, i) => d3.rgb(this.fillColor(i)).darker())
      .attr("stroke-width", 2)
      .attr("cx", (d) => d.x)
      .attr("cy", this.h / 3);

    if (this.w > 650) {
      axisContainer.selectAll(".marketText")
        .data(this.stages, (d) => d.id)
        .enter()
        .append("foreignObject")
        .attr("width", this.stageWidth)
        .attr("height", 10)
        .attr("x", (d) => d.x)
        .attr("y", this.h - (this.h / 4))
        .append("xhtml:div")
        .html( (d) => `${d.title}`);
    }

  };
}

export { StageChart };
