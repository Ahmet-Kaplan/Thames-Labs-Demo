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
    defaultValue: 'free'
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
    defaultValue: false,
    optional: true
  },
  "stripe.freeUnlimited": {
    type: Boolean,
    label: "Free unlimited",
    defaultValue: false,
    optional: true
  },
  "stripe.blocked": {
    // TODO: remove stripe.blocked - it was marked optional and removed from
    // all tenants in migration #12. Couldn't remove it at the time as the
    // migration needed to be applied first. Thanks traveller from the future!
    type: Boolean,
    defaultValue: false,
    optional: true
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
