export function displayLocale(number, currency) {
  if (isNaN(number)) return '';
  currency = _.lowerCase(currency);
  let locale = 'en-gb';
  let curr = 'GBP';
  switch (currency) {
    case 'eur':
      curr = 'EUR';
      locale = 'fr';
      break;

    case 'usd':
      curr = 'USD';
      locale = 'en';
      break;

    default:
      curr = 'GBP';
      locale = 'en-gb';
      break;
  }
  return number.toLocaleString(locale, {
    style: 'currency',
    currency: curr,
  });
}

export const stripeCustomer = {
  data: new ReactiveVar(false),
  coupon: new ReactiveVar(false),
  getData() {
    return this.data.get();
  },
  getCoupon() {
    return this.coupon.get();
  },
  update() {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });

    if (_.get(tenant, 'stripe.stripeId')) {
      Meteor.call('stripe.getCustomerDetails', (error, customer) => {
        if (error || customer === false) {
          toastr.error('Unable to retrieve your customer details');
          return false;
        }
        this.data.set(customer);
        this.coupon.set(_.get(customer, 'discount.coupon'));
      });
    } else if (_.get(tenant, 'stripe.coupon')) {
      Meteor.call('stripe.getCoupon', tenant.stripe.coupon, (error, coupon) => {
        if (error) {
          toastr.error('Unable to retrieve your coupon details');
          return false;
        }
        this.data.set(null);
        this.coupon.set(coupon);
      });
    } else {
      this.data.set(null);
    }

  }
};

export const stripePlan = {
  data: new ReactiveVar(null),
  getData: function() {
    return this.data.get();
  },
  update: function(planId, coupon) {
    if (!_.includes(['premierGBP', 'premierEUR', 'premierUSD'], planId)) {
      planId = 'premierGBP';
    }
    Meteor.call('stripe.getPlan', planId, (error, planObj) => {
      if (error || planObj === false) {
        toastr.error('Unable to retrieve plan details.');
        Modal.hide();
        return false;
      }

      const planDetails = _.cloneDeep(planObj);

      planDetails.quantity = Meteor.users.find({
        group: Meteor.user().group
      }).count();
      planDetails.total = planDetails.quantity * planDetails.amount / 100;
      planDetails.amount = displayLocale(planDetails.amount / 100, planDetails.currency);

      if (coupon) {
        planDetails.couponName = coupon.id;
        planDetails.couponDetails = (coupon.percent_off) ? `${coupon.percent_off} % off` : `${displayLocale(coupon.amount_off / 100, planDetails.currency)} off`;
        planDetails.total = planDetails.total * (1 - (coupon.percent_off / 100))  - coupon.amount_off / 100 * planDetails.quantity;
        planDetails.total = displayLocale(planDetails.total, planDetails.currency);
        this.data.set(planDetails);
      } else {
        planDetails.total = displayLocale(planDetails.total, planDetails.currency);
        this.data.set(planDetails);
      }
    });
  }
};