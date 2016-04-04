module.exports = function() {

  // called at the beginning of the full feature run
  this.registerHandler('BeforeFeatures', function() {

    // Setup browser
    browser.setViewportSize({
      width: 1200,
      height: 700
    });

    // Add extra webdriver commands
    browser.addCommand('selectize', function(selector, value) {
      const selectizeInput = '' + selector + ' + .selectize-control>.selectize-input>input',
            selectizeDropdown = '' + selector + ' + .selectize-control>.selectize-dropdown';
      browser.waitForExist(selectizeInput, 5000);
      browser.waitForVisible(selectizeInput, 5000);
      browser.setValue(selectizeInput, value);
      browser.keys('Enter');
      browser.waitForVisible(selectizeDropdown, 5000, true);
    });

    browser.addCommand('userId', function() {
      return browser.execute(function() {
        return Meteor.userId();
      }).value;
    });

    browser.addCommand('tenantId', function() {
      return browser.execute(function() {
        return Partitioner.group();
      }).value;
    });

    browser.addCommand('safeClick', function(selector) {
      browser.waitForExist(selector);
      browser.waitForVisible(selector);
      browser.scroll(selector);
      browser.click(selector);
    });

    browser.addCommand('confirmModal', function() {
      browser.safeClick(".modal-footer .btn-primary");
      browser.waitUntil(function() {
        return !browser.isExisting('.modal-dialog');
      });
    });

  });

};
