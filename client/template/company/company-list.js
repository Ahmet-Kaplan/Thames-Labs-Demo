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
    return Companies.find({}).count();
  },
  hasMultipleCompanies: function() {
    return Companies.find({}).count() !== 1;
  }
});

AutoForm.hooks({
  insertCompanyForm: {
    before: {
      insert: function(doc) {
        doc.createdBy = Meteor.userId();
        return doc;
      }
    },
    onSuccess: function() {
      Modal.hide();
    },
    after: {
      insert: function(error, result) {
        Router.go('/companies/' + result);
        $(".modal-backdrop").remove();
        $("body").removeClass('modal-open');
      }
    }
  }
});
