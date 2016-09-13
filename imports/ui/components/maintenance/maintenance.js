import './maintenance.html';
import './maintenance.css';

Template.maintenance.onRendered(function() {
  $('body').css('background-color', '#3388c6');
});

Template.maintenance.onDestroyed(function() {
  $('body').css('background-color', '#fff');
  if (this.loading) {
    this.loading.finish();
  }
});
