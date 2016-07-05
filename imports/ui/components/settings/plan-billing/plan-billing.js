import './plan-billing.html';

const updateStripeCustomer = (self) => {
  var stripeCustomer = self.stripeCustomer;
  var tenant = Tenants.findOne({
    _id: Meteor.user().group
  });

  if (tenant.stripe.stripeId) {
    Meteor.call('stripe.getCustomerDetails', function(error, customer) {
      if (error) {
        toastr.error('Unable to retrieve your customer details');
        return false;
      }
      stripeCustomer.set(customer);
    });
  }
};

const updateUpcomingInvoice = (self) => {
  var tenant = Tenants.findOne({
    _id: Meteor.user().group
  });
  if (tenant.stripe.stripeId) {
    Meteor.call('stripe.getUpcomingInvoice', function(error, invoice) {
      if (error) {
        toastr.error('Unable to retrieve upcoming invoice.');
        return false;
      } else if (invoice === false) {
        self.upcomingInvoice.set(false);
        return false;
      }

      var upcomingInvoice = invoice;
      var discountCorrection = 1;
      var taxCorrection = 1;

      if (upcomingInvoice.discount) {
        discountCorrection = (upcomingInvoice.discount.coupon.percent_off) ? 1 - (upcomingInvoice.discount.coupon.percent_off / 100) : 1;
      }

      if (upcomingInvoice.tax_percent) {
        taxCorrection = 1 + upcomingInvoice.tax_percent / 100;
      }
      upcomingInvoice.amount_due = invoice.amount_due / 100;
      upcomingInvoice.total = invoice.total / 100;
      upcomingInvoice.date = moment(invoice.date * 1000).format('DD/MM/YYYY');
      var tot = upcomingInvoice.lines.data.length;
      var i = 0;
      var correctionAmount = 0;
      var newData = [];
      if (tot > 1) {
        for (i = 0; i < tot - 1; i++) {
          correctionAmount += upcomingInvoice.lines.data[i].amount;
        }
      }

      if (upcomingInvoice.lines.data[tot - 1].description) {
        correctionAmount += upcomingInvoice.lines.data[tot - 1].amount;
        newData.push({
          amount: (correctionAmount / 100 * taxCorrection).toFixed(2),
          description: 'Correction for this period\'s subscription'
        });
      } else {
        if (correctionAmount) {
          newData.push({
            amount: (correctionAmount / 100 * taxCorrection).toFixed(2),
            description: 'Correction for this period\'s subscription'
          });
        }

        var periodStart = moment(upcomingInvoice.lines.data[tot - 1].period.start * 1000).format('DD/MM/YYYY');
        var periodEnd = moment(upcomingInvoice.lines.data[tot - 1].period.end * 1000).format('DD/MM/YYYY');
        newData.push({
          amount: ((upcomingInvoice.lines.data[tot - 1].amount / 100) * discountCorrection * taxCorrection).toFixed(2),
          description: 'Subscription for next period (' + periodStart + ' - ' + periodEnd + ')'
        });
      }
      upcomingInvoice.lines.data = newData;
      self.upcomingInvoice.set(upcomingInvoice);
    });
  }
};

const updateLastInvoice = (self) => {
  var tenant = Tenants.findOne({
    _id: Meteor.user().group
  });
  if (tenant.stripe.stripeId) {
    Meteor.call('stripe.getLastInvoice', function(error, invoice) {
      if (error) {
        toastr.error('Unable to retrieve last invoice');
        return false;
      }
      lastInvoice = invoice;
      lastInvoice.amount_due = invoice.amount_due / 100;
      lastInvoice.date = moment(invoice.date * 1000).format('DD/MM/YYYY');
      lastInvoice.start = moment(invoice.period_start * 1000).format('DD/MM/YYYY');
      //Handle the case of the first payment for which period is only the day
      if (invoice.period_start === invoice.period_end) {
        lastInvoice.end = moment(invoice.lines.data[0].period.end * 1000).format('DD/MM/YYYY');
      } else {
        lastInvoice.end = moment(invoice.period_end * 1000).format('DD/MM/YYYY');
      }
      self.lastInvoice.set(lastInvoice);
    });
  }
};

const updateCardDetails = (self) => {
  var tenant = Tenants.findOne({
    _id: Meteor.user().group
  });
  if (!tenant.stripe.stripeId) {
    return false;
  }
  Meteor.call('stripe.getCardDetails', function(error, response) {
    self.cardDetails.set(response);
  });
};

