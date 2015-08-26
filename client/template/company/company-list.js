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
  'click #createCompany': function(event) {
    event.preventDefault();
    Modal.show('insertNewCompanyModal', this);
  }
});
