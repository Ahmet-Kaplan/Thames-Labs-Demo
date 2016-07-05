import 'meteor/jesperwe:bootstrap-select';
import './permission-options.css';
import './permission-options.html';

Template.permissionOptions.onRendered(function() {
  $('.selectpicker').each(function(i, obj) {
    _.each(self.selectOptions, function(option) {
      if (option === obj.id.replace('Selector', '')) {
        $('#' + obj.id).selectpicker('val', option);
      }
    });
  });
  $('.selectpicker').selectpicker();
  $('.selectpicker').selectpicker('setStyle', 'btn-xs', 'add');
});