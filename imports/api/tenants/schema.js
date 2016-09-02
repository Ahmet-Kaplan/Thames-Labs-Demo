export const TenantSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  // Will need to be deleted once set to null for all tenants
  plan: {
    type: String,
    label: "Plan",
    optional: true,
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
  "stripe.maxFreeUsers": {
    type: Number,
    optional: false,
    defaultValue: 1
  },
  createdAt: {
    type: Date,
    defaultValue: new Date()
  }
});
