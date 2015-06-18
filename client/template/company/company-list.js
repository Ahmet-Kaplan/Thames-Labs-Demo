Template.companyList.onRendered(function() {
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
    }
  });
});

Template.companyList.helpers({
  pageTitle: function() {
    return GetRoutedPageTitle(Router.current().route.getName());
    // var title = Router.current().route.getName();
    // return title.charAt(0).toUpperCase() + title.slice(1);
  },
  hasCompanies: function() {
    return g_Companies.find({}).count() > 0;
  },
  companyCount: function() {
    return g_Companies.find({}).count();
  },
  hasMultipleCompanies: function() {
    return g_Companies.find({}).count() !== 1;
  }
});
