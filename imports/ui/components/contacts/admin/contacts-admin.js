import './contacts-admin.css';
import './contacts-admin.html';

Template.contactsAdmin.onRendered(function() {
  var tenant = Tenants.findOne({
    _id: Meteor.user().group
  });
  if (tenant) {
    var options = [];
    var items = [];
    if (tenant.settings.contact.titles) {
      items = tenant.settings.contact.titles.split(',').sort(function(a, b) {
        return a.localeCompare(b);
      });
      options = _.map(tenant.settings.contact.titles.split(','), function(input) {
        return {
          value: input,
          text: input
        };
      });
    }

    this.$("#contactAdminTitles").selectize({
      create: function(input) {
        return {
          value: input,
          text: input
        };
      },
      items: items,
      options: options
    });
  }
});

Template.contactsAdmin.events({
  'click #contactAdminUpdateTitles': function(event, template) {
    var values = $('#contactAdminTitles').selectize().val();

    Tenants.update({
      _id: Meteor.user().group
    }, {
      $set: {
        'settings.contact.titles': values
      }
    }, function(err) {
      if (err) toastr.error('Could not save list of titles.');
    });

    toastr.success('Title list updated successfully.');
  }
});