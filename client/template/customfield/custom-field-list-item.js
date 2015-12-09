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
            var cfMaster = {};
            for (var cf in parentCompany.customFields) {
              if (cf !== self.name) {
                cfMaster[cf] = parentCompany.customFields[cf];
              }
            }
            Companies.update(parentCompany._id, {
              $set: {
                customFields: cfMaster
              }
            });
            break;
          case "contact":
            var parentContact = Contacts.findOne(self.parentEntity.entity_data._id);
            var cfMaster = {};
            for (var cf in parentContact.customFields) {
              if (cf !== self.name) {
                cfMaster[cf] = parentContact.customFields[cf];
              }
            }
            Contacts.update(parentContact._id, {
              $set: {
                customFields: cfMaster
              }
            });
            break;
          case "project":
            var parentProject = Projects.findOne(self.parentEntity.entity_data._id);
            var cfMaster = {};
            for (var cf in parentProject.customFields) {
              if (cf !== self.name) {
                cfMaster[cf] = parentProject.customFields[cf];
              }
            }
            Projects.update(parentProject._id, {
              $set: {
                customFields: cfMaster
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
