module.exports = function() {

  this.Given(/^I create a new contact belonging to a company$/, function() {
    browser.executeAsync(function(done) {
      Meteor.call('addContactForCompany', done);
    });
  });

};
