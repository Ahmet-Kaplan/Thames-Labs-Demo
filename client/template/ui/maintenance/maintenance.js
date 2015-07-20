var message = '<p class="maintenance-message">RealtimeCRM is currently undergoing maintenance and will be back soon.</p>';
var spinner = '<div class="sk-spinner sk-spinner-rotating-plane"></div>';

Template.maintenance.rendered = function() {
  this.loading = window.pleaseWait({
    logo: '/img/icon.svg',
    backgroundColor: '#3388c6',
    loadingHtml: message + spinner
  });
};

Template.maintenance.destroyed = function() {
  if (this.loading) {
    this.loading.finish();
  }
};
