// var message = '<p class="maintenance-message">RealtimeCRM is currently undergoing maintenance and will be back soon.</p>';
//
//
// Template.maintenance.rendered = function() {
//   this.loading = window.pleaseWait({
//     logo: '/img/icon.svg',
//     backgroundColor: '#3388c6',
//     loadingHtml: message
//   });
// };

Template.maintenance.destroyed = function() {
  if (this.loading) {
    this.loading.finish();
  }
};
