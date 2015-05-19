AutoForm.hooks({
  insertContactForm: {
    onSuccess: function() {
      Modal.hide();
    }
  }
});

Template.insertCompanyContactModal.helpers({
  companiesAsOptions: function() {
    console.log('called');

    return Companies.find({}).map(function(company) {
      return {
        'label': company.name,
        'value': company._id
      };
    });
  }
});
