module.exports = function() {

  var logout = function(done) {
    Meteor.logout(done);
  };

  var login = function(email, password, done) {
    Meteor.loginWithPassword(email, password, done);
  };

  var url = require('url');

  /***************************************************
                          GIVEN
  ***************************************************/
  this.Given(/^a user exists$/, function() {
    browser
      .executeAsync(function(done) {
        Meteor.call('createTestTenant', done);
      });
    browser
      .executeAsync(function(done) {
        Meteor.call('createTestUser', done);
      });
  });

  this.Given(/^a second user exists$/, function() {
    browser
      .executeAsync(function(done) {
        Meteor.call('createSecondUser', done);
      });
  })

  this.Given(/^a superadmin exists$/, function() {
    browser
      .executeAsync(function(done) {
        Meteor.call('createTestSuperAdmin', done);
      });
  });

  this.Given(/^a tenant exists$/, function() {
    browser
      .executeAsync(function(done) {
        Meteor.call('createTestTenant', done);
      });
  });

  this.Given(/^a second tenant exists$/, function() {
    browser
      .executeAsync(function(done) {
        Meteor.call('createSecondTenant', done);
      });
  })

  this.Given(/^I (am a logged out user|log out)$/, function() {
    browser.executeAsync(logout);
  });

  this.Given(/^I am a logged in user$/, function() {
    browser.executeAsync(login, 'test@domain.com', 'goodpassword');
  });

  this.Given(/^I log in as user 2$/, function() {
    browser.executeAsync(login, 'test2@domain.com', 'goodpassword');
  });

  this.Given(/^I am a logged in superadmin user$/, function() {
    browser.executeAsync(login, 'admin@cambridgesoftware.co.uk', 'admin');
  });

  this.Given(/^an? "([^"]*)" has been created$/, function(entity) {
    browser
      .executeAsync(function(entity, done) {
        Meteor.call('add' + entity, function() {
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
    var path = url.resolve(process.env.ROOT_URL, relativePath);
    browser.url(path);
  });

  this.When(/^I navigate backwards in the browser history$/, function() {
    browser.back();
  });

  this.When(/^the page is loaded$/, function() {
    browser.executeAsync(function(done) {
      //This is used to wait for the data to be loaded.
      //Ideally this should look the the subscription instead.
      setTimeout(done, 500);
    })
  })

  this.When(/^I click "([^"]*)"$/, function(id) {
    browser.waitForExist(id, 5000);
    browser.waitForVisible(id, 5000);
    browser.scroll(id, 0, -60);
    browser.click(id);
  });

  this.When(/^I set rich text field "([^"]*)" to "([^"]*)"$/, function(fieldName, value) {
    browser.waitForExist('div[data-schema-key=' + fieldName + ']', 5000);
    browser
      .executeAsync(function(fieldName, value, done) {
        //Set value for medium text editor because it isn't a standard input
        $('div[data-schema-key=' + fieldName + ']').html(value);
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

  this.When(/^I set selectize field to "([^"]*)"$/, function(value) {
    browser.waitForExist(".selectize-control .selectize-input input", 5000);
    browser.setValue(".selectize-control .selectize-input input", value);
    browser.keys(['Return']);
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
    browser.setValue(selector, value);
  });

  //This step is necessary when editing fields where maximum selection flexibility is required (e.g. tags)
  this.When(/^I set text field with selector "([^"]*)" to "([^"]*)"$/, function(selector, value) {
    browser.waitForExist(selector, 5000);
    browser.waitForVisible(selector, 5000);
    browser.setValue(selector, value);
  });

  this.When(/^I selectize "([^"]*)" to "([^"]*)"$/, function(selector, value) {
    browser.waitForExist('select#' + selector + ' + .selectize-control>.selectize-input', 5000);
    browser.waitForVisible('select#' + selector + ' + .selectize-control>.selectize-input', 5000);
    browser.click('select#' + selector + ' + .selectize-control>.selectize-input');
    browser.keys([value]);
    browser.waitForVisible('select#' + selector + ' + .selectize-control>.selectize-dropdown');
    browser.click('select#' + selector + ' + .selectize-control>.selectize-dropdown>.selectize-dropdown-content>div:first-child');
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
    browser.click(".modal-footer .btn-primary");
  });

  this.When(/^I wait$/, function() {
    browser.pause(5000)
  })

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

  this.Then(/^I should see the title "([^"]*)"$/, function(expectedTitle) {
    expect(browser.getTitle()).toBe(expectedTitle);
  });

  this.Then(/^I should see the heading "([^"]*)"$/, function(expectedHeading) {
    browser.waitForExist('h1*=' + expectedHeading, 5000);
  });

  this.Then(/^I should see a modal$/, function() {
    browser.waitForExist('.modal-dialog', 5000);
    browser.waitForVisible('.modal-dialog', 5000);
    expect(browser.isExisting('.modal-dialog')).toEqual(true);
  });

  this.Then(/^I should not see a modal$/, function() {
    browser.executeAsync(function(done) {
      setTimeout(done, 1000);
    });
    expect(browser.isVisible('.modal-dialog')).toEqual(false);
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

  this.Then(/^I should see a toastr with the message "([^"]*)"$/, function(expectedText) {
    browser.waitForExist('.toast-message', 5000);
    expect(browser.getText('.toast-message')).toContain(expectedText);
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
    var actualValue = browser.getValue(selector);
    if (negate) {
      expect(actualValue).not.toContain(expectedValue);
    } else {
      expect(actualValue).toContain(expectedValue);
    }
  });

  this.Then(/^the tag field for the "([^"]*)" should contain "([^"]*)"$/, function(entity, expectedText) {
    var theEntity = browser.executeAsync(function(entity, done) {
      done(Collections[entity].findOne()._id);
    }, entity);
    var tagField = browser.getText('#tagsBadges_' + theEntity.value);
    expect(tagField).toContain(expectedText);
  });

  this.Then(/^I should not see the edit tag button$/, function() {
    expect(browser.isExisting('.editTags')).toEqual(false);
  });

  this.Then(/^debug$/, function(menuText) {
    browser.debug();
  });
};
