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

function beautifyInvoices(invoice) {
  const beautifiedInvoice = _.cloneDeep(invoice);
  let discountCorrection = 1;

  if (beautifiedInvoice.discount) {
    discountCorrection = (beautifiedInvoice.discount.coupon.percent_off) ? 1 - (beautifiedInvoice.discount.coupon.percent_off / 100) : 1;
  }

  if (beautifiedInvoice.tax_percent) {
    taxCorrection = 1 + beautifiedInvoice.tax_percent / 100;
  }
  beautifiedInvoice.amount_due = displayLocale(invoice.amount_due / 100, beautifiedInvoice.currency);
  beautifiedInvoice.total = invoice.total / 100;
  beautifiedInvoice.date = moment(invoice.date * 1000).format('DD/MM/YYYY');
  beautifiedInvoice.tax = displayLocale(invoice.tax / 100, beautifiedInvoice.currency);

  const tot = beautifiedInvoice.lines.data.length;

  let i = 0;
  let correctionAmount = 0;
  const newData = [];
  if (tot > 1) {
    for (i = 0; i < tot - 1; i++) {
      correctionAmount += beautifiedInvoice.lines.data[i].amount;
    }
  }

  if (beautifiedInvoice.lines.data[tot - 1].description) {
    correctionAmount += beautifiedInvoice.lines.data[tot - 1].amount;
    newData.push({
      amount: displayLocale(correctionAmount / 100, beautifiedInvoice.currency),
      description: 'Correction for this period\'s subscription'
    });
  } else {
    if (correctionAmount) {
      newData.push({
        amount: displayLocale(correctionAmount / 100, beautifiedInvoice.currency),
        description: 'Correction for this period\'s subscription'
      });
    }

    const periodStart = moment(beautifiedInvoice.lines.data[tot - 1].period.start * 1000).format('DD/MM/YYYY');
    const periodEnd = moment(beautifiedInvoice.lines.data[tot - 1].period.end * 1000).format('DD/MM/YYYY');
    const pricePerUser = beautifiedInvoice.lines.data[tot - 1].plan.amount * discountCorrection;
    newData.push({
      quantity: beautifiedInvoice.lines.data[tot - 1].quantity,
      plan: {
        name: beautifiedInvoice.lines.data[tot - 1].plan.name,
        amount: displayLocale(pricePerUser / 100, beautifiedInvoice.currency)
      },
      amount: displayLocale((beautifiedInvoice.lines.data[tot - 1].amount / 100) * discountCorrection, beautifiedInvoice.currency),
      description: 'Subscription for period between ' + periodStart + ' and ' + periodEnd
    });
  }
  beautifiedInvoice.lines.data = newData;
  return beautifiedInvoice;
}

export function updateUpcomingInvoice(self) {
  const tenant = Tenants.findOne({
    _id: Meteor.user().group
  });
  if (tenant.stripe.stripeId) {
    Meteor.call('stripe.getUpcomingInvoice', function(error, invoice) {
      if (error) {
        toastr.error('Unable to retrieve upcoming invoice.');
        return {};
      } else if (invoice === false) {
        self.upcomingInvoice.set(false);
        return {};
      }

      const upcomingInvoice = beautifyInvoices(invoice);

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
      const lastInvoice = beautifyInvoices(invoice);

      self.lastInvoice.set(lastInvoice);
    });
  }
}