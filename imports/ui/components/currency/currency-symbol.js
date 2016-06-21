function getCurrencySymbol(currency) {
  const currencySymbol = {
    gbp: '£',
    eur: '€',
    usd: '$'
  };

  return currencySymbol[currency] || '£';
};

function userCurrencySymbol() {
  if(!Meteor.user()) return '£';

  var tenant = Tenants.findOne({
    _id: Meteor.user().group
  });
  if (tenant) {
    var currency = tenant.settings.currency || 'gbp';
    return getCurrencySymbol(currency);
  }
};

export { userCurrencySymbol };
