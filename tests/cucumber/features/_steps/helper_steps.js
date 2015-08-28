module.exports = function() {

  this.Given(/^I am a logged in user$/, function(callback) {
    this.client
      .setViewportSize({
        width: 1000,
        height: 800
      })
      .url(process.env.ROOT_URL)
      .executeAsync(logout)
      .executeAsync(login, 'test@domain.com', 'goodpassword')
      .call(callback);
  });

  this.Then(/^I should see the title "([^"]*)"$/, function(expectedTitle, callback) {
    this.client
      .getTitle().should.become(expectedTitle)
      .notify(callback);
  });

  this.Then(/^I should see the heading "([^"]*)"$/, function(expectedHeading, callback) {
    this.client
      .waitForVisible('h1*=' + expectedHeading, 2000)
      .getText('h1*=' + expectedHeading)
      .call(callback);
  });

  this.Then(/^I should see element with id "([^"]*)"$/, function(id, callback) {
    this.client
      .waitForVisible(id, 5000)
      .call(callback);
  });


  this.Then(/^I should see a modal$/, function(callback) {
    this.client
      .waitForVisible('.modal-dialog', 5000)
      .call(callback);
  });

  this.Then(/^I should see a modal with title "([^"]*)"$/, function(expectedText, callback) {
    this.client
      .waitForVisible('.modal-header', 5000)
      .getText('h4=' + expectedText)
      .call(callback);
  });
};
