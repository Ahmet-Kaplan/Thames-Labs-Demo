Schemas.Project = new SimpleSchema({
  sequencedIdentifier: {
    type: Number,
    label: "RealTime ID",
    optional: true
  },
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
    label: "Company",
    custom: function() {
      if (!this.isSet && !this.field('contactId').isSet) {
        return "needsRelatedEntity";
      }
    }
  },
  contactId: {
    type: String,
    optional: true,
    label: "Contact",
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
    type: Number,
    decimal: true
  },
  active: {
    type: Boolean,
    defaultValue: true
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
      type: "bootstrap-datepicker",
      datePickerOptions: {
        autoclose: true,
        format: 'dd/mm/yyyy',
        todayHighlight: true
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
  },
  extendedInformation: {
    type: [Object],
    blackbox: true,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  documents: {
    type: [Object],
    blackbox: true,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  projectTypeId: {
    type: Number,
    label: "Project Type",
    defaultValue: 0
  },
  projectMilestoneId: {
    type: Number,
    defaultValue: 0
  },
  createdAt: {
    type: Date,
    defaultValue: new Date()
  }
});
Schemas.Project.messages({
  needsRelatedEntity: "A company or a contact is required"
});
Projects.attachSchema(Schemas.Project);