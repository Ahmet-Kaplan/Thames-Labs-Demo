module.exports = function() {

  var url = require('url');

  //Reading
  this.When(/^I navigate to a product page$/, function() {
    browser.url(url.resolve(process.env.ROOT_URL, '/products'));
    browser.waitForExist('.product-item', 2000);
    browser.click('.product-item');
  });

};
