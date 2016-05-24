module.exports = function() {
  this.Then(/^"([^"]*)" (should|should not) be in the list of favourites$/, function(favourite, option) {
    if (option === 'should') {
      expect(browser.isExisting('a#favUrl=' + favourite)).toBe(true);
    } else if (option === 'should not') {
      expect(browser.isExisting('a#favUrl=' + favourite)).toBe(false);
    } else {
      pending();
    }
  });
};
