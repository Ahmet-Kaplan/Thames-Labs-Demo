import { Blaze } from 'meteor/blaze';
import 'meteor/mrt:jquery-ui-sortable';
import './global-custom-field-list.html';

Template.globalCustomFieldList.onRendered(function() {
  const targets = ['company', 'contact', 'project', 'product'];

  targets.forEach(function(entity) {
    const list = document.getElementById(`${entity}-custom-fields`);
    if(list) {
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
                newIndex = $(this).find('.custom-field-item').index(ui.item);

          //Update data stores
          // Meteor.call('changeExtInfoOrder', field, newIndex);

          const fields = CustomFields.find({
            target: fieldTarget,
            global: true
          }).fetch();

          const currentField = _.find(fields, { '_id': fieldId });

          const currentIndex = _.findIndex(fields, { '_id': currentField._id });

          _.pullAt(fields, currentIndex);
          fields.splice(newIndex, 0, currentField);

          _.each(fields, function(value, key) {
            value.order = key;
            CustomFields.update({
              _id: value._id
            }, {
              $set: {
                order: value.order
              }
            });
          });

          //Prevent DOM updates to let Meteor + Blaze handle it
          $(this).sortable('cancel');
        }
      });
    }
  });

});
