module.exports = function() {

  this.Then(/^I should see the Companies list$/, function (callback) {
    this.client
      .waitForExist('#company-list')
      .call(callback);
  });

};
