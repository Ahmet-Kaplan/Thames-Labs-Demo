module.exports = function() {

  this.When(/^I navigate to a company page$/, function() {
    browser.executeAsync(function(done) {
      FlowRouter.go("/companies");
      done();
    });
    browser.safeClick('#mchCompany');
  });

};
