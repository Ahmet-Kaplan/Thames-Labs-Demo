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
    return Companies.find({}).count() > 0;
  }
});
