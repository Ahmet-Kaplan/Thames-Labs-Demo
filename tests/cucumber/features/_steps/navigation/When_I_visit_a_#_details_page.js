module.exports = function() {
  this.When(/^I go to an? ([^"]*) detail page$/, function(entity) {
    browser.safeClick('a#menu-link-' + entity.toLowerCase());
    browser.waitForExist('.list-group-item:not(#moar)', 5000);
    browser.waitForVisible('.list-group-item:not(#moar)', 5000);
    browser.click('.list-group-item');
  });
};
