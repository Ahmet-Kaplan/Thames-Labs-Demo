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

//Creating
  this.Given(/^a product has been created$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('addProduct', function(err, data) {
          done(data);
        });
      })
      .then(function(data) {
        expect(data.value).to.exist;
      })
      .call(callback);
  });

//Deleting
  this.Then(/^the product should not exist$/, function(callback) {
    this.client
      .getText('h4*=No products')
      .call(callback);
  });
};
