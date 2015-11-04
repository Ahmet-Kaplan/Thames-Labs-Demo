var stripeCustomerDep = new Tracker.Dependency();
var stripeCustomer = {};

var upcomingInvoiceDep = new Tracker.Dependency();
var upcomingInvoice;

var lastInvoiceDep = new Tracker.Dependency();
var lastInvoice = {};

var cardDetailsDep = new Tracker.Dependency();
var cardDetails = {};

var couponDep = new Tracker.Dependency();
var couponDetails = {};

var updateStripeCustomer = function() {
  var tenant = Tenants.findOne({});
  if(tenant.stripe.stripeId) {
    Meteor.call('getStripeCustomerDetails', function(error, customer) {
      if(error) {
        toastr.error('Unable to retrieve your customer details');
        return false;
      }
      stripeCustomer = customer;
      stripeCustomerDep.changed();
    });
  }
};

var updateUpcomingInvoice = function() {
  var tenant = Tenants.findOne({});
  if(tenant.stripe.stripeId) {
    Meteor.call('getStripeUpcomingInvoice', function(error, invoice) {
      if(error) {
        toastr.error('Unable to retrieve upcoming invoice.');
        return false;
      } else if(invoice === false) {
        upcomingInvoice = false;
        upcomingInvoiceDep.changed();
        return false;
      }
      upcomingInvoice = invoice;

      var discountCorrection = 1;
      if(upcomingInvoice.discount) {
        discountCorrection = (upcomingInvoice.discount.coupon.percent_off) ? 1 - (upcomingInvoice.discount.coupon.percent_off / 100) : 1;
      }

      var taxCorrection = 1;
      if(upcomingInvoice.tax_percent) {
        taxCorrection = 1 + upcomingInvoice.tax_percent/100;
      }
      upcomingInvoice.amount_due = invoice.amount_due/100;
      upcomingInvoice.total = invoice.total/100;
      upcomingInvoice.date = new Date(invoice.date*1000).toLocaleString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'});
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
        newData.push({
          amount: (correctionAmount/100 * taxCorrection).toFixed(2),
          description: 'Correction for this period\'s subscription'
        });
        var periodStart = new Date(upcomingInvoice.lines.data[tot-1].period.start*1000).toLocaleString('en-GB', {year: 'numeric', month: '2-digit', day: '2-digit'});
        var periodEnd = new Date(upcomingInvoice.lines.data[tot-1].period.end*1000).toLocaleString('en-GB', {year: 'numeric', month: '2-digit', day: '2-digit'});
        newData.push({
          amount: ((upcomingInvoice.lines.data[tot-1].amount/100) * discountCorrection * taxCorrection).toFixed(2),
          description: 'Subscription for next period (' + periodStart + ' - ' + periodEnd + ')'
        });
      }
      upcomingInvoice.lines.data = newData;
      upcomingInvoiceDep.changed();
    });
  }
};

var updateLastInvoice = function() {
  var tenant = Tenants.findOne({});
  if(tenant.stripe.stripeId) {
    Meteor.call('getStripeLastInvoice', function(error, invoice) {
      if(error) {
        toastr.error('Unable to retrieve last invoice');
        return false;
      }
      lastInvoice = invoice;
      lastInvoice.amount_due = invoice.amount_due/100;
      lastInvoice.date = new Date(invoice.date*1000).toLocaleString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'});
      lastInvoice.start = new Date(invoice.period_start*1000).toLocaleString('en-GB', {year: 'numeric', month: '2-digit', day: '2-digit'});
      //Handle the case of the first payment for which period is only the day
      if(invoice.period_start === invoice.period_end) {
        lastInvoice.end = new Date(invoice.lines.data[0].period.end*1000).toLocaleString('en-GB', {year: 'numeric', month: '2-digit', day: '2-digit'});
      } else {
        lastInvoice.end = new Date(invoice.period_end*1000).toLocaleString('en-GB', {year: 'numeric', month: '2-digit', day: '2-digit'});
      }
      lastInvoiceDep.changed();
    });
  }
};

