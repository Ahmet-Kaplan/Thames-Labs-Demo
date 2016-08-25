module.exports = function() {

  this.When(/^I navigate to a project page$/, function() {
    browser.executeAsync(function(done) {
      FlowRouter.go("/projects");
      done();
    });
    browser.waitForExist('.list-group-item:not(#moar)', 5000);
    browser.waitForVisible('.list-group-item:not(#moar)', 5000);
    browser.click('.list-group-item');
  });
};
