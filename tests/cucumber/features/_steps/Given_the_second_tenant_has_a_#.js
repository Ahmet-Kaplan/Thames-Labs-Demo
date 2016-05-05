module.exports = function() {
  this.Given(/^the second tenant has an? ([^"]*)$/, function(entity) {
    browser.execute(function() {
      Meteor.call('switchUser');
    });
    browser.executeAsync(function(entity, done) {
      Meteor.call('add' + entity, function() {
        done();
      });
    }, entity);
    browser.execute(function() {
      Meteor.call('switchBack');
    });
  });
}
