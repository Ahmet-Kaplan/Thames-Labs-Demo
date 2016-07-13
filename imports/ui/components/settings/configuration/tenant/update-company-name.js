import './update-company-name.html';

Template.updateCompanyName.helpers({
  tenant: function() {
    return Tenants.findOne({_id: Partitioner.group()});
  },
  phoneNumber: function() {
    return _.get(Meteor.user(), 'profile.telephone');
  }
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

