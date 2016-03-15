Schemas.Task = new SimpleSchema({
  title: {
    type: String
  },
  description: {
    type: String,
    optional: true
  },
  dueDate: {
    type: Date,
    optional: true,
    autoform: {
      type: "bootstrap-datetimepicker",
      dateTimePickerOptions: {
        format: 'DD/MM/YYYY HH:mm',
        useCurrent: false,
        defaultValue: false,
        sideBySide: false,
        widgetPositioning: {
          vertical: 'top'
        }
      }
    }
  },
  remindMe: {
    type: Boolean,
    defaultValue: false,
    label: 'Send reminder'
  },
  reminder: {
    type: String,
    optional: true,
    autoform: {
      type: 'hidden'
    }
  },
  taskReminderJob: {
    type: String,
    optional: true,
    autoform: {
      type: 'hidden'
    }
  },
  isAllDay: {
    type: Boolean,
    defaultValue: true,
    optional: true,
    label: 'Due all day'
  },
  assigneeId: {
    type: String
  },
  completed: {
    type: Boolean,
    defaultValue: false
  },
  completedAt: {
    type: Date,
    optional: true
  },
  entityType: {
    type: String
  },
  entityId: {
    type: String
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
  duration: {
    type: String,
    optional: true
  }
});
Tasks.attachSchema(Schemas.Task);