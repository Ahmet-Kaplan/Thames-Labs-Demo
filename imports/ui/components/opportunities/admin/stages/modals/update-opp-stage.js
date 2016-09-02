import './update-opp-stage.html';
import { Tenants } from '/imports/api/collections.js';

Template.updateOppStage.onCreated(function() {
  this.originalData = this.data;
});

Template.updateOppStage.onRendered(function() {
  $('#stage-title').val(this.data.title);
  $('#stage-description').val(this.data.description);
});

Template.updateOppStage.events({
  'click #editStage': function(event, template) {
    event.preventDefault();

    var userTenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    var stages = userTenant.settings.opportunity.stages;
    var orig = template.originalData;

    if (!stages) return null;

    var disallowed = false;
    _.each(stages, function(s) {
      if (s.title === $('#stage-title').val() && s.id !== orig.id) {
        disallowed = true;
      }
    });

    if (disallowed) {
      toastr.error("A stage with that name already exists.");
      return null;
    }

    _.each(stages, function(s) {
      if (s.id === orig.id) {
        s.title = $('#stage-title').val();
        s.description = $('#stage-description').val();
      }
    });

    Tenants.update(userTenant._id, {
      $set: {
        'settings.opportunity.stages': stages
      }
    });
    Modal.hide();
  }
});
