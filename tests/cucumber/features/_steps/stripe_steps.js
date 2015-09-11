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
      .click(".modal-footer .btn-primary")
      .waitForVisible('.bootbox-body', 20000)
      .isExisting('.modal-dialog')
      .then(function(isExisting) {
          expect(isExisting).to.equal(true);
      })
      .keys(['27'])
      .waitForVisible("#planName", 5000)
      .getText("#planName")
      .then(function(text) {
        expect(text).to.equal("Paying");
      })
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
      .waitForVisible('.bootbox-body', 20000)
      .isExisting('.modal-dialog')
      .then(function(isExisting) {
          expect(isExisting).to.equal(true);
      })
      .keys(['27'])
      .waitForVisible("#planName", 5000)
      .getText("#planName")
      .then(function(text) {
        expect(text).to.equal("Free");
      })
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

  this.Then(/^I quit the bootbox$/, function(callback) {
    this.client
      .keys(['27'])
      .call(callback);
  });
};
