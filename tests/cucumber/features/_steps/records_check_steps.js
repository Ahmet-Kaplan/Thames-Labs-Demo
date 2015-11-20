module.exports = function() {

  this.Given(/^I have reached the limit of records$/, function() {
    browser.executeAsync(function(done) {
      Meteor.call('addRecordsToLimit', done);
    });
  });

};
