Schemas.Product = new SimpleSchema({
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
  price: {
    type: Number,
    optional: true,
    label: "Sale Price",
    decimal: true
  },
  cost: {
    type: Number,
    optional: true,
    label: "Cost Price",
    decimal: true
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
  createdAt: {
    type: Date,
    defaultValue: new Date()
  }
});

Products.attachSchema(Schemas.Product);
