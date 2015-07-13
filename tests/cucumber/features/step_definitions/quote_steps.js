module.exports = function () {

  var url = require('url');

  this.Then(/^I see an inspirational quote$/, function(callback) {
    this.client
      .waitForExist("#quote-box")
      .getText("#quote-box", function (err, text) {
        expect(text).to.equal("Quotation of the day");
      //  text.should.contain("Quotation of the day");
      })
      .call(callback)
  });
}
