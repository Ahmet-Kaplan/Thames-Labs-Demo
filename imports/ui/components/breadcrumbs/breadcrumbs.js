import './breadcrumbs.html';

Template.breadcrumbs.onRendered(function() {
  $('#breadcrumb-bar.breadcrumb').css('background', "rgba(0,0,0,0)");
  $('#breadcrumb-bar.breadcrumb').css('padding', 0);
  $('#breadcrumb-bar.breadcrumb').css('margin-bottom', 10);
  $('#breadcrumb-bar.breadcrumb').css('margin-top', 20);
});