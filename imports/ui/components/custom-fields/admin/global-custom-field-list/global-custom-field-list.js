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
          const field = Blaze.getData(ui.item[0]),
                currentIndex = field.order,
                newIndex = $(this).find('.custom-field-item').index(ui.item);
          console.log(field);
          console.log(newIndex);
          console.log(currentIndex);

          //Update data stores
          Meteor.call('changeExtInfoOrder', field, newIndex);

          //Prevent DOM updates to let Meteor + Blaze handle it
          $(this).sortable('cancel');
        }
      });
    }
  });

});
