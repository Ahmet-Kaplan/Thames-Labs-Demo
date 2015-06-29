module.exports = function () {

  var url = require('url');

  var login = function(done) {
    Meteor.loginWithPassword("test@domain.com", "goodpassword", done)
  };

  this.Given(/^I am a logged in user$/, function (callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/'))
      .executeAsync(login)
      .call(callback);
  });

  this.Then(/^I see an inspirational quote$/, function(callback) {
    this.client
      .waitForExist("#quote-box", 2000)
      .getText("#quote-box", function (err, text) {
        expect(text).to.exist();
      //  text.should.contain("Quotation of the day");
      })
      .call(callback)
  });
}
