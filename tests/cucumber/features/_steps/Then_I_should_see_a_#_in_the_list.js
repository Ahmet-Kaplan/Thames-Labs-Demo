module.exports = function() {
  this.Then(/^I should (not )?see an? ([^"]*) in the list$/, function(negate, entity) {
    if(!negate) {
      browser.waitForExist('.list-group', 2000);
    }else {
      browser.waitForExist('.list-item', 2000, true);
    }
  });
};
