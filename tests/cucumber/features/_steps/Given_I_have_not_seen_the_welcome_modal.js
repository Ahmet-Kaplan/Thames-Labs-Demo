module.exports = function() {
  this.Given(/^I have not seen the welcome modal$/, function() {
    browser.execute(function() {
      Meteor.users.update(Meteor.userId(), {
        $unset: {
          "profile.welcomeTour": true
        }
      });
    });
    browser.refresh();
  });
};
