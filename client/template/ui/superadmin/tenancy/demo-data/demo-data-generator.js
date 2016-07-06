Template.demoDataGeneratorModal.onRendered(function() {
  $('#progressIndicator').hide();
  $('#closeCompletion').hide();
});

Template.demoDataGeneratorModal.helpers({
  percentComplete: function() {
    return Number(UserSession.get("importProgress")).toFixed(2);
  }
});

Template.demoDataGeneratorModal.events({
  'click #randomize': function(event, template) {
    event.preventDefault();
    var options = {
      users: _.random(2, 6),
      companies: _.random(2, 40),
      contacts: _.random(2, 40),
      opportunities: _.random(2, 40),
      projects: _.random(2, 40),
      purchaseOrders: _.random(2, 40),
      products: _.random(2, 20),
      tasks: _.random(1, 7),
      activities: _.random(2, 7),
    };

    $('#progressIndicator').show();
    $('#generatorOptions').hide();
    UserSession.set("importProgress", 0);

    Meteor.call('tenant.generateDemoData', this.__originalId, options, function(err, res) {
      if(err) {
        toastr.error("Error during demo data generation: " + err);

        $('#progressIndicator').hide();
        $('#generatorOptions').show();

        return;
      }

      toastr.success('Demo data generation completed successfully');
      Modal.hide();
    });
  },
  'click #startGeneration': function(event, template) {
    event.preventDefault();
    var options = {
      users: ($('#userCount').val() === "" ? 0 : Number($('#userCount').val())),
      companies: ($('#companyCount').val() === "" ? 0 : Number($('#companyCount').val())),
      contacts: ($('#contactCount').val() === "" ? 0 : Number($('#contactCount').val())),
      opportunities: ($('#oppCount').val() === "" ? 0 : Number($('#oppCount').val())),
      projects: ($('#projectCount').val() === "" ? 0 : Number($('#projectCount').val())),
      purchaseOrders: ($('#purchaseCount').val() === "" ? 0 : Number($('#purchaseCount').val())),
      products: ($('#productCount').val() === "" ? 0 : Number($('#productCount').val())),
      tasks: ($('#taskCount').val() === "" ? 0 : Number($('#taskCount').val())),
      activities: ($('#activityCount').val() === "" ? 0 : Number($('#activityCount').val())),
    };

    $('#progressIndicator').show();
    $('#generatorOptions').hide();
    UserSession.set("importProgress", 0);

    Meteor.call('tenant.generateDemoData', this.__originalId, options, function(err, res) {
      if(err) {
        toastr.error("Error during demo data generation: " + err);

        $('#progressIndicator').hide();
        $('#generatorOptions').show();

        return;
      }

      toastr.success('Demo data generation completed successfully');
      Modal.hide();
    });
  }
});
