module.exports = function() {

  this.Then(/^I should see the activity in the timeline$/, function() {
    browser.waitForExist('.timeline-panel', 5000)
  })
};
