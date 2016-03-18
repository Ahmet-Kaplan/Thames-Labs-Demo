Template.cfDisplay.helpers({
  parentHelper: function(parentContext) {
    this.parentEntity = parentContext;
  },
  trimmedName: function() {
    if (this.dataName) {
      return this.dataName.replace(/\s/g, '');
    }
  },
  isAdvancedText: function() {
    return this.type === "advtext";
  }
});

Template.cfDisplay.events({
  'click #delete-custom-field': function(event) {
    event.preventDefault();
    var self = this;
    bootbox.confirm("Are you sure you wish to delete this custom field?", function(result) {
      if (result === true) {

        switch (self.parentEntity.entity_type) {
          case "company":
            var parentCompany = Companies.findOne(self.parentEntity.entity_data._id);
            Companies.update(parentCompany._id, {
              $pull: {
                extendedInformation: { uuid: self.uuid }
              }
            });
            break;
          case "contact":
            var parentContact = Contacts.findOne(self.parentEntity.entity_data._id);
            Contacts.update(parentContact._id, {
              $pull: {
                extendedInformation: { uuid: self.uuid }
              }
            });
            break;
          case "project":
            var parentProject = Projects.findOne(self.parentEntity.entity_data._id);
            Projects.update(parentProject._id, {
              $pull: {
                extendedInformation: { uuid: self.uuid }
              }
            });
            break;
          case "product":
            var parentProduct = Products.findOne(self.parentEntity.entity_data._id);
            Products.update(parentProduct._id, {
              $pull: {
                extendedInformation: { uuid: self.uuid }
              }
            });
            break;
        }
        toastr.success('Custom field removed.');
      } else {
        return;
      }
    });
  }
});
