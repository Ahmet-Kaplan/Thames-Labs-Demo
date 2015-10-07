module.exports = function() {

  var url = require('url');

  //Reading
  this.When(/^I navigate to a product page$/, function() {
    client.url(url.resolve(process.env.ROOT_URL, '/products'));
    client.waitForExist('.product-item', 2000);
    client.click('.product-item');
  });

  //Deleting
  this.Then(/^the product should not exist$/, function() {
    client.getText('h4*=No products');
  });

};
