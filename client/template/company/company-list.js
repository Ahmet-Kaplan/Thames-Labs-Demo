Template.companyList.onRendered(function() {
  var sidebar = $('.sidebar');
  sidebar.affix({
    offset: {
      top: sidebar.offset().top
    }
  });

  // Watch for session variable setting search
  Session.set('companyListSearchQuery', null);
  Tracker.autorun(function() {
    var searchQuery = Session.get('companyListSearchQuery');
    var easySearchInstance = EasySearch.getComponentInstance({
      index: 'companies'
    });
    if (searchQuery) {
      easySearchInstance.search(searchQuery);
      $('.sidebar input').val(searchQuery);
    }
  });
  $('[data-toggle="tooltip"]').tooltip({
    delay: {"show": 1000, "hide": 100}
  });
});

Template.companyList.helpers({
  hasCompanies: function() {
    return Companies.find({}).count() > 0;
  },
  companyCount: function() {
    return Companies.find({}).count();
  },
  hasMultipleCompanies: function() {
    return Companies.find({}).count() !== 1;
  }
});

Template.companyList.events({
  'click #createCompany': function() {
    Modal.show('insertNewCompanyModal', this);
  }
});
