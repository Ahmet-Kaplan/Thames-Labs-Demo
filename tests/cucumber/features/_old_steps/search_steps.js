module.exports = function() {
  this.When(/^I set the filter to "([^"]*)" then "([^"]*)"$/, function(filter, value) {
    const selectizeInput = 'input#filter-box + .selectize-control>.selectize-input>input';
    browser.waitForExist(selectizeInput, 5000);
    browser.waitForVisible(selectizeInput, 5000);
    browser.setValue(selectizeInput, filter);
    expect(browser.getValue(selectizeInput)).toContain(filter);
    browser.keys(' ' + value);
    expect(browser.getValue(selectizeInput)).toContain(filter + ' ' + value);
    browser.keys('Enter');
  });
};
