import { displayLocale } from '../helpers.js';

function beautifyInvoices(invoice) {
  const beautifiedInvoice = _.cloneDeep(invoice);
  const discountAmount = -1 * _.get(beautifiedInvoice, 'discount.coupon.amount_off', 0) / 100;
  const discountPercent = 1 - _.get(beautifiedInvoice, 'discount.coupon.percent_off', 0) / 100;

  beautifiedInvoice.amount_due = displayLocale(invoice.amount_due / 100, beautifiedInvoice.currency);
  beautifiedInvoice.subtotal = displayLocale(invoice.subtotal / 100, beautifiedInvoice.currency);
  beautifiedInvoice.date = moment((invoice.next_payment_attempt ? invoice.next_payment_attempt : invoice.date) * 1000).format('DD/MM/YYYY');
  beautifiedInvoice.tax = displayLocale(invoice.tax / 100, beautifiedInvoice.currency);
  beautifiedInvoice.periodStart = moment(invoice.period_start * 1000).format('DD/MM/YYYY');
  beautifiedInvoice.periodEnd = moment(invoice.period_end * 1000).format('DD/MM/YYYY');

  const pricePerUser = invoice.lines.data[0].plan.amount;
  beautifiedInvoice.details = {
    quantity: invoice.lines.data[0].quantity,
    plan: {
      name: invoice.lines.data[0].plan.name,
      amount: displayLocale(pricePerUser / 100, invoice.currency)
    },
    amount: displayLocale((invoice.lines.data[0].amount / 100), invoice.currency),
    discount: {
      name: _.get(invoice, 'discount.coupon.id', false),
      amount: displayLocale(discountAmount ? discountAmount : -1 * invoice.subtotal / 100 * discountPercent, invoice.currency),
    }
  };

  return beautifiedInvoice;
}

export const upcomingInvoice = {
  data: new ReactiveVar(false),
  getData() {
    return this.data.get();
  },
  update() {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (_.get(tenant, 'stripe.stripeId')) {
      Meteor.call('stripe.getUpcomingInvoice', (error, invoice) => {
        if (error) {
          toastr.error(`Unable to retrieve upcoming invoice. ${error.reason}`);
        } else if (invoice === false) {
          this.data.set(null);
          return;
        }
        this.data.set(beautifyInvoices(invoice));
      });
    }
  }
};

export const lastInvoice = {
  data: new ReactiveVar(false),
  getData() {
    return this.data.get();
  },
  update() {
    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (_.get(tenant, 'stripe.stripeId')) {
      Meteor.call('stripe.getLastInvoice', (error, invoice) => {
        if (error) {
          toastr.error(`Unable to retrieve last invoice. ${error.reason}`);
        } else if (invoice === false) {
          this.data.set(null);
          return;
        }
        this.data.set(beautifyInvoices(invoice));
      });
    }
  }
};
