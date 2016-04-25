getNewStageId = function(stages) {
  var maxVal = -1;
  _.each(stages, function(s) {
    if (s.id > maxVal) {
      maxVal = s.id
    }
  });
  return maxVal + 1;
};

Template.insertNewStageModal.onCreated(function() {
  var userTenant = Tenants.findOne({_id: Meteor.user().group});
  var stages = userTenant.settings.opportunity.stages;
  if (!stages) {
    Tenants.update(userTenant._id, {
      $set: {
        'settings.opportunity.stages': []
      }
    });
  }
});

Template.insertNewStageModal.events({
  'click #addStage': function() {
    var userTenant = Tenants.findOne({_id: Meteor.user().group});
    var stages = userTenant.settings.opportunity.stages;
    var orderValue = stages.length;

    if (!stages) return null;

    var disallowed = false;
    _.each(stages, function(s) {
      if (s.title === $('#stage-title').val()) {
        disallowed = true;
      }
    });

    if (disallowed) {
      toastr.error("A stage with that name already exists.");
      return null;
    }
    var stageData = {
      title: $('#stage-title').val(),
      description: $('#stage-description').val(),
      order: orderValue,
      id: getNewStageId(stages)
    };

    stages.push(stageData);
    Tenants.update(userTenant._id, {
      $set: {
        'settings.opportunity.stages': stages
      }
    });
    Modal.hide();
  }
});
