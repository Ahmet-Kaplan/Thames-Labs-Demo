module.exports = function() {
  this.When(/^I visit ([^"]*)$/, function(entity) {
    browser.safeClick('a#menuLink' + entity);
  });
};
