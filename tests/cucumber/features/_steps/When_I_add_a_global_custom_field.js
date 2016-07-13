module.exports = function() {

  this.Then(/^I add a global custom field$/, function() {
    browser.safeClick('#addGlobalCustomField');
    browser.waitForVisible('#custom-field-name');
    browser.setValue('#custom-field-name', 'test custom field');
    browser.selectize('#select-entity', 'Company');
    browser.safeClick('#createCustomField');
  });

};
