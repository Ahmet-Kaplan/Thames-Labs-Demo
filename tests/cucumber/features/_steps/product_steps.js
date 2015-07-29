module.exports = function() {

  var url = require('url');

  this.Given(/^a product has been created$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('createTestProduct', function(err, data) {
          done(data);
        });
      })
      .then(function(data) {
        expect(data.value).to.exist;
      })
      .call(callback);
  });

  this.When(/^I enter product details$/, function(callback) {
    this.client
      .waitForExist('#insertProductForm', 2000)
      .setValue('#name-field', 'Product name')
      .setValue('#desc-field', 'Description')
      .submitForm('#insertProductForm')
      .call(callback);
  });

  this.Then(/^a new product should exist$/, function(callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.When(/^I navigate to a product page$/, function(callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/products'))
      .waitForExist('.product-item', 2000)
      .click('.product-item')
      .call(callback);
  });

  this.When(/^I enter updated product details$/, function(callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Then(/^I should see the updated product$/, function(callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Then(/^the product should not exist$/, function(callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.When(/^I delete a product$/, function(callback) {
    this.client
      .waitForExist("#delete-product", 2000)
      .click("#delete-product")
      .call(callback);
  })

};
