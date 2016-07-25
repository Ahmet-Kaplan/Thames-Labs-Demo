import { Blaze } from 'meteor/blaze';
import { Template } from 'meteor/templating';
import 'meteor/mrt:jquery-ui-sortable';
import './global-custom-field-list.html';

Template.globalCustomFieldList.onRendered(function() {
  const entity = Template.currentData().entity,
        selector = `#${entity}-custom-fields`;

  this.autorun(() => {
    Meteor.subscribe('globalCustomFields');
  });

  $(selector).sortable({
    handle: '.handle',
    axis: 'y',
    stop: function(event, ui) {
      if (!isProTenant(Meteor.user().group)) {
        showUpgradeToastr('To reorder custom fields');
        $(this).sortable('cancel');
        return;
      }
      // Setup needed variables
      const fieldId = Blaze.getData(ui.item[0])._id,
            fieldTarget = Blaze.getData(ui.item[0]).target,
            newIndex = $(this).find('.custom-field-item').index(ui.item),
            group = Meteor.user().group;

      //Update data stores
      Meteor.call('customFields.changeOrder', fieldId, fieldTarget, newIndex, group);

      //Prevent DOM updates to let Meteor + Blaze handle it
      $(this).sortable('cancel');
    }
  });
});

Template.globalCustomFieldList.onCreated(function() {
  this.entity = Template.currentData().entity;
  this.customFields = new ReactiveVar();
});

Template.globalCustomFieldList.helpers({
  fields: function() {
    return CustomFields.find({
      target: this.entity,
      entityId: Meteor.user().group
    }, {
      sort: { order: 1 }
    });
  }
});
