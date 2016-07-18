module.exports = function() {
  this.When(/^I add the current page as a favourite$/, function() {
    browser.safeClick('a#favourites');
    browser.safeClick('a#add-to-favourites');
  });
};
