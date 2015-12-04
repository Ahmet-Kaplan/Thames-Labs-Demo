module.exports = function() {

  this.Given(/^a project type has been created$/, function() {
    browser
      .executeAsync(function(done) {
        Meteor.call('addDefaultProjectType', function() {
          done();
        });
      });
  });
  
  this.Given(/^a limited project type has been created$/, function() {
    browser
      .executeAsync(function(done) {
        Meteor.call('addLimitedProjectType', function() {
          done();
        });
      });
  });
};
