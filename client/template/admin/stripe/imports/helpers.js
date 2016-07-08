export function displayLocale(number, currency) {
  if (typeof number !== 'number') return;

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

export function updateStripeCustomer(self) {
  const tenant = Tenants.findOne({
    _id: Meteor.user().group
  });

  if (tenant.stripe.stripeId) {
    Meteor.call('stripe.getCustomerDetails', function(error, customer) {
      if (error || customer === false) {
        toastr.error('Unable to retrieve your customer details');
        return false;
      }
      self.stripeCustomer.set(customer);
    });
  }
}

export function updateUpcomingInvoice(self) {
  const tenant = Tenants.findOne({
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

      const upcomingInvoice = _.cloneDeep(invoice);
      let discountCorrection = 1;
      let taxCorrection = 1;

      if (upcomingInvoice.discount) {
        discountCorrection = (upcomingInvoice.discount.coupon.percent_off) ? 1 - (upcomingInvoice.discount.coupon.percent_off / 100) : 1;
      }

      if (upcomingInvoice.tax_percent) {
        taxCorrection = 1 + upcomingInvoice.tax_percent / 100;
      }
      upcomingInvoice.amount_due = displayLocale(invoice.amount_due / 100, upcomingInvoice.currency);
      upcomingInvoice.total = invoice.total / 100;
      upcomingInvoice.date = moment(invoice.date * 1000).format('DD/MM/YYYY');
      const tot = upcomingInvoice.lines.data.length;
      let i = 0;
      let correctionAmount = 0;
      const newData = [];
      if (tot > 1) {
        for (i = 0; i < tot - 1; i++) {
          correctionAmount += upcomingInvoice.lines.data[i].amount;
        }
      }

      if (upcomingInvoice.lines.data[tot - 1].description) {
        correctionAmount += upcomingInvoice.lines.data[tot - 1].amount;
        newData.push({
          amount: displayLocale(correctionAmount / 100 * taxCorrection, upcomingInvoice.currency),
          description: 'Correction for this period\'s subscription'
        });
      } else {
        if (correctionAmount) {
          newData.push({
            amount: displayLocale(correctionAmount / 100 * taxCorrection, upcomingInvoice.currency),
            description: 'Correction for this period\'s subscription'
          });
        }

        const periodStart = moment(upcomingInvoice.lines.data[tot - 1].period.start * 1000).format('DD/MM/YYYY');
        const periodEnd = moment(upcomingInvoice.lines.data[tot - 1].period.end * 1000).format('DD/MM/YYYY');
        newData.push({
          amount: displayLocale((upcomingInvoice.lines.data[tot - 1].amount / 100) * discountCorrection * taxCorrection, upcomingInvoice.currency),
          description: 'Subscription for next period (' + periodStart + ' - ' + periodEnd + ')'
        });
      }
      upcomingInvoice.lines.data = newData;
      self.upcomingInvoice.set(upcomingInvoice);
    });
  }
}

export function updateLastInvoice(self) {
  const tenant = Tenants.findOne({
    _id: Meteor.user().group
  });
  if (tenant.stripe.stripeId) {
    Meteor.call('stripe.getLastInvoice', function(error, invoice) {
      if (error) {
        toastr.error('Unable to retrieve last invoice');
        return false;
      } else if (invoice === false) {
        self.lastInvoice.set(false);
        return false;
      }
      const lastInvoice = _.cloneDeep(invoice);
      lastInvoice.amount_due = displayLocale(invoice.amount_due / 100, invoice.currency);
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
}