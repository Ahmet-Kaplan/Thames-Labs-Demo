upcomingInvoiceDep = new Tracker.Dependency();
var upcomingInvoice = {};

var couponDep = new Tracker.Dependency();
var coupon = {};

function updateUpcomingInvoice() {
  var tenant = Tenants.findOne({});
  if(tenant.paying && tenant.stripeId && tenant.stripeSubs) {
    Meteor.call('getStripeUpcomingInvoice', function(error, invoice) {
      if(error) {
        toastr.error('Unable to retrieve upcoming invoice.');
        return false;
      }
      upcomingInvoice = invoice;
      upcomingInvoice.amount_due = invoice.amount_due/100;
      upcomingInvoice.date = new Date(invoice.date*1000).toLocaleString('en-GB', {year: 'numeric', month: 'long', day: 'numeric'});
      upcomingInvoice.start = new Date(invoice.period_start*1000).toLocaleString('en-GB', {year: 'numeric', month: '2-digit', day: '2-digit'});
      upcomingInvoice.end = new Date(invoice.period_end*1000).toLocaleString('en-GB', {year: 'numeric', month: '2-digit', day: '2-digit'});
      _.each(upcomingInvoice.lines.data, function(data) {
        data.amount = data.amount/100;
      });
      upcomingInvoiceDep.changed();
    });
  }
}

Template.stripeAdmin.onCreated(function() {
  this.autorun(function() {
    var tenant = Tenants.findOne({});
    var numberOfUsers = Meteor.users.find({group: tenant._id}).count();
    if(tenant.paying && tenant.stripeId && tenant.stripeSubs && numberOfUsers) {
      updateUpcomingInvoice();
    }
    console.log(upcomingInvoice);
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

  'click #reUpScheme': function(e) {
    e.preventDefault();
    Modal.show('stripeResubscribe', this);
  },

  'click #downScheme': function(e) {
    e.preventDefault();
    Modal.show('stripeUnsubscribe', this);
  }
});
