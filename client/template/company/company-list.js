Template.companyList.onRendered(function() {
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
    }
  });
});


Template.companyList.helpers({
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
