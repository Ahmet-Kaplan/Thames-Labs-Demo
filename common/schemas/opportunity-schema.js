// // ##MARKER##
Schemas.OpportunityStage = new SimpleSchema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  order: {
    type: Number
  }
});
OpportunityStages.attachSchema(Schemas.OpportunityStage);

Schemas.Opportunity = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  date: {
    type: Date,
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
  value: {
    type: Number,
    optional: true
  },
  estCloseDate: {
    type: Date,
    optional: true,
    label: "Estimated Close Date",
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
    type: String,
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
    optional: true
  },
  tags: {
    type: [String],
    optional: true,
    autoform: {
      type: 'hidden'
    }
  }
});
Schemas.Opportunity.messages({
  needsRelatedEntity: "A company or a contact is required",
  valueTo2DecimalPlaces: "Value must be entered to two decimal places"
});
Opportunities.attachSchema(Schemas.Opportunity);
