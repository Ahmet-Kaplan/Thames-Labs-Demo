module.exports = function() {
  this.When(/^I remove the global custom field$/, function() {
    browser.safeClick('.delete-global-custom-field');
    browser.confirmModal();
  });
};
