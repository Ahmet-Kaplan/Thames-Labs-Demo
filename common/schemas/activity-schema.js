Schemas.Activity = new SimpleSchema({
  type: {
    type: String,
    allowedValues: [
      'Note',
      'Email',
      'Call'
    ]
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date
  },
  activityTimestamp: {
    type: Date,
    label: "Activity Date/Time",
    autoform: {
      afFieldInput: {
        type: "bootstrap-datetimepicker",
        defaultValue: new Date(),
        dateTimePickerOptions: function() {
          return {
            format: 'DD/MM/YYYY HH:mm',
            useCurrent: false,
            sideBySide: true
          };
        }
      }
    }
  },
  companyId: {
    type: String,
    label: 'Company',
    optional: true
  },
  contactId: {
    type: String,
    label: 'Contact',
    optional: true
  },
  projectId: {
    type: String,
    label: 'Project',
    optional: true
  },
  purchaseOrderId: {
    type: String,
    label: 'Purchase Order',
    optional: true
  },
  opportunityId: {
    type: String,
    label: 'Opportunity',
    optional: true
  },
  taskId: {
    type: String,
    label: 'Task',
    optional: true
  },
  primaryEntityType: {
    type: String,
    optional: true
  },
  primaryEntityDisplayData: {
    type: String,
    optional: true
  },
  primaryEntityId: {
    type: String,
    optional: true
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
  }
});
Activities.attachSchema(Schemas.Activity);