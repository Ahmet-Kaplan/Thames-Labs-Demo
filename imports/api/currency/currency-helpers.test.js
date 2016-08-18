import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import sinon from 'sinon';
import { currencyHelpers } from './currency-helpers.js';

describe("currency helpers", () => {
  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    sandbox.stub(Meteor, 'user', function() {
      return {group: "userGroupId"};
    });
  });

  afterEach(function() {
    sandbox.restore();
  });

  //currencyHelpers.getCurrencySymbol tests
  it("returns correct currency symbols from currency codes", function() {
    chai.assert.equal(currencyHelpers.getCurrencySymbol("gbp"), "£");
    chai.assert.equal(currencyHelpers.getCurrencySymbol("eur"), "€");
    chai.assert.equal(currencyHelpers.getCurrencySymbol("usd"), "$");
  });


/*  The below tests cannot be run successfully until the
    Tenants collection has been fully modularized

    This is because in order to stub a function, sinon
    requires the Tenant object to be imported locally
    which is not currently possible given the current
    structure. The alternative is to directly replacing
    the global Tenant object in this test file, which
    will cause problems with other tests.

    Uncomment below code once the Tenant collection has
    been refactored for working tests.
   */

/*
  //currencyHelpers.userCurrencySymbol tests
  it("returns correct currency symbol for a British tenant", function() {
    sandbox.stub(Tenants, 'findOne', function() {
      return {settings: { currency: "gbp" }};
    });
    chai.assert.equal(currencyHelpers.userCurrencySymbol(), "£");
  });

  it("returns correct currency symbol for an European tenant", function() {
    sandbox.stub(Tenants, 'findOne', function() {
      return {settings: { currency: "eur" }};
    });
    chai.assert.equal(currencyHelpers.userCurrencySymbol(), "€");
  });

  it("returns correct currency symbol for an American tenant", function() {
    sandbox.stub(Tenants, 'findOne', function() {
      return {settings: { currency: "usd" }};
    });
    chai.assert.equal(currencyHelpers.userCurrencySymbol(), "$");
  });


  //currencyHelpers.userCurrency tests
  it("returns correct currency code for a British tenant", function() {
    sandbox.stub(Tenants, 'findOne', function() {
      return {settings: { currency: "gbp" }};
    });
    chai.assert.equal(currencyHelpers.userCurrency(), "gbp");
  });

  it("returns correct currency code for an European tenant", function() {
    sandbox.stub(Tenants, 'findOne', function() {
      return {settings: { currency: "eur" }};
    });
    chai.assert.equal(currencyHelpers.userCurrency(), "eur");
  });

  it("returns correct currency code for an American tenant", function() {
    sandbox.stub(Tenants, 'findOne', function() {
      return {settings: { currency: "usd" }};
    });
    chai.assert.equal(currencyHelpers.userCurrency(), "usd");
  });


  //currencyHelpers.toDecimal tests
  //Note: these only run client side because the server lacks the number.toLocaleString() method
  if (Meteor.isClient) {
    it("returns correct formatted prices for a British Tenant", function() {
      sandbox.stub(Tenants, 'findOne', function() {
        return {settings: { currency: "gbp" }};
      });
      chai.assert.equal(currencyHelpers.toDecimal(42), "£42.00");
    });

    it("returns correct formatted prices for an European Tenant", function() {
      sandbox.stub(Tenants, 'findOne', function() {
        return {settings: { currency: "eur" }};
      });
      chai.assert.equal(currencyHelpers.toDecimal(42), "42.00 €");
    });

    it("returns correct formatted prices for an American Tenant", function() {
      sandbox.stub(Tenants, 'findOne', function() {
        return {settings: { currency: "usd" }};
      });
      chai.assert.equal(currencyHelpers.toDecimal(42), "$42.00");
    });
  } */
});