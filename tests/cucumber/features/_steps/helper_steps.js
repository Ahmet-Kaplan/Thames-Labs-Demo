module.exports = function () {

  this.Then(/^I should see the title "([^"]*)"$/, function (expectedTitle, callback) {
    this.client
      .getTitle().should.become(expectedTitle)
      .notify(callback);
  });

  this.Then(/^I should see the heading "([^"]*)"$/, function (expectedHeading, callback) {
    this.client
      .waitForExist('h1*=' + expectedHeading, 2000)
      .getText('h1*=' + expectedHeading)
      .call(callback);
  });
  
  this.Then(/^I should see a modal$/, function(callback) {
    this.client
      .waitForExist('.modal-dialog', 2000)
      .call(callback);
  });
  
  this.Then(/^I should see a modal with text "([^"]*)"$/, function(expectedText, callback) {
    this.client
      .waitForExist('.modal-dialog', 2000)
      .getText('.modal-dialog')
      .then(function (text) {
          expect(text).to.contain(expectedText);
      })
      .call(callback);
  });

  this.When(/^I click "([^"]*)"$/, function (id, callback) {
    this.client
      .waitForExist(id, 2000)
      .click(id)
      .call(callback);
  });
};
