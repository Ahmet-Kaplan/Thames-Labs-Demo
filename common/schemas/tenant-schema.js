Schemas.Tenant = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  plan: {
    type: String,
    label: "Plan",
    autoform: {
      type: "hidden"
    },
    defaultValue: 'free',
    allowedValues: [
      "free",
      "pro"
    ]
  },
  settings: {
    type: Object,
    blackbox: true,
    autoform: {
      type: "hidden"
    },
    optional: true
  },
  stripe: {
    type: Object,
    autoform: {
      type: "hidden"
    }
  },
  "stripe.stripeId": {
    type: String,
    optional: true
  },
  "stripe.stripeSubs": {
    type: String,
    optional: true
  },
  "stripe.coupon": {
    type: String,
    optional: true,
    label: "Coupon code"
  },
  createdAt: {
    type: Date,
    defaultValue: new Date()
  }
});
Tenants.attachSchema(Schemas.Tenant);
