Meteor.startup(function() {
  Meteor.call('getStripePK', function(error, result) {
    if(error) {
      console.log('Unable to retrieve Stripe Public Key.');
      return false;
    }
    Stripe.setPublishableKey(result);
  });
});

stripeCustomerDep = new Tracker.Dependency();
var stripeCustomer = {};

upcomingInvoiceDep = new Tracker.Dependency();
var upcomingInvoice = {};

lastInvoiceDep = new Tracker.Dependency();
var lastInvoice = {};

var couponDep = new Tracker.Dependency();
var coupon = {};

function updateStripeCustomer() {
  var tenant = Tenants.findOne({});
  if(tenant.stripeId) {
    Meteor.call('getStripeCustomerDetails', function(error, customer) {
      if(error) {
        toastr.error('Unable to retrieve your customer details');
        return false;
      }
      stripeCustomer = customer;
      stripeCustomerDep.changed();
    });
  }
}

function updateUpcomingInvoice() {
  var tenant = Tenants.findOne({});
  if(tenant.stripeId) {
    Meteor.call('getStripeUpcomingInvoice', function(error, invoice) {
      if(error) {
        toastr.error('Unable to retrieve upcoming invoice.');
        return false;
      }
      upcomingInvoice = invoice;
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
          amount: correctionAmount/100,
          description: 'Correction for this period\'s subscription'
        });
      } else {
        newData.push({
          amount: correctionAmount/100,
          description: 'Correction for this period\'s subscription'
        });
        var periodStart = new Date(upcomingInvoice.lines.data[tot-1].period.start*1000).toLocaleString('en-GB', {year: 'numeric', month: '2-digit', day: '2-digit'});
        var periodEnd = new Date(upcomingInvoice.lines.data[tot-1].period.end*1000).toLocaleString('en-GB', {year: 'numeric', month: '2-digit', day: '2-digit'});
        newData.push({
          amount: upcomingInvoice.lines.data[tot-1].amount/100,
          description: 'Subscription for next period (' + periodStart + ' - ' + periodEnd + ')'
        });
      }
      upcomingInvoice.lines.data = newData;
      upcomingInvoiceDep.changed();
    });
  }
}

function updateLastInvoice() {
  var tenant = Tenants.findOne({});
  if(tenant.stripeId) {
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
      $('#switchButtons').show();
    });
  } else {
    $('#switchButtons').show();
  }
}

Template.stripeAdmin.onRendered(function() {
  this.autorun(function() {
    var tenant = Tenants.findOne({});
    var numberOfUsers = Meteor.users.find({group: tenant._id}).count();
    if(tenant.stripeId && numberOfUsers) {
      updateStripeCustomer();
      updateLastInvoice();
      updateUpcomingInvoice();
    }
  });

  if(Tenants.findOne({}).coupon) {
    Meteor.call('getStripeCoupon', function(error, returnedCoupon) {
      if(error) {
        toastr.error('Unable to retrieve coupon\'s details');
        return false;
      }
      coupon = returnedCoupon;
      couponDep.changed();
    });
  }
});

Template.stripeAdmin.helpers({
  payingScheme: function() {
    return Tenants.findOne({}).paying;
  },
  hasStripeAccount: function() {
    return !(Tenants.findOne({}).stripeId === undefined || Tenants.findOne({}).stripeId === '');
  },
  stripeCustomer: function() {
    stripeCustomerDep.depend();
    return stripeCustomer;
  },
  subscriptionCancelled: function() {
    stripeCustomerDep.depend();
    return stripeCustomer.subscriptions.data[0].cancel_at_period_end;
  },
  blockedUser: function() {
    return Tenants.findOne({}).blocked;
  },
  totalRecords: function() {
    return Tenants.findOne({}).totalRecords || 0;
  },
  limitRecords: function() {
    return (Tenants.findOne({}).paying === true ? 'unlimited' : MAX_RECORDS);
  },
  totalUsers: function() {
    return Meteor.users.find({group: Meteor.user().group}).count();
  },
  limitReached: function() {
    return ((Tenants.findOne({}).totalRecords > MAX_RECORDS) && (!Tenants.findOne({}).paying));
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
    details = (!Tenants.findOne({}).coupon) ? false : ((coupon.percent_off) ? coupon.percent_off + ' % off' : '£' + coupon.amount_off + ' off');
    return details;
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
          stripeCustomerDep.changed();
          lastInvoiceDep.changed();
          upcomingInvoiceDep.changed();
        });
      }
    });
  }
});
