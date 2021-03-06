import '/imports/ui/components/maps/picker/location-picker.js';
import './company-details-form.html';
import './company-details-form.css';

//companyDetailsForm
Template.companyDetailsForm.helpers({
  companyName: function() {
    return this.companyData.name;
  },
  website: function() {
    if (this.companyData.url) return this.companyData.url.toLowerCase();
  },
  phone: function() {
    return this.companyData.phone;
  },
  currentUser: function() {
    return Meteor.user()._id;
  },
  companyData: function() {
    return this.companyData;
  },
  companiesHouseId: function() {
    return this.companyData.companyNumber;
  }
});

Template.companyDetailsForm.events({
  'click #search-again': function() {
    Template.instance().data.searchAgain();
  }
});

AutoForm.hooks({
  insertNewCompanyForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Company created.');
    },
    after: {
      insert: function(error, result) {
        if (error) {
          $("#address_details").show();
          toastr.error(`Company creation error: ${error}`);
          return false;
        }

        FlowRouter.go(`/companies/${result}`);
      }
    }
  }
});