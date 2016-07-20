import { Blaze } from 'meteor/blaze';
import { Template } from 'meteor/templating';
import 'meteor/mrt:jquery-ui-sortable';
import './global-custom-field-list.html';

Template.globalCustomFieldList.onRendered(function() {
  const entity = Template.currentData().entity;
  const selector = `#${entity}-custom-fields`;
  $(selector).sortable({
    handle:'.handle',
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
      Meteor.call('changeCfOrder', fieldId, fieldTarget, newIndex, group);

      //Prevent DOM updates to let Meteor + Blaze handle it
      $(this).sortable('cancel');
    }
  });

});

Template.globalCustomFieldList.onCreated(function() {

  this.entity = Template.currentData().entity;
  Meteor.subscribe('globalCustomFields');
  this.customFields = new ReactiveVar();

  this.autorun(() => {
    var currentFields = CustomFields.find({
      target: this.entity
    }, {
      sort: { order: 1 }
    });
    console.log(currentFields);
    this.customFields.set(currentFields);
  });

});

Template.globalCustomFieldList.helpers({
  fields: function() {
    return Template.instance().customFields.get();

    // return CustomFields.find({
    //   target: this.entity
    // }, {
    //   sort: { order: 1 }
    // });

  }
});
