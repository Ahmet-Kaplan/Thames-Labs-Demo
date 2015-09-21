module.exports = function() {

  var url = require('url');

  this.Given(/^I have subscribed to the paying plan$/, function(callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/admin'))
      .waitForVisible('#upScheme', 2000)
      .scroll('#upScheme', 0, -60)
      .click('#upScheme')
      .waitForVisible('#cardNumber', 5000)
      .setValue('#cardNumber', 4242424242424242)
      .setValue('#expMonth', 01)
      .setValue('#expYear', 2018)
      .setValue('#cardCVC', 789)
      .submitForm('#subscribe')
      .waitForExist('.toast-message', 10000, true)
      .waitForVisible('.bootbox-body', 20000)
      .isExisting('.modal-dialog')
      .then(function(isExisting) {
          expect(isExisting).to.equal(true);
      })
      .waitForVisible(".modal-footer .btn-primary", 5000)
      .click(".modal-footer .btn-primary")
      .waitForVisible('.modal-dialog', 2000, true)
      .waitForVisible('#planName', 5000)
      .waitUntil(function() {
        return this.getText('#planName').then(function(text) {
          return expect(text).to.not.contain('Free');
        });
      }, 10000)
      .call(callback);
  });

  this.Given(/^I have unsubscribed from the paying plan$/, function(callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/admin'))
      .waitForVisible('#downScheme', 2000)
      .scroll('#downScheme', 0, -60)
      .click('#downScheme')
      .waitForVisible('.modal-content', 5000)
      .click(".modal-footer .btn-primary")
      .waitForExist('.toast-message', 10000, true)
      .waitForVisible('.bootbox-body', 20000)
      .isExisting('.modal-dialog')
      .then(function(isExisting) {
          expect(isExisting).to.equal(true);
      })
      .waitForVisible(".modal-footer .btn-primary", 5000)
      .click(".modal-footer .btn-primary")
      .waitForVisible('.modal-dialog', 5000, true)
      .waitForVisible('#planName', 5000)
      .waitUntil(function() {
        return this.getText('#planName').then(function(text) {
          return expect(text).to.contain('Free');
        });
      }, 10000)
      .call(callback);
  });

  this.Then(/^the toastr disappears$/, function(callback) {
    this.client
      .waitForExist('.toast-message', 10000, true)
      .call(callback);
  });

  this.Then(/^I should see a bootbox$/, function(callback) {
    this.client
      .waitForExist('.bootbox-body', 20000)
      .isExisting('.modal-dialog')
      .then(function(isExisting) {
          expect(isExisting).to.equal(true);
      })
      .call(callback);
  });

  this.Then(/^I should see a bootbox with title "([^"]*)"$/, function(expectedText, callback) {
    this.client
      .waitForExist('.bootbox-body', 20000)
      .isExisting('.modal-dialog')
      .then(function(isExisting) {
          expect(isExisting).to.equal(true);
      })
      .waitForVisible('.modal-header', 1000)
      .getText('h4=' + expectedText)
      .call(callback);
  });

  this.Then(/^I quit the bootbox$/, function(callback) {
    this.client
      .waitForVisible('.bootbox-close-button', 2000)
      .click('.bootbox-close-button')
      .timeoutsImplicitWait(1000)
      .waitForVisible('.modal-dialog', 2000, true)
      .call(callback);
  });

  this.Then(/^the Stripe field "([^"]*)" should (say|contain|not contain) "([^"]*)"$/, function(field, option, desiredText, callback) {
    this.client
      .waitForVisible(field, 5000)
      .waitUntil(function() {
        return this.getText(field).then(function(text) {
          if (option === 'say') {
            return expect(text).to.equal(desiredText);
          } else if (option === 'contain') {
            return expect(text).to.contain(desiredText);
          } else if (option === 'not contain') {
            return expect(text).to.not.contain(desiredText);
          }
        });
      }, 10000)
      .call(callback);
  });
};
