module.exports = function() {
  this.Given(/^I have not seen the welcome modal$/, function() {
    browser.executeAsync(function(done) {
      Meteor.users.update(Meteor.userId(), {
        $unset: {
          "profile.welcomeTour": true
        }
      }, done);
    });
    browser.refresh();
  });
};
