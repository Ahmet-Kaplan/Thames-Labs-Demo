module.exports = function() {

  this.Then(/^I add a global custom field$/, function() {
    browser.scroll('#globCustomFieldsExpander');
    browser.click('#globCustomFieldsExpander');
    browser.scroll('#addGlobalCustomField');
    browser.click('#addGlobalCustomField');
    browser.setValue('#custom-field-name', 'test custom field');
    browser.selectize('#select-entity', 'Company');
    browser.click('#createCustomField');
  });

};
