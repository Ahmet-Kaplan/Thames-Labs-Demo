Template.salesPipeline.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadOpportunities');

    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To access the Sales Pipeline');
      FlowRouter.go('/');
    }
  });
});

Template.salesPipeline.onRendered(function() {
  Session.set('currentStageId', null);
  $.getScript('/vendor/d3-funnel.js', function(dataRec, textStatus, jqxhr) {
    if (jqxhr.status == 200) {
      Tracker.autorun(function() {
        var userTenant = Tenants.findOne({
          _id: Meteor.user().group
        });
        var stages = userTenant.settings.opportunity.stages.sort(function(a, b) {
          if (a.order < b.order) return -1;
          if (a.order > b.order) return 1;
          return 0;
        });

        var data = [];
        for (var i = 0; i < stages.length; i++) {
          var count = Opportunities.find({
            currentStageId: stages[i].id
          }).count();
          if (count > 0) {
            var item = [stages[i].title, count];
            data.push(item);
          }
        }

        if (data.length > 0) {
          var options = {
            dynamicArea: true,
            hoverEffects: true,
            onItemClick: function(e) {
              var id = _.result(_.find(stages, function(stg) {
                return stg.title === e.label;
              }), 'id');

              Session.set('currentStageId', id);
            }
          };
          options.width = $("#funnel-container").width();

          var chart = new D3Funnel('#funnel');
          chart.draw(data, options);

          $(window).on("resize", function() {
            options.width = $("#funnel-container").width();
            var newChart = new D3Funnel('#funnel');
            newChart.draw(data, options);
          });
        }
      });
    }
  });
});

Template.salesPipeline.onDestroyed(function() {
  $(window).unbind('resize');
});

Template.salesPipeline.helpers({
  hasData: function() {
    return (Opportunities.find({}).count() > 0);
  },
  stages: function() {
    var userTenant = Tenants.findOne({_id: Meteor.user().group});
    return userTenant.settings.opportunity.stages.sort(function(a, b) {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });
  },
  selectedStage: function() {
    var id = Session.get('currentStageId');
    var userTenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    var stages = userTenant.settings.opportunity.stages.sort(function(a, b) {
      if (a.order < b.order) return -1;
      if (a.order > b.order) return 1;
      return 0;
    });

    var data = null;
    _.each(stages, function(stage) {
      if (stage.id === id) data = stage;
    });
    return data;
  },
  stageValues: function() {
    var id = Session.get('currentStageId');
    var total = 0;
    var opps = Opportunities.find({
      currentStageId: id
    }).fetch();

    _.each(opps, function(o) {
      if (o.value) {
        total += parseFloat(o.value);
      }
    });

    return {
      totalValue: parseFloat(total).toFixed(2),
      averageValue: parseFloat(total / opps.length).toFixed(2)
    };
  },
  opportunities: function() {
    var id = Session.get('currentStageId');
    return Opportunities.find({
      currentStageId: id
    }).fetch();
  }
});