const updateCouponDetails = (self) => {
  var couponDetails = self.couponDetails;
  var tenant = Tenants.findOne({
    _id: Meteor.user().group
  });
  if (!tenant.stripe.coupon) {
    couponDetails.set({});
    return false;
  }
  Meteor.call('stripe.getCoupon', tenant.stripe.coupon, function(error, response) {
    if (!couponDetails.get() || error) {
      couponDetails.set({});
    } else {
      couponDetails.set(response);
    }
  });
};

Template.planBilling.onCreated(function() {
  this.stripeCustomer = new ReactiveVar('loading');
  this.couponDetails = new ReactiveVar('loading');
  this.cardDetails = new ReactiveVar({});
  this.lastInvoice = new ReactiveVar({});
  this.upcomingInvoice = new ReactiveVar({});
  Session.set('stripeUpdateListener', 0);
  var self = this;

  this.autorun(function() {
    var tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (!tenant) return;
    var numberOfUsers = Meteor.users.find({
      group: tenant._id
    }).count();
    Session.get('stripeUpdateListener');

    updateCouponDetails(self);
    if (tenant.stripe.stripeId && numberOfUsers) {
      updateStripeCustomer(self);
      updateLastInvoice(self);
      updateUpcomingInvoice(self);
    }
  });

  this.autorun(function() {
    var tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    Session.get('listenCardUpdate');
    if (tenant.stripe.stripeId) {
      updateCardDetails(self);
    }
  });
});

Template.planBilling.helpers({
  payingScheme: function() {
    return Tenants.findOne({
      _id: Meteor.user().group
    }).plan === 'pro';
  },
  subsLoaded: function() {
    var stripeSubs = Tenants.findOne({
      _id: Meteor.user().group
    }).stripe.stripeSubs;
    if (!!stripeSubs) {
      return Template.instance().stripeCustomer.get() !== 'loading';
    }
    return true;
  },
  currentSubscription: function() {
    var stripeCustomer = Template.instance().stripeCustomer.get();
    return (stripeCustomer.id) ? ((stripeCustomer.subscriptions.total_count && !stripeCustomer.subscriptions.data[0].cancel_at_period_end) ? stripeCustomer.subscriptions.data[0].plan.name : "Free Plan") : "Free Plan";
  },
  hasStripeAccount: function() {
    return !( typeof Tenants.findOne({
      _id: Meteor.user().group
    }).stripe.stripeId === "undefined" || Tenants.findOne({
      _id: Meteor.user().group
    }).stripe.stripeId === '');
  },
  hasStripeSubs: function() {
    //Note that this helper is called only after the customer details have been retrieved from the api
    var stripeCustomer = Template.instance().stripeCustomer.get();
    if (!stripeCustomer || !stripeCustomer.subscriptions) return false;
    return stripeCustomer.subscriptions.total_count !== 0;
  },
  subscriptionCancelled: function() {
    var stripeCustomer = Template.instance().stripeCustomer.get();
    if (stripeCustomer.id && stripeCustomer.subscriptions.total_count) {
      return stripeCustomer.subscriptions.data[0].cancel_at_period_end;
    }
    return false;
  },
  stripeCustomer: function() {
    var stripeCustomer = Template.instance().stripeCustomer.get();
    return stripeCustomer;
  },
  totalUsers: function() {
    if (!Meteor.user()) return;
    return Meteor.users.find({
      group: Meteor.user().group
    }).count();
  },
  upcomingInvoice: function() {
    return Template.instance().upcomingInvoice.get();
  },
  lastInvoice: function() {
    return Template.instance().lastInvoice.get();
  },
  couponLoaded: function() {
    var couponDetails = Template.instance().couponDetails.get();
    return !(couponDetails === "loading");
  },
  hasCoupon: function() {
    var couponDetails = Template.instance().couponDetails.get();
    details = (!couponDetails || couponDetails.valid !== true) ? false : ((couponDetails.percent_off) ? couponDetails.id + ': ' + couponDetails.percent_off + ' % off' : couponDetails.id + ': £' + couponDetails.amount_off / 100 + ' off');
    return details;
  },
  cardDetails: function() {
    return Template.instance().cardDetails.get();
  }
});