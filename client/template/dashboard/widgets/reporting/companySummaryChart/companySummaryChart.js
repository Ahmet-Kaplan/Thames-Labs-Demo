globalSBCRef = undefined;
globalBCRef = undefined;
globalPCRef = undefined;
globalDCRef = undefined;
globalPACRef = undefined;

Template.companySummaryChartWidget.onCreated(function() {
  this.totalCompanies = new ReactiveVar(0);
  this.totalContacts = new ReactiveVar(0);
  this.totalProjects = new ReactiveVar(0);
  this.totalOpportunities = new ReactiveVar(0);
  this.totalProducts = new ReactiveVar(0);
});

Template.companySummaryChartWidget.onRendered(function() {
  var template = this;

  var chartType = $('#chartTypeSelect').val();
  refreshData(template);
  buildChart(template, chartType);
});

Template.companySummaryChartWidget.events({
  'click #ref_companySummaryChartWidget': function(event, template) {
    clearOldCharts();

    var chartType = $('#chartTypeSelect').val();
    refreshData(template);
    buildChart(template, chartType)
  }
});

refreshData = function(template) {
  Meteor.call('report.companiesStored', function(err, data) {
    template.totalCompanies.set(data.Count);
  });
  Meteor.call('report.contactsStored', function(err, data) {
    template.totalContacts.set(data.Count);
  });
  Meteor.call('report.numberOfProjects', function(err, data) {
    template.totalProjects.set(data.Count);
  });
  Meteor.call('report.numberOfOpportunities', function(err, data) {
    template.totalOpportunities.set(data.Count);
  });
  Meteor.call('report.numberOfProducts', function(err, data) {
    template.totalProducts.set(data.Count);
  });
}

buildChart = function(template, chartType) {
  var ctx = document.getElementById("companySummaryChartDisplayArea").getContext("2d");
  var data = null, options = null;

  switch (chartType) {
    case 'stacked-bar':
      data = {
        labels: ["Companies", "Contacts", "Opportunities", "Projects", "Products"],
        datasets: [{
          label: "Companies",
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: [template.totalCompanies.get(), template.totalContacts.get(), template.totalOpportunities.get(), template.totalProjects.get(), template.totalProducts.get()]
        }]
      };

      options = {
        scaleBeginAtZero: true,
        scaleShowGridLines: true,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        barShowStroke: true,
        barStrokeWidth: 2,
        barValueSpacing: 5,
        relativeBars: false,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
        tooltipHideZero: false
      }
      var StackedBarChartObject = new Chart(ctx).StackedBar(data, options);
      globalSBCRef = StackedBarChartObject;
      break;

    case 'bar':
      data = {
        labels: ["Companies", "Contacts", "Opportunities", "Projects", "Products"],
        datasets: [{
          label: "Companies",
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: [template.totalCompanies.get(), 0, 0, 0, 0]
        }, {
          label: "Contacts",
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: [0, template.totalContacts.get(), 0, 0, 0]
        }, {
          label: "Opportunities",
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: [0, 0, template.totalOpportunities.get(), 0, 0]
        }, {
          label: "Projects",
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: [0, 0, 0, template.totalProjects.get(), 0]
        }, {
          label: "Products",
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: [0, 0, 0, 0, template.totalProducts.get()]
        }]
      };

      options = {
        scaleBeginAtZero: true,
        scaleShowGridLines: true,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        barShowStroke: true,
        barStrokeWidth: 2,
        barValueSpacing: 5,
        barDatasetSpacing: 1,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

      }
      var BarChartObject = new Chart(ctx).Bar(data, options);
      globalBCRef = BarChartObject;
      break;

    case 'pie':
      data = [{
        value: template.totalCompanies.get(),
        color: "#ff0006",
        highlight: "#ff3b3f",
        label: "Companies"
      }, {
        value: template.totalContacts.get(),
        color: "#0040ff",
        highlight: "#3d57ff",
        label: "Contacts"
      }, {
        value: template.totalOpportunities.get(),
        color: "#ffed00",
        highlight: "#fcff70",
        label: "Opportunities"
      }, {
        value: template.totalProjects.get(),
        color: "#33ff00",
        highlight: "#91ff70",
        label: "Projects"
      }, {
        value: template.totalProducts.get(),
        color: "#9600ff",
        highlight: "#a249fb",
        label: "Products"
      }];
      options = {
        segmentShowStroke: true,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        percentageInnerCutout: 0,
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"

      };
      var PieChartObject = new Chart(ctx).Pie(data, options);
      globalPCRef = PieChartObject;
      break;

    case 'doughnut':
      data = [{
        value: template.totalCompanies.get(),
        color: "#ff0006",
        highlight: "#ff3b3f",
        label: "Companies"
      }, {
        value: template.totalContacts.get(),
        color: "#0040ff",
        highlight: "#3d57ff",
        label: "Contacts"
      }, {
        value: template.totalOpportunities.get(),
        color: "#ffed00",
        highlight: "#fcff70",
        label: "Opportunities"
      }, {
        value: template.totalProjects.get(),
        color: "#33ff00",
        highlight: "#91ff70",
        label: "Projects"
      }, {
        value: template.totalProducts.get(),
        color: "#9600ff",
        highlight: "#a249fb",
        label: "Products"
      }];
      options = {

        segmentShowStroke: true,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        percentageInnerCutout: 50,
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: true,
        animateScale: false,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
      };
      var DoughtnutChart = new Chart(ctx).Doughnut(data, options);
      globalDCRef = DoughtnutChart;
      break;

    case 'polar':
      data = [{
        value: template.totalCompanies.get(),
        color: "#ff0006",
        highlight: "#ff3b3f",
        label: "Companies"
      }, {
        value: template.totalContacts.get(),
        color: "#0040ff",
        highlight: "#3d57ff",
        label: "Contacts"
      }, {
        value: template.totalOpportunities.get(),
        color: "#ffed00",
        highlight: "#fcff70",
        label: "Opportunities"
      }, {
        value: template.totalProjects.get(),
        color: "#33ff00",
        highlight: "#91ff70",
        label: "Projects"
      }, {
        value: template.totalProducts.get(),
        color: "#9600ff",
        highlight: "#a249fb",
        label: "Products"
      }];

      options = {
        scaleShowLabelBackdrop: true,
        scaleBackdropColor: "rgba(255,255,255,0.75)",
        scaleBeginAtZero: true,
        scaleBackdropPaddingY: 2,
        scaleBackdropPaddingX: 2,
        scaleShowLine: true,
        segmentShowStroke: true,
        segmentStrokeColor: "#fff",
        segmentStrokeWidth: 2,
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        animateRotate: true,
        animateScale: false,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
      }
      var PolarChart = new Chart(ctx).PolarArea(data, options);
      globalPACRef = PolarChart;
      break;
  }
}

clearOldCharts = function() {
  if (globalSBCRef !== undefined) {
    globalSBCRef.destroy();
    globalSBCRef = undefined;
  }
  if (globalBCRef !== undefined) {
    globalBCRef.destroy();
    globalBCRef = undefined;
  }
  if (globalPCRef !== undefined) {
    globalPCRef.destroy();
    globalPCRef = undefined;
  }
  if (globalDCRef !== undefined) {
    globalDCRef.destroy();
    globalDCRef = undefined;
  }
  if (globalPACRef !== undefined) {
    globalPACRef.destroy();
    globalPACRef = undefined;
  }
}
