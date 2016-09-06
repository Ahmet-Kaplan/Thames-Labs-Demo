import { Meteor } from 'meteor/meteor';
import { Tenants } from '/imports/api/collections.js';
const currencyHelpers = {
  //Return the currency symbol from the currency code (ISO 4217) e.g gbp => £
  getCurrencySymbol(currency) {
    const currencySymbol = {
      gbp: '£',
      eur: '€',
      usd: '$'
    };
    return currencySymbol[currency] || '£';
  },

  //Return the current tenant's currency symbol. e.g £
  userCurrencySymbol() {
    if(!Meteor.user()) return '£';

    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (tenant) {
      const currency = tenant.settings.currency || 'gbp';
      return currencyHelpers.getCurrencySymbol(currency);
    }
  },

  //Returns the current tenant's currency code (ISO 4217). e.g gbp
  userCurrency() {
    if(!Meteor.user()) return 'gbp';

    const tenant = Tenants.findOne({
      _id: Meteor.user().group
    });
    if (tenant) return tenant.settings.currency || 'gbp';
  },

  //Returns a formatted price. Takes a number, returns price. e.g 42 => '£42.00'
  toDecimal(number) {
    if (!number) number = 0;
    number = parseFloat(number);

    if(!Meteor.user()) return number.toFixed(2);

    const allowedCurrencies = ['gbp', 'eur', 'usd'];
    const tenantCurrency = Tenants.findOne({
      _id: Meteor.user().group
    }).settings.currency;
    const currency = (allowedCurrencies.indexOf(tenantCurrency) === -1) ? 'gbp' : tenantCurrency;
    const currencyLocale = {
      gbp: 'en-gb',
      eur: 'fr',
      usd: 'en'
    };
    const displayLocale = currencyLocale[currency] || 'en-gb';

    return number.toLocaleString(displayLocale, {
      style: 'currency',
      currency: currency.toUpperCase()
    });
  }
};

export { currencyHelpers };
