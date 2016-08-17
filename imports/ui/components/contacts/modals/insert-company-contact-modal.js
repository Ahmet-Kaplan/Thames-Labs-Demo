import './insert-company-contact-modal.html';

Template.insertCompanyContactModal.helpers({
  currentUser: function() {
    return Meteor.userId();
  },
  companyName: function() {
    return this.name;
  },
  showTitleField: function() {
    var tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (tenant && tenant.settings.contact.titles && tenant.settings.contact.titles.length > 0) return true;
    return false;
  }
});

Template.insertCompanyContactModal.onRendered(function() {
  if (Meteor.user()) {
    var tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (tenant) {
      var options = [];
      if (tenant.settings.contact.titles) {
        options = _.map(tenant.settings.contact.titles.split(','), function(input) {
          return {
            value: input,
            text: input
          };
        });
      }

      this.$("#contactTitlePicklist").selectize({
        delimiter: ',',
        create: false,
        options: options,
        maxItems: 1,
        selectOnTab: true,
        allowEmptyOption: true,
        sortField: 'text'
      });
    }
  }
});
