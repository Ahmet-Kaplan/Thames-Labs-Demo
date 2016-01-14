Schemas.Product = new SimpleSchema({
  sequencedIdentifier: {
    type: String,
    label: "RealTime ID",
    autoform: {
      afFieldInput: {
        defaultValue: function() {
          var tenant = Tenants.findOne({});
          var currentValue = tenant.settings.product.defaultNumber;

          Tenants.update({
            _id: tenant._id
          }, {
            $inc: {
              'settings.product.defaultNumber': 1
            }
          });
          return currentValue;
        }
      }
    }
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
