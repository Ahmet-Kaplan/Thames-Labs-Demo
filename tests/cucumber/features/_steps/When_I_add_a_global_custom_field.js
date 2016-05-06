module.exports = function() {

  this.Then(/^I add a global custom field$/, function() {
    browser.safeClick('#globCustomFieldsExpander');
    browser.safeClick('#addGlobalCustomField');
    browser.setValue('#custom-field-name', 'test custom field');
    browser.selectize('#select-entity', 'Company');
    browser.safeClick('#createCustomField');
  });

};
