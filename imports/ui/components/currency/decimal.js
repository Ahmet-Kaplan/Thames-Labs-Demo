// Should probably use shared locales / currency hash from currency-symbol.js
function decimal(number) {
  if (!number) number = 0;
  number = parseFloat(number);

  if(!Meteor.user()) return number.toFixed(2);

  var allowedCurrencies = ['gbp', 'eur', 'usd'];
  var tenantCurrency = Tenants.findOne({
    _id: Meteor.user().group
  }).settings.currency;
  var currency = (allowedCurrencies.indexOf(tenantCurrency) === -1) ? 'gbp' : tenantCurrency;
  var currencyLocale = {
    gbp: 'en-gb',
    eur: 'fr',
    usd: 'en'
  };
  var displayLocale = currencyLocale[currency] || 'en-gb';

  return number.toLocaleString(displayLocale, {
    style: 'currency',
    currency: currency.toUpperCase()
  });
}

export { decimal };
