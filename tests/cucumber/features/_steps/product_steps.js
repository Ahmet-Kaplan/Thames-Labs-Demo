module.exports = function() {

  var url = require('url');

//Reading
  this.When(/^I navigate to a product page$/, function(callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/products'))
      .waitForExist('.product-item', 2000)
      .click('.product-item')
      .call(callback);
  });

//Deleting
  this.Then(/^the product should not exist$/, function(callback) {
    this.client
      .getText('h4*=No products')
      .call(callback);
  });
};
