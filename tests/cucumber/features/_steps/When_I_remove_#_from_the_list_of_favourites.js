module.exports = function() {
  this.When(/^I remove "([^"]*)" from the list of favourites$/, function(favourite) {
    // Okay, this is silly, but couldn't figure out the webdriver selector...
    browser.execute(function(innerFavourite) {
      const link = $("a#favUrl:contains('" + innerFavourite + "')")[0];
      $(link).parent().parent().parent().find('.remove-favourite').click();
    }, favourite);
    browser.confirmModal();
  });
};
