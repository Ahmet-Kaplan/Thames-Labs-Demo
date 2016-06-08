module.exports = function() {
  this.Given(/^an? "([^"]*)" has been created$/, function(entity) {
    browser.executeAsync(function(innerEntity, done) {
      Meteor.call('add' + innerEntity, function() {
        done();
      });
    }, entity);
  });
};
