import { chai } from 'meteor/practicalmeteor:chai';
// import sinon from 'sinon';
import { displayLocale, stripeCustomer } from './helpers';

describe("Billing display helpers", function() {
  it("returns an empty string with invalid input", function() {
    const resultString = displayLocale('error', 'gbp');
    chai.assert.equal(resultString, '');
  });

  /*it("returns a formatted string for an amount", function() {
    const resultString = displayLocale(42, 'gbp');
    chai.assert.equal(resultString, '£42');
  });*/

  it("initiates the stripeCustomer object", function() {
    const testCustomer = stripeCustomer.getData();
    const testCoupon = stripeCustomer.getCoupon();
    chai.assert.equal(testCustomer, false);
    chai.assert.equal(testCoupon, false);
  });
});