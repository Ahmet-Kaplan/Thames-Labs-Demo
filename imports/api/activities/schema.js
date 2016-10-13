export const ActivitySchema = new SimpleSchema({
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
            useCurrent: true,
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
  jobId: {
    type: String,
    label: 'Job',
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