Schemas.CustomField = new SimpleSchema({
  name: {
    type: String,
    label: "Custom field name"
  },
  value: {
    type: String,
    label: "Custom field value",
    optional: true
  },
  defaultValue: {
    type: String,
    label: "Custom field default value",
    optional: true
  },
  type: {
    type: String,
    label: "Custom field type",
    allowedValues: [
      'text',
      'advtext',
      'date',
      'checkbox',
      'picklist',
      'label'
    ]
  },
  global: {
    type: Boolean,
    label: "Custom field is global (across all entities of this type)",
    defaultValue: false
  },
  order: {
    type: Number,
    label: "Custom field display order",
  },
  target: {
    type: String
  },
  listValues: {
    type: String,
    label: "Custom field picklist values",
    optional: true
  },
  entityId: {
    type: String
  }
});
CustomFields.attachSchema(Schemas.CustomField);