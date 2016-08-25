module.exports = function() {

  //Reading
  this.When(/^I navigate to a product page$/, function() {
    browser.executeAsync(function(done) {
      FlowRouter.go("/products");
      done();
    });
    browser.waitForExist('.product-item', 2000);
    browser.click('.product-item');
  });

};
