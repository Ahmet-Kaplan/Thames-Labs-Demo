module.exports = function () {

  this.Then(/^I should see the title "([^"]*)"$/, function (expectedTitle, callback) {
    this.client
      .getTitle().should.become(expectedTitle)
      .notify(callback);
  });

  this.Then(/^I should see the heading "([^"]*)"$/, function (expectedHeading, callback) {
    this.client
      .getText('h1*=' + expectedHeading)
      .call(callback);
  });

};
