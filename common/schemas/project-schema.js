Schemas.Project = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  description: {
    type: String,
    label: "Description",
    optional: true
  },
  companyId: {
    type: String,
    optional: true,
    custom: function() {
      if (!this.isSet && !this.field('contactId').isSet) {
        return "needsRelatedEntity";
      }
    }
  },
  contactId: {
    type: String,
    optional: true,
    custom: function() {
      if (!this.isSet && !this.field('companyId').isSet) {
        return "needsRelatedEntity";
      }
    }
  },
  userId: {
    type: String,
    label: "Account Manager"
  },
  value: {
    type: Number
  },
  createdBy: {
    type: String,
    autoform: {
      type: "hidden"
    }
  },
  tags: {
    type: [String],
    optional: true,
    autoform: {
      type: 'hidden'
    }
  },
  dueDate: {
    type: Date,
    optional: true,
    autoform: {
      afFieldInput: {
        dateTimePickerOptions: {
          format: 'DD/MM/YYYY HH:mm',
          useCurrent: true,
          sideBySide: true,
          widgetPositioning: {
            vertical: "top"
          }
        }
      }
    }
  },
  staff: {
    type: [String],
    optional: true
  },
  customFields: {
    type: Object,
    blackbox: true,
    optional: true,
    autoform: {
      type: "hidden"
    }
  }
});
Schemas.Project.messages({
  needsRelatedEntity: "A company or a contact is required"
});
Projects.attachSchema(Schemas.Project);