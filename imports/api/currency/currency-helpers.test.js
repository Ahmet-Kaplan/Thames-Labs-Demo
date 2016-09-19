import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import sinon from 'sinon';
import { currencyHelpers } from './currency-helpers.js';
import { Tenants } from '/imports/api/collections.js';

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

});