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
    bootbox.confirm("Are you sure you wish to delete this extended information field?", function(result) {
      if (result === true) {

        switch (self.parentEntity.entity_type) {
          case "company":
            var parentCompany = Companies.findOne(self.parentEntity.entity_data._id);
            var cfMaster = [];
            for (var cf in parentCompany.extendedInformation) {
              if (parentCompany.extendedInformation[cf].dataName !== self.name) {
                cfMaster.push(parentCompany.extendedInformation[cf]);
              }
            }
            Companies.update(parentCompany._id, {
              $set: {
                extendedInformation: cfMaster
              }
            });
            break;
          case "contact":
            var parentContact = Contacts.findOne(self.parentEntity.entity_data._id);
            var ccfMaster = [];
            for (var ccf in parentContact.extendedInformation) {
              if (parentContact.extendedInformation[ccf].dataName !== self.name) {
                ccfMaster.push(parentContact.extendedInformation[ccf]);
              }
            }
            Contacts.update(parentContact._id, {
              $set: {
                extendedInformation: ccfMaster
              }
            });
            break;
          case "project":
            var parentProject = Projects.findOne(self.parentEntity.entity_data._id);
            var cpfMaster = [];
            for (var cpf in parentProject.extendedInformation) {
              if (parentProject.extendedInformation[cpf].dataName !== self.name) {
                cpfMaster.push(parentProject.extendedInformation[cpf]);
              }
            }
            Projects.update(parentProject._id, {
              $set: {
                extendedInformation: cpfMaster
              }
            });
            break;
        }
        toastr.success('Extended information field removed.');
      } else {
        return;
      }
    });
  }
});
