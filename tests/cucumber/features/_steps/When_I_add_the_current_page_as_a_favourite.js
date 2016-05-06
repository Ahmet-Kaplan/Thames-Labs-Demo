module.exports = function() {
  this.When(/^I add the current page as a favourite$/, function() {
    browser.safeClick('a#collapseFavouritesButton');
    browser.safeClick('a#mnuAddToFavourites');
  });
};
