module.exports = function() {
  this.Given(/^I am logged out$/, function() {
    browser.executeAsync(function(done) {
      Meteor.logout(done);
    });
  });
}
