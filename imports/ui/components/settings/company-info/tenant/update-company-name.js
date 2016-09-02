import './update-company-name.html';
import { Tenants } from '/imports/api/collections.js';

Template.updateCompanyName.helpers({
  tenant: function() {
    return Tenants.findOne({_id: Partitioner.group()});
  },
});

Template.updateCompanyName.events({
  'submit #tenantNameForm': function(event, template) {
    event.preventDefault();
    var newName = $(event.target).find('input').val();

    if (newName === "") {
      toastr.error('You must provide a name.');
      return;
    }

    Tenants.update(Partitioner.group(), {$set: {"name": newName}}, function(err) {
      if(err) {
        toastr.error(err.reason);
        return;
      }
      toastr.success("Company name updated successfully.");
    });

  }
});

