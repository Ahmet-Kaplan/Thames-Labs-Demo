Schemas.Tenant = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
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
  "stripe.paying": {
    type: Boolean,
    label: "Paying tenant",
    defaultValue: false
  },
  "stripe.freeUnlimited": {
    type: Boolean,
    label: "Free unlimited",
    defaultValue: false
  },
  "stripe.blocked": {
    type: Boolean,
    defaultValue: false
  },
  "stripe.stripeId": {
    type: String,
    optional: true
  },
  "stripe.stripeSubs": {
    type: String,
    optional: true
  },
  "stripe.totalRecords": {
    type: Number,
    defaultValue: 0
  },
  "stripe.coupon": {
    type: String,
    optional: true,
    label: "Coupon code"
  },
  createdAt: {
    type: Date
  }
});
Tenants.attachSchema(Schemas.Tenant);