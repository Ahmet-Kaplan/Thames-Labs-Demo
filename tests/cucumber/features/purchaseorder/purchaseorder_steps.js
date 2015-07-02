module.exports = function() {

  this.Then(/^I should see a list of purchase orders$/, function (callback) {
    this.client
      .waitForExist('#purchase-order-list')
      .getText('h1', function(text) {
        expect(text).to.contain('Purchase Orders')
      })
      .call(callback);
  });

};
