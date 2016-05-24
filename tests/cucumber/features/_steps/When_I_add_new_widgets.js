module.exports = function() {
  this.When(/^I add new widgets$/, function() {
    browser.click('#addWidgetButton');
    // Check already added options are disabled
    expect(browser.getAttribute('li=Chatter', 'class')).toBe('disabled');
    expect(browser.getAttribute('li=Quotation of the day', 'class')).toBe('disabled');
    expect(browser.getAttribute('li=Online users', 'class')).toBe('disabled');
    browser.click('li=Tasks Overview');
    browser.click('#addWidgetButton');
    expect(browser.getAttribute('li=Tasks Overview', 'class')).toBe('disabled');
    browser.click('li=Company Summary');
    browser.click('#addWidgetButton');
    expect(browser.getAttribute('li=Company Summary', 'class')).toBe('disabled');
    browser.click('li=Watched Items');
  });
};
