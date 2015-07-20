Template.adminStatistics.rendered = function() {

  var users = Meteor.users.find({}).map(function(user) {
    return user.createdAt;
  });

  var dataPoints = new Array(moment().week() + 1);

  var values =_.countBy(users, function(date) {
    return moment(date).week();
  });
  var weeksWithData = _.keys(values);
  var signUpsPerWeek = _.values(values);

  var i;
  for (i = 0; i < dataPoints.length; i++) {
    var index = _.indexOf(weeksWithData, i.toString())
    if (index >= 0) {
      dataPoints[i] = signUpsPerWeek[index];
    }
    else {
      dataPoints[i] = 0;
    }
  }
  console.log(dataPoints);
  var data = {
    labels: _.range(0, moment().week() + 1),
    datasets: [
        {
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: dataPoints
        }
    ]
  };
  var options = {
    scaleShowGridLines : true,
    scaleGridLineColor : "rgba(0,0,0,.05)",
    scaleGridLineWidth : 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve : true,
    bezierCurveTension : 0.4,
    pointDot : true,
    pointDotRadius : 4,
    pointDotStrokeWidth : 1,
    pointHitDetectionRadius : 20,
    datasetStroke : true,
    datasetStrokeWidth : 2,
    datasetFill : true,
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
  };

  var ctx = $("#signUpChart").get(0).getContext("2d");
  var myLineChart = new Chart(ctx).Line(data, options);
};

Template.adminStatistics.helpers({
  totalUsers: function() {
    return Meteor.users.find({}).count();
  },
  totalTenants: function() {
    return Tenants.find({}).count();
  }
});