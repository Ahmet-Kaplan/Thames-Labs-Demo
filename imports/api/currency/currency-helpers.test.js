import { chai } from 'meteor/practicalmeteor:chai';
import { currencyHelpers } from './currency-helpers.js';

describe("currency helpers", () => {
  beforeEach(function() {
  });

  //currencyHelpers.getCurrencySymbol tests
  it("returns correct currency symbols from currency codes", function() {
    chai.assert.equal(currencyHelpers.getCurrencySymbol("gbp"), "£");
    chai.assert.equal(currencyHelpers.getCurrencySymbol("eur"), "€");
    chai.assert.equal(currencyHelpers.getCurrencySymbol("usd"), "$");
  });


  //currencyHelpers.userCurrencySymbol tests
  it("returns correct currency symbol for the current tenant", function() {
    chai.assert.equal(currencyHelpers.userCurrencySymbol, "£");
    chai.assert.equal(true, false);
  });

  it("returns correct currency symbol for a logged out user", function() {
    chai.assert.equal(currencyHelpers.userCurrencySymbol, "£");
    chai.assert.equal(true, false);
  });


  //currencyHelpers.userCurrency tests
  it("returns correct currency code for the current tenant", function() {
    chai.assert.equal(currencyHelpers.userCurrency, "gbp");
    chai.assert.equal(true, false);
  });

  it("returns correct currency code for a logged out user", function() {
    chai.assert.equal(currencyHelpers.userCurrency, "gbp");
    chai.assert.equal(true, false);
  });


  //currencyHelpers.toDecimal tests
  it("returns correct formatted prices", function() {
    chai.assert.equal(currencyHelpers.toDecimal(42), "£42.00");
    chai.assert.equal(currencyHelpers.toDecimal(42), "42.00 €");
    chai.assert.equal(currencyHelpers.toDecimal(42), "$42.00");
    chai.assert.equal(true, false);
  });
});