export const OpportunitySchema = new SimpleSchema({
  sequencedIdentifier: {
    type: Number,
    label: "RealTime ID",
    optional: true
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  // date: {
  //   type: Date,
  //   autoform: {
  //     afFieldInput: {
  //       dateTimePickerOptions: {
  //         format: 'DD/MM/YYYY HH:mm',
  //         useCurrent: true,
  //         sideBySide: true,
  //         widgetPositioning: {
  //           vertical: "top"
  //         }
  //       }
  //     }
  //   }
  // },
  date: {
    type: Date,
    autoform: {
      type: "bootstrap-datepicker",
      datePickerOptions: {
        autoclose: true,
        format: 'dd/mm/yyyy',
        todayHighlight: true
      }
    }
  },
  nextActionDue: {
    type: Date,
    optional: true,
    autoform: {
      type: "hidden"
    }
  },
  value: {
    type: Number,
    decimal: true,
    optional: true
  },
  estCloseDate: {
    type: Date,
    optional: true,
    label: "Estimated Close Date",
    autoform: {
      type: "bootstrap-datepicker",
      // find more customisation options here:
      // https://bootstrap-datepicker.readthedocs.io/en/stable/options.html
      datePickerOptions: {
        autoclose: true,
        format: 'dd/mm/yyyy',
        clearBtn: true
      }
    }
  },
  // estCloseDate: {
  //   type: Date,
  //   optional: true,
  //   label: "Estimated Close Date",
  //   autoform: {
  //     afFieldInput: {
  //       dateTimePickerOptions: {
  //         format: 'DD/MM/YYYY HH:mm',
  //         useCurrent: true,
  //         sideBySide: true,
  //         widgetPositioning: {
  //           vertical: "top"
  //         }
  //       }
  //     }
  //   }
  // },
  items: {
    type: Array,
    optional: true
  },
  hasBeenWon: {
    type: Boolean,
    optional: true
  },
  reasonLost: {
    type: String,
    optional: true,
    autoform: {
      type: 'hidden'
    }
  },
  isArchived: {
    type: Boolean,
    optional: true
  },
  // ##MARKER##
  currentStageId: {
    type: Number,
    optional: true
  },
  salesManagerId: {
    type: String,
    label: "Sales Manager",
    optional: true
  },
  createdBy: {
    type: String,
    autoform: {
      type: "hidden"
    }
  },
  companyId: {
    type: String,
    label: "Company",
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
    label: "Contact",
    custom: function() {
      if (!this.isSet && !this.field('companyId').isSet) {
        return "needsRelatedEntity";
      }
    }
  },
  'items.$': {
    type: Object
  },
  'items.$.id': {
    type: String
  },
  'items.$.name': {
    type: String
  },
  'items.$.description': {
    type: String,
    optional: true
  },
  'items.$.value': {
    type: Number,
    optional: true,
    decimal: true,
    custom: function() {
      if (this.value !== Math.round(this.value * 100) / 100) {
        return 'valueTo2DecimalPlaces';
      }
    }
  },
  'items.$.quantity': {
    type: Number,
    optional: true
  },
  projectId: {
    type: String,
    label: "Project",
    optional: true
  },
  tags: {
    type: [String],
    optional: true,
    autoform: {
      type: 'hidden'
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
  createdAt: {
    type: Date,
    defaultValue: new Date()
  }
});
OpportunitySchema.messages({
  needsRelatedEntity: "A company or a contact is required",
  valueTo2DecimalPlaces: "Value must be entered to two decimal places"
});