Schemas.Product = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    optional: true,
    label: "Sales Price",
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
});

Products.attachSchema(Schemas.Product);
