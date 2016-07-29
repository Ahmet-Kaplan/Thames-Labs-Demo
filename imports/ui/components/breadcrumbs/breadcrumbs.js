import './breadcrumbs.html';

Template.breadcrumbs.onRendered(function() {
  $('#breadcrumb-bar.breadcrumb').css('background', "rgba(0,0,0,0)");
  $('#breadcrumb-bar.breadcrumb').css('padding-bottom', 0);
  // $('#breadcrumb-bar.breadcrumb').css('float', 'left');
  // $('#breadcrumb-bar.breadcrumb').css('width', '90%');
});