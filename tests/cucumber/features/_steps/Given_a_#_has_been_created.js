module.exports = function() {
  this.Given(/^an? "([^"]*)" has been created$/, function(entity) {
    browser.executeAsync(function(entity, done) {
      Meteor.call('add' + entity, function() {
        done();
      });
    }, entity);
  });
}
