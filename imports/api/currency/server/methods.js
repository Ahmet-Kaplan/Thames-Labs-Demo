import { Tenants } from '/imports/api/collections.js';
Meteor.methods({
  setNewCurrency: function(currency) {
    var allowedCurrencies = ['gbp', 'eur', 'usd'];
    var newCurrency = (allowedCurrencies.indexOf(currency) !== -1) ? currency : 'gbp';

    Tenants.update({
      _id: Meteor.user().group
    }, {
      $set: {
        'settings.currency': newCurrency
      }
    });

    return newCurrency;
  }
});