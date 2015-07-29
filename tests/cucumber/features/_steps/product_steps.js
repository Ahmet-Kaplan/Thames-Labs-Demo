module.exports = function() {

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
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.Then(/^I a new product should exist$/, function(callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

  this.When(/^I navigate to a product page$/, function(callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
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


};
