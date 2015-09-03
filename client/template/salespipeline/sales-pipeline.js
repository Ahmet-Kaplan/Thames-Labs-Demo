Template.salesPipeline.onCreated(function() {
  // Redirect if read permission changed - we also check the initial load in the router
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadOpportunities');
  });
});

Template.salesPipeline.onRendered(function() {
  Session.set('currentStageId', null);
  $.getScript('/vendor/d3-funnel.js', function(data, textStatus, jqxhr) {
    if (jqxhr.status = 200) {
      Tracker.autorun(function() {
        var stages = OpportunityStages.find({}, {sort: { order: 1}}).fetch();

        var data = [];
        for (var i=0; i < stages.length; i++) {
          var count = Opportunities.find({currentStageId: stages[i]._id}).count();
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
              Session.set('currentStageId', OpportunityStages.findOne({title: e.label})._id);
            }
          };
          options.width = $("#funnel-container").width();

          var chart = new D3Funnel('#funnel');
          chart.draw(data, options);

          $(window).on("resize", function() {
              options.width = $("#funnel-container").width();
              var chart = new D3Funnel('#funnel');
              chart.draw(data, options);
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
    return OpportunityStages.find({}, {sort: { order: 1}}).fetch();
  },
  selectedStage: function() {
    var id = Session.get('currentStageId');
    return OpportunityStages.findOne({_id: id});
  },
  opportunities: function() {
    var id = Session.get('currentStageId');
    return Opportunities.find({currentStageId: id}).fetch();
  }
});
