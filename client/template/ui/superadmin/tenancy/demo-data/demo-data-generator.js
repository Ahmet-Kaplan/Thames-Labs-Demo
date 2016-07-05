Template.demoDataGeneratorModal.onRendered(function() {
  $('#progressIndicator').hide();
});

Template.demoDataGeneratorModal.helpers({
  percentComplete: function() {
    return 0;
  }
});

Template.demoDataGeneratorModal.events({
  'click #startGeneration': function(event, template) {
    event.preventDefault();
    var options = {
      companies: ($('#companyCount').val() === "" ? 0 : Number($('#companyCount').val())),
      contacts: ($('#contactCount').val() === "" ? 0 : Number($('#contactCount').val())),
      opportunities: ($('#oppCount').val() === "" ? 0 : Number($('#oppCount').val())),
      projects: ($('#projectCount').val() === "" ? 0 : Number($('#projectCount').val())),
      purchaseOrders: ($('#purchaseCount').val() === "" ? 0 : Number($('#purchaseCount').val())),
      products: ($('#productCount').val() === "" ? 0 : Number($('#productCount').val())),
      tasks: ($('#taskCount').val() === "" ? 0 : Number($('#taskCount').val())),
      activities: ($('#activityCount').val() === "" ? 0 : Number($('#activityCount').val())),
    };

    Meteor.call('tenant.generateDemoData', this.__originalId, options, function(err, res) {
      if(err) {
        toastr.error("Error during demo data generation: " + err);
        return;
      }

      toastr.success('Demo data generation completed successfully');
      Modal.hide();
    });
  }
});
