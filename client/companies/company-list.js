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
  },
  companyCount: function() {
    return Companies.find({}).count();
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
