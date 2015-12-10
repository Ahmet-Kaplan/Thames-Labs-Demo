module.exports = function() {

  this.Given(/^I have reached the limit of records$/, function() {
    browser.executeAsync(function(done) {
      Meteor.call('addRecordsToLimit', function(err, res) {
        if(res === true) done();
      });
    });
  });

};
