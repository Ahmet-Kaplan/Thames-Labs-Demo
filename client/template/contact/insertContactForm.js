AutoForm.hooks({
  insertContactForm: {
    onSuccess: function() {
      Modal.hide();
    }
  }
});

Template.insertCompanyContactModal.helpers({
  companiesAsOptions: function() {

    return Companies.find({}).map(function(company) {
      return {
        'label': company.name,
        'value': company._id
      };
    });
  },
  currentUser: function() {
    return Meteor.userId();
  }
});

Template.insertContactModal.helpers({
  currentUser: function() {
    return Meteor.userId();
  }
});