var updateCardDetails = function() {
  var tenant = Tenants.findOne({});
  if(!tenant.stripe.stripeId) {
    return false;
  }
  Meteor.call('getStripeCardDetails', function(error, response) {
    cardDetails = response;
    cardDetailsDep.changed();
  });
};

var updateCouponDetails = function() {
  var tenant = Tenants.findOne({});
  if(!tenant.stripe.coupon) {
    couponDetails = false;
    return false;
  }
  Meteor.call('getStripeCoupon', tenant.stripe.coupon, function(error, response) {
    if(!couponDetails || error) {
      couponDetails = false;
    } else {
      couponDetails = response;
    }
    couponDep.changed();
  });
};

Template.stripeAdmin.onCreated(function() {
  Session.set('stripeUpdateListener', 0);
  this.autorun(function() {
    var tenant = Tenants.findOne({});
    var listener = Session.get('stripeUpdateListener');
    var numberOfUsers = Meteor.users.find({group: tenant._id}).count();
    listener += 1;
    updateCouponDetails();
    if(tenant.stripe.stripeId && numberOfUsers) {
      updateStripeCustomer();
      updateLastInvoice();
      updateUpcomingInvoice();
    }
  });

  this.autorun(function() {
    var tenant = Tenants.findOne({});
    var updateListener = Session.get('listenCardUpdate');
    updateListener += 1;
    if(tenant.stripe.stripeId) {
      updateCardDetails();
    }
  });
});

Template.stripeAdmin.helpers({
  payingScheme: function() {
    return Tenants.findOne({}).stripe.paying;
  },
  currentSubscription: function() {
    stripeCustomerDep.depend();
    return (stripeCustomer.id) ? ((stripeCustomer.subscriptions.total_count && !stripeCustomer.subscriptions.data[0].cancel_at_period_end) ? stripeCustomer.subscriptions.data[0].plan.name : "Free Plan") : "Free Plan";
  },
  hasStripeAccount: function() {
    return !(Tenants.findOne({}).stripe.stripeId === undefined || Tenants.findOne({}).stripe.stripeId === '');
  },
  hasStripeSubs: function() {
    return Tenants.findOne({}).stripe.stripeSubs;
  },
  subscriptionCancelled: function() {
    stripeCustomerDep.depend();
    if(stripeCustomer.id && stripeCustomer.subscriptions.total_count) {
      return stripeCustomer.subscriptions.data[0].cancel_at_period_end;
    } else {
      return false;
    }
  },
  stripeCustomer: function() {
    stripeCustomerDep.depend();
    return stripeCustomer;
  },
  blockedUser: function() {
    return Tenants.findOne({}).stripe.blocked;
  },
  totalRecords: function() {
    return Tenants.findOne({}).stripe.totalRecords || 0;
  },
  limitRecords: function() {
    return (Tenants.findOne({}).stripe.paying === true ? 'unlimited' : MAX_RECORDS);
  },
  totalUsers: function() {
    return Meteor.users.find({group: Meteor.user().group}).count();
  },
  limitReached: function() {
    var tenantStripe = Tenants.findOne({}).stripe
    if(tenantStripe.paying || tenantStripe.freeUnlimited) {
      return false;
    } else {
      return tenantStripe.totalRecords > MAX_RECORDS;
    }
  },
  upcomingInvoice: function() {
    upcomingInvoiceDep.depend();
    return upcomingInvoice;
  },
  lastInvoice: function() {
   lastInvoiceDep.depend();
    return lastInvoice;
  },
  hasCoupon: function() {
    couponDep.depend();
    details = (!couponDetails) ? false : ((couponDetails.percent_off) ? couponDetails.percent_off + ' % off' : '£' + couponDetails.amount_off + ' off');
    return details;
  },
  cardDetails: function() {
    cardDetailsDep.depend();
    return cardDetails;
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
        Meteor.call('resumeStripeSubscription', function(error, result) {
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
        Meteor.call('updateStripeEmail', result, function(error, response) {
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
  }
});
