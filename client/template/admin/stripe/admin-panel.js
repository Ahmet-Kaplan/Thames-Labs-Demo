var updateStripeCustomer = function(self) {
  var stripeCustomer = self.stripeCustomer;
  var tenant = Tenants.findOne({});

  if(tenant.stripe.stripeId) {
    Meteor.call('stripe.getCustomerDetails', function(error, customer) {
      if(error) {
        toastr.error('Unable to retrieve your customer details');
        return false;
      }
      stripeCustomer.set(customer);
    });
  }
};

var updateUpcomingInvoice = function(self) {
  var tenant = Tenants.findOne({});
  if(tenant.stripe.stripeId) {
    Meteor.call('stripe.getUpcomingInvoice', function(error, invoice) {
      if(error) {
        toastr.error('Unable to retrieve upcoming invoice.');
        return false;
      } else if(invoice === false) {
        self.upcomingInvoice.set(false);
        return false;
      }

      var upcomingInvoice = invoice;
      var discountCorrection = 1;
      var taxCorrection = 1;

      if(upcomingInvoice.discount) {
        discountCorrection = (upcomingInvoice.discount.coupon.percent_off) ? 1 - (upcomingInvoice.discount.coupon.percent_off / 100) : 1;
      }

      if(upcomingInvoice.tax_percent) {
        taxCorrection = 1 + upcomingInvoice.tax_percent/100;
      }
      upcomingInvoice.amount_due = invoice.amount_due/100;
      upcomingInvoice.total = invoice.total/100;
      upcomingInvoice.date = moment(invoice.date*1000).format('DD/MM/YYYY');
      var tot = upcomingInvoice.lines.data.length;
      var i = 0;
      var correctionAmount = 0;
      var newData = [];
      if(tot > 1) {
        for(i = 0; i < tot-1; i++) {
              correctionAmount += upcomingInvoice.lines.data[i].amount;
        }
      }

      if(upcomingInvoice.lines.data[tot-1].description) {
        correctionAmount += upcomingInvoice.lines.data[tot-1].amount;
        newData.push({
          amount: (correctionAmount/100 * taxCorrection).toFixed(2),
          description: 'Correction for this period\'s subscription'
        });
      } else {
        if(correctionAmount) {
          newData.push({
            amount: (correctionAmount/100 * taxCorrection).toFixed(2),
            description: 'Correction for this period\'s subscription'
          });
        }

        var periodStart = moment(upcomingInvoice.lines.data[tot-1].period.start*1000).format('DD/MM/YYYY');
        var periodEnd = moment(upcomingInvoice.lines.data[tot-1].period.end*1000).format('DD/MM/YYYY');
        newData.push({
          amount: ((upcomingInvoice.lines.data[tot-1].amount/100) * discountCorrection * taxCorrection).toFixed(2),
          description: 'Subscription for next period (' + periodStart + ' - ' + periodEnd + ')'
        });
      }
      upcomingInvoice.lines.data = newData;
      self.upcomingInvoice.set(upcomingInvoice);
    });
  }
};

var updateLastInvoice = function(self) {
  var tenant = Tenants.findOne({});
  if(tenant.stripe.stripeId) {
    Meteor.call('stripe.getLastInvoice', function(error, invoice) {
      if(error) {
        toastr.error('Unable to retrieve last invoice');
        return false;
      }
      lastInvoice = invoice;
      lastInvoice.amount_due = invoice.amount_due/100;
      lastInvoice.date = moment(invoice.date*1000).format('DD/MM/YYYY');
      lastInvoice.start = moment(invoice.period_start*1000).format('DD/MM/YYYY');
      //Handle the case of the first payment for which period is only the day
      if(invoice.period_start === invoice.period_end) {
        lastInvoice.end = moment(invoice.lines.data[0].period.end*1000).format('DD/MM/YYYY');
      } else {
        lastInvoice.end = moment(invoice.period_end*1000).format('DD/MM/YYYY');
      }
      self.lastInvoice.set(lastInvoice);
    });
  }
};

var updateCardDetails = function(self) {
  var tenant = Tenants.findOne({});
  if(!tenant.stripe.stripeId) {
    return false;
  }
  Meteor.call('stripe.getCardDetails', function(error, response) {
    self.cardDetails.set(response);
  });
};

var updateCouponDetails = function(self) {
  var couponDetails = self.couponDetails;
  var tenant = Tenants.findOne({});
  if(!tenant.stripe.coupon) {
    couponDetails.set({});
    return false;
  }
  Meteor.call('stripe.getCoupon', tenant.stripe.coupon, function(error, response) {
    if(!couponDetails.get() || error) {
      couponDetails.set({});
    } else {
      couponDetails.set(response);
    }
  });
};

