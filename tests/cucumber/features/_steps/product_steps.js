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
      .waitForVisible('#insertProductForm', 2000)
      .setValue('#name-field', 'test product 2')
      .executeAsync(function(done) {
        //Set value for medium text editor because it isn't a standard input
        $("#desc-field").html("<p>test description</p>");
        done();
      })
      .submitForm('#insertProductForm')
      .call(callback);
  });

  this.When(/^I navigate to a product page$/, function(callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/products'))
      .waitForExist('.product-item', 2000)
      .click('.product-item')
      .call(callback);
  });

  this.When(/^I enter updated product details$/, function(callback) {
    this.client
      .waitForVisible('#updateProductForm', 2000)
      .setValue('#name-field', 'updated product')
      .submitForm('#updateProductForm')
      .call(callback);
  });

  this.Then(/^I should see the updated product$/, function(callback) {
    this.client
      .getText('.entity-name')
      .then(function(text) {
        expect(text).to.equal('updated product');
      })
      .call(callback);
  });

  this.Then(/^the product should not exist$/, function(callback) {
    this.client
      .getText('h4*=No products')
      .call(callback);
  });

  this.When(/^I delete a product$/, function(callback) {
    this.client
      .waitForExist("#delete-product", 2000)
      .click("#delete-product")
      .waitForVisible(".modal-content", 2000)
      .click(".modal-footer .btn-primary")
      .call(callback);
  })

};
