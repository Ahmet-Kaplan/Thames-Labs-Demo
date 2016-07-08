import './stages/modals/insert-opp-stage.js';
import './stages/opportunities-admin-stage.js';
import './opportunities-admin.css';
import './opportunities-admin.html';

import 'meteor/mrt:jquery-ui-sortable';
import { Blaze } from 'meteor/blaze';


Template.opportunitiesAdmin.onRendered(function() {
  $('#opp-stages').sortable({
    handle: '.handle',
    axis: 'y',
    stop: function(event, ui) {
      if (!isProTenant(Meteor.user().group)) {
        showUpgradeToastr('To reorder opportunity stages');
        $(this).sortable('cancel');
        return;
      }
      //Setup needed variables
      const stageId = Blaze.getData(ui.item[0]).id;
      const newIndex = $(this).find('.opportunity-stage').index(ui.item);

      //Update data stores
      Meteor.call('changeStageOrder', stageId, newIndex);

      //Prevent DOM updates to let Meteor + Blaze handle it
      $(this).sortable('cancel');
    }
  });
});

Template.opportunitiesAdmin.onCreated(function() {
  this.stages = new ReactiveVar();
  this.autorun(() => {
    var currentStages = Tenants.findOne({
      _id: Meteor.user().group
    }).settings.opportunity.stages;
    this.stages.set(currentStages);
  });
});

Template.opportunitiesAdmin.helpers({
  stages: function() {
    return Template.instance().stages.get();
  },
  hasStages: function() {
    var userTenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (!userTenant || !userTenant.settings) return false;
    var stages = userTenant.settings.opportunity.stages;
    if (!stages) return false;
    return stages.length > 0;
  },
  options: {
    sort: true,
    sortField: 'order'
  }
});

Template.opportunitiesAdmin.events({
  'click #btnAddStage': function(event) {
    event.preventDefault();

    if (!isProTenant(Meteor.user().group)) {
      showUpgradeToastr('To create your own opportunity stages');
      return;
    }

    Modal.show('insertOppStage', this);
  }
});