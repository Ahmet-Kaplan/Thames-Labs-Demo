module.exports = function() {

  function logout(done) {
    Meteor.logout(done);
  }

  function login(email, password, done) {
    Meteor.loginWithPassword(email, password, done);
  }

  /***************************************************
                          GIVEN
  ***************************************************/
  this.Given(/^a superadmin exists$/, function() {
    browser
      .executeAsync(function(done) {
        Meteor.call('createTestSuperAdmin', done);
      });
  });
  this.Given(/^I (?:am a logged out user)$/, function() {
    browser.executeAsync(logout);
  });
  this.Given(/^I am a logged in user$/, function() {
    browser.executeAsync(login, 'test@domain.com', 'goodpassword');
  });
  this.Given(/^I am a logged in superadmin user$/, function() {
    browser.executeAsync(login, 'admin@cambridgesoftware.co.uk', 'admin');
  });
  this.Given(/^an additional "([^"]*)" has been created$/, function(entity) {
    browser.executeAsync(function(innerEntity, done) {
      Meteor.call('add' + innerEntity, '1', true, function() {
        done();
      });
    }, entity);
  });
  this.Given(/^toastr are cleared$/, function() {
    browser.executeAsync(function(done) {
      toastr.clear();
      done();
    });
  });

  /***************************************************
                          WHEN
  ***************************************************/

  this.When(/^I navigate to "([^"]*)"$/, function(relativePath) {
    const path = url.resolve(process.env.ROOT_URL, relativePath);
    browser.url(path);
  });

  this.When(/^I navigate backwards in the browser history$/, function() {
    browser.back();
  });

  this.When(/^I click "([^"]*)"$/, function(id) {
    browser.waitForExist(id, 5000);
    browser.scroll(id);
    browser.safeClick(id);
  });

  this.When(/^I click the selector "([^"]*)"$/, function(selector) {
    browser.safeClick(selector);
  });

  this.When(/^I set rich text field "([^"]*)" to "([^"]*)"$/, function(fieldName, value) {
    browser.waitForExist('div[data-schema-key=' + fieldName + ']', 5000);
    browser
      .executeAsync(function(innerFieldName, innerValue, done) {
        //Set value for medium text editor because it isn't a standard input
        $('div[data-schema-key=' + innerFieldName + ']').html(innerValue);
        done();
      }, fieldName, value);
  });

  this.When(/^I set text field "([^"]*)" to "([^"]*)"$/, function(fieldName, value) {
    browser.waitForExist('input[data-schema-key=' + fieldName + ']', 5000);
    browser.waitForVisible('input[data-schema-key=' + fieldName + ']', 5000);
    browser.setValue('input[data-schema-key=' + fieldName + ']', value);
  });

  this.When(/^I set textarea "([^"]*)" to "([^"]*)"$/, function(fieldName, value) {
    browser.waitForExist('textarea[data-schema-key=' + fieldName + ']', 5000);
    browser.waitForVisible('textarea[data-schema-key=' + fieldName + ']', 5000);
    browser.setValue('textarea[data-schema-key=' + fieldName + ']', value);
  });

  //This step is necessary when editing fields within an array (eg Opportunites, field items.0.name)
  this.When(/^I set text field with id "([^"]*)" to "([^"]*)"$/, function(fieldName, value) {
    browser.waitForExist('#' + fieldName, 5000);
    browser.waitForVisible('#' + fieldName, 5000);
    browser.setValue('#' + fieldName, value);
  });

  //This step is necessary when editing fields where maximum selection flexibility is required (e.g. tags)
  this.When(/^I set text field with selector "([^"]*)" to "([^"]*)"$/, function(selector, value) {
    browser.waitForExist(selector, 5000);
    browser.waitForVisible(selector, 5000);
    browser.setValue(selector, value);
  });

  this.When(/^I selectize "([^"]*)" to "([^"]*)"$/, function(selector, value) {
    const selectizeInput = '#' + selector + ' + .selectize-control>.selectize-input>input',
          selectizeDropdown = '#' + selector + ' + .selectize-control>.selectize-dropdown',
          selectizeOption = '#' + selector + ' + .selectize-control>.selectize-dropdown .option';
    browser.safeClick(selectizeInput);
    browser.waitForVisible(selectizeOption, 5000);
    browser.waitForVisible('.option*=' + value, 5000);
    browser.keys('Tab');
    browser.waitForVisible(selectizeDropdown, 5000, true);
  });

  this.When(/^I select "([^"]*)" from dropdown field "([^"]*)"$/, function(value, fieldName) {
    browser.waitForExist('select[data-schema-key=' + fieldName + ']', 5000);
    browser.waitForVisible('select[data-schema-key=' + fieldName + ']', 5000);
    browser.click('select[data-schema-key=' + fieldName + ']');
    browser.selectByVisibleText('select[data-schema-key=' + fieldName + ']', value);
  });

  this.When(/^I add the tag "([^"]*)"$/, function(tagText) {
    browser.keys([tagText]);
    expect(browser.getValue('.selectize-control>.selectize-input input')).toContain(tagText);
    browser.keys(['Return']);
    browser.executeAsync(function(done) {
      $('.selectize-input').blur();
      done();
    });
  });

  this.When(/^I submit the "([^"]*)" form$/, function(formName) {
    browser.waitForExist('#' + formName + "Form", 5000);
    browser.submitForm('#' + formName + "Form");
  });

  this.When(/^I click confirm on the modal$/, function() {
    browser.waitForExist(".modal-footer .btn-primary", 5000);
    browser.waitForVisible(".modal-footer .btn-primary", 5000);
    browser.scroll(".modal-footer .btn-primary", 0, -60);
    browser.safeClick(".modal-footer .btn-primary");
  });

  this.When(/^I click confirm on the modal with title "([^"]*)"$/, function(expectedTitle) {
    browser.waitForExist('h4*=' + expectedTitle, 5000);
    browser.execute(function(innerExpectedTitle) {
      var modal = $('h4:contains("' + innerExpectedTitle + '")').parent().parent();
      modal.children('.modal-footer').children('button.btn-primary').click();
    }, expectedTitle);
  });

  this.When(/^I click "([^"]*)" and select the option "([^"]*)"$/, function(menu, option) {
    browser.selectByVisibleText(menu, option);
  });

  this.When(/^I scroll to "([^"]*)"$/, function(selector) {
    browser.scroll(selector, 0, 200);
  });

  /***************************************************
                          THEN
  ***************************************************/

  this.Then(/^I should see "([^"]*)"$/, function(id) {
    browser.waitForExist(id, 5000);
    browser.waitForVisible(id, 5000);
    expect(browser.isExisting(id)).toEqual(true);
  });

  this.Then(/^I should not see "([^"]*)"$/, function(id) {
    expect(browser.isExisting(id)).toEqual(false);
  });

  this.Then(/^"([^"]*)" should be hidden$/, function(id) {
    expect(browser.isVisible(id)).toEqual(false);
  });

  this.Then(/^I should see the title "([^"]*)"$/, function(expectedTitle) {
    expect(browser.getTitle()).toBe(expectedTitle);
  });

  this.Then(/^I should see a modal$/, function() {
    browser.waitForExist('.modal', 5000);
    browser.waitForVisible('.modal', 5000);
    expect(browser.isExisting('.modal')).toEqual(true);
  });

  this.Then(/^I should see a modal with the title "([^"]*)"$/, function(expectedTitle) {
    browser.waitForExist('.modal', 5000);
    browser.waitForVisible('.modal', 5000);
    expect(browser.waitForExist('h4*=' + expectedTitle, 5000)).toEqual(true);
  });

  this.Then(/^I should not see a modal$/, function() {
    browser.executeAsync(function(done) {
      setTimeout(done, 1000);
    });
    expect(browser.isVisible('.modal')).toEqual(false);
  });

  this.Then(/^"([^"]*)" should (say|contain|not contain) "([^"]*)"$/, function(selector, option, desiredText) {
    browser.scroll(selector, 0, -60);
    var fieldValue = browser.getText(selector);
    if (option === 'say') {
      expect(fieldValue).toEqual(desiredText);
    } else if (option === 'contain') {
      expect(fieldValue).toContain(desiredText);
    } else if (option === 'not contain') {
      expect(fieldValue).not.toContain(desiredText);
    }
  });

  this.Then(/^I should see a modal with title "([^"]*)"$/, function(expectedText) {
    browser.waitForExist('.modal-header', 1000);
    browser.getText('h4=' + expectedText);
  });

  this.Then(/^the field "([^"]*)" should contain "([^"]*)"$/, function(fieldName, fieldValue) {
    browser.waitForExist('input[name=' + fieldName + ']', 5000);
    browser.waitForValue('input[name=' + fieldName + ']', 5000);
    browser.timeoutsImplicitWait(5000);
    expect(browser.getValue('input[name=' + fieldName + ']')).toContain(fieldValue);
  });

  this.Then(/^I should see a toastr with the message containing "([^"]*)"$/, function(expectedText) {
    browser.waitForExist('.toast-message', 5000);
    browser.waitForVisible('.toast-message', 5000);
    browser.waitUntil(function() {
      var toastrs = browser.getText('.toast-message');
      if (typeof toastrs !== 'object') {
        toastrs = [toastrs];
      }
      return toastrs.some(function(toastr) {
        return (toastr.search(new RegExp(expectedText)) !== -1);
      });
    }, 5000);
  });

  this.Then(/^I should see an? "([^"]*)" toastr with the message "([^"]*)"$/, function(toastrType, expectedText) {
    browser.waitForExist('.toast-' + toastrType + ' .toast-message', 5000);
    browser.waitForVisible('.toast-' + toastrType + ' .toast-message', 5000);
    expect(browser.getText('.toast-' + toastrType + ' .toast-message'))
      .toContain(expectedText);
  });

  this.Then(/^I should see an? "([^"]*)" toastr$/, function(toastrType) {
    browser.waitForExist('.toast-' + toastrType + ' .toast-message', 5000);
  });

  // For steps which require max flexibility (e.g. tags)
  this.Then(/^the field with selector "([^"]*)" should (not )?contain "([^"]*)"$/, function(selector, negate, expectedValue) {
    browser.waitForExist(selector, 5000);
    browser.timeoutsImplicitWait(5000);
    const actualValue = browser.getValue(selector);
    if (negate) {
      expect(actualValue).not.toContain(expectedValue);
    } else {
      expect(actualValue).toContain(expectedValue);
    }
  });

  this.Then(/^the tag field for the "([^"]*)" should contain "([^"]*)"$/, function(entity, expectedText) {
    const tagField = browser.getText('#tag-list-display');
    expect(tagField).toContain(expectedText);
  });

  this.Then(/^I should not see the edit tag button$/, function() {
    expect(browser.isExisting('.editTags')).toEqual(false);
  });

  this.Then(/^debug$/, function(menuText) {
    browser.debug();
  });

  this.Then(/^element "([^"]*)" should contain the text "([^"]*)"$/, function(element, desiredText) {
    browser.waitForExist(element, 5000);
    browser.waitForVisible(element, 5000);
    const elements = browser.getText(element, 2000);
    if (typeof elements === 'object') {
      return elements.some(function(elt) {
        if (elt.search(new RegExp(desiredText))) return true;
      });
    }
    expect(elements).toContain(desiredText);
  });

  this.Then(/^I cannot click "([^"]*)"$/, function(selector) {
    browser.waitForExist(selector, 5000);
    browser.waitForVisible(selector, 5000);
    browser.scroll(selector, 0, 200);
    expect(browser.isEnabled(selector)).toBe(false);
  });

  this.Then(/^I should see the url is "([^"]*)"$/, function(expectedText) {
    browser.pause(100);
    expect(browser.getUrl()).toContain(expectedText);
  });
};