Template.stripeAdmin.onCreated(function() {
  this.stripeCustomer = new ReactiveVar('loading');
  this.couponDetails = new ReactiveVar('loading');
  this.cardDetails = new ReactiveVar({});
  this.lastInvoice = new ReactiveVar({});
  this.upcomingInvoice = new ReactiveVar({});
  Session.set('stripeUpdateListener', 0);
  var self = this;

  this.autorun(function() {
    var tenant = Tenants.findOne({});
    var numberOfUsers = Meteor.users.find({group: tenant._id}).count();
    Session.get('stripeUpdateListener');

    updateCouponDetails(self);
    if(tenant.stripe.stripeId && numberOfUsers) {
      updateStripeCustomer(self);
      updateLastInvoice(self);
      updateUpcomingInvoice(self);
    }
  });

  this.autorun(function() {
    var tenant = Tenants.findOne({});
    Session.get('listenCardUpdate');
    if(tenant.stripe.stripeId) {
      updateCardDetails(self);
    }
  });
});

Template.stripeAdmin.helpers({
  payingScheme: function() {
    return Tenants.findOne({}).plan === 'pro';
  },
  subsLoaded: function() {
    var stripeSubs = Tenants.findOne({}).stripe.stripeSubs;
    if(!!stripeSubs) {
      return Template.instance().stripeCustomer.get() !== 'loading'
    } else {
      return true;
    }
  },
  currentSubscription: function() {
    var stripeCustomer = Template.instance().stripeCustomer.get();
    return (stripeCustomer.id) ? ((stripeCustomer.subscriptions.total_count && !stripeCustomer.subscriptions.data[0].cancel_at_period_end) ? stripeCustomer.subscriptions.data[0].plan.name : "Free Plan") : "Free Plan";
  },
  hasStripeAccount: function() {
    return !(Tenants.findOne({}).stripe.stripeId === undefined || Tenants.findOne({}).stripe.stripeId === '');
  },
  hasStripeSubs: function() {
    //Note that this helper is called only after the customer details have been retrieved from the api
    var stripeCustomer = Template.instance().stripeCustomer.get();
    if(!stripeCustomer || !stripeCustomer.subscriptions) return false;
    return stripeCustomer.subscriptions.total_count !== 0;
  },
  subscriptionCancelled: function() {
    var stripeCustomer = Template.instance().stripeCustomer.get();
    if(stripeCustomer.id && stripeCustomer.subscriptions.total_count) {
      return stripeCustomer.subscriptions.data[0].cancel_at_period_end;
    } else {
      return false;
    }
  },
  stripeCustomer: function() {
    var stripeCustomer = Template.instance().stripeCustomer.get();
    return stripeCustomer;
  },
  totalUsers: function() {
    return Meteor.users.find({group: Meteor.user().group}).count();
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

Template.stripeAdmin.events({
  'click #upScheme': function(e) {
    e.preventDefault();
    Modal.show('stripeSubscribe', this);
  },

  'click #downScheme': function(e) {
    e.preventDefault();
    Modal.show('stripeUnsubscribe', this);
  },

  'click #resumeSubs': function(e) {
    e.preventDefault();
    bootbox.confirm('Do you wish to resume your subscription to RealtimeCRM?', function(result) {
      if(result === true) {
        toastr.info('Resuming your subscription...');
        Meteor.call('stripe.resumeSubscription', function(error, result) {
          if(error) {
            bootbox.alert({
              title: 'Error',
              message: '<div class="bg-danger"><i class="fa fa-times fa-3x pull-left text-danger"></i>Unable to resume your subscription.<br />Please contact us if the problem remains.</div>'
            });
          } else {
            bootbox.alert({
              title: 'Subscription complete',
              message: '<div class="bg-success"><i class="fa fa-check fa-3x pull-left text-success"></i>Your subscription has been successful.<br />We\'re glad to have you back!'
            });
          }
          Session.set('stripeUpdateListener', Session.get('stripeUpdateListener') + 1);
        });
      }
    });
  },

  'click #updateCardDetails': function(event) {
    event.preventDefault();
    Modal.show('cardFormModal');
  },

  'click #updateEmail': function(event) {
    event.preventDefault();
    bootbox.prompt("Please enter the new email for your invoices.", function(result) {
      if(!result) {
        return true;
      }
      var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
      if(!emailRegex.test(result)) {
        $('.bootbox-form').addClass('has-error');
        toastr.error('Please enter a valid email address');
        return false;
      } else {
        toastr.clear();
        toastr.info('Processing your email update');
        Meteor.call('stripe.updateEmail', result, function(error, response) {
          if(error) {
            toastr.error('Unable to update email address');
            return false;
          }
          toastr.clear();
          toastr.success('Your email hase been changed: ' + result);
          Session.set('stripeUpdateListener', Session.get('stripeUpdateListener') + 1);
        });
      }
    });
  },

  'click #showStripeHow': function(event) {
    event.preventDefault();
    Modal.show('stripeHow');
  },

  'click #updateCoupon': function(event) {
    event.preventDefault();
    Modal.show('couponModal');
  }
});
