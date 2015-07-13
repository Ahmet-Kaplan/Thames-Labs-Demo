module.exports = function() {

  var url = require('url');

  this.Given(/^a company has been created$/, function(callback) {
    this.server.call('createCompany').then(callback);
  });

  this.Given(/^the company has a tag$/, function(callback) {
    // this.server.call('addTagToCompany').then(callback);
  });

  this.Then(/^I should see a tag on the company$/, function(callback) {
    this.client
      // .waitForExist('#loading-page', 5000, true)
      // .waitForExist('#company-list')
      .execute(function(){
        Meteor.call('addTagToCompany');
      })
      .getText('#company-list', function(err, text) {
        expect(text).to.contain('test tag');
      })
      .call(callback);
  });

};
