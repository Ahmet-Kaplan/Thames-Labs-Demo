module.exports = function() {

  this.Given(/^I have reached the limit of records$/, function() {
    browser.execute(function() {
      Meteor.call('addRecordsToLimit');
    });
  });

};
