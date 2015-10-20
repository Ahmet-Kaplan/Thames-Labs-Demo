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
    client
      .executeAsync(function(done) {
        Meteor.call('createTestTenant', done);
      });
    client
      .executeAsync(function(done) {
        Meteor.call('createTestUser', done);
      });
  });

  this.Given(/^a superadmin exists$/, function() {
    client
      .executeAsync(function(done) {
        Meteor.call('createTestSuperAdmin', done);
      });
  });

  this.Given(/^a tenant exists$/, function() {
    client
      .executeAsync(function(done) {
        Meteor.call('createTestTenant', done);
      });
  });

  this.Given(/^I am a logged out user$/, function() {
    client.executeAsync(logout);
  });

  this.Given(/^I am a logged in user$/, function() {
    client.executeAsync(login, 'test@domain.com', 'goodpassword');
  });

  this.Given(/^I am a logged in superadmin user$/, function() {
    client.executeAsync(login, 'admin@cambridgesoftware.co.uk', 'admin');
  });

  this.Given(/^an? "([^"]*)" has been created$/, function(entity) {
    client
      .executeAsync(function(entity, done) {
        Meteor.call('add' + entity, function() {
          done();
        });
      }, entity);
  });

  this.Given(/^toastr are cleared$/, function() {
    client.executeAsync(function(done) {
      toastr.clear();
      done();
    });
  });

/***************************************************
                        WHEN
***************************************************/

  this.When(/^I navigate to "([^"]*)"$/, function(relativePath) {
    var path = url.resolve(process.env.ROOT_URL, relativePath);
    client.url(path);
  });

  this.When(/^I click "([^"]*)"$/, function(id) {
    client.waitForExist(id, 5000);
    client.waitForVisible(id, 5000);
    client.scroll(id, 0, -60);
    client.click(id);
  });

  this.When(/^I set rich text field "([^"]*)" to "([^"]*)"$/, function(fieldName, value) {
    client.waitForExist('div[data-schema-key=' + fieldName + ']', 5000);
    client
      .executeAsync(function(fieldName, value, done) {
        //Set value for medium text editor because it isn't a standard input
        $('div[data-schema-key=' + fieldName + ']').html(value);
        done();
      }, fieldName, value);
  });

  this.When(/^I set text field "([^"]*)" to "([^"]*)"$/, function(fieldName, value) {
    client.waitForExist('input[data-schema-key=' + fieldName + ']', 5000);
    client.waitForVisible('input[data-schema-key=' + fieldName + ']', 5000);
    client.setValue('input[data-schema-key=' + fieldName + ']', value);
  });

  this.When(/^I set selectize field to "([^"]*)"$/, function(value) {
    client.waitForExist(".selectize-control .selectize-input input", 5000);
    client.setValue(".selectize-control .selectize-input input", value);
    client.keys(['Return']);
  });

  //This step is necessary when editing fields within an array (eg Opportunites, field items.0.name)
  this.When(/^I set text field with id "([^"]*)" to "([^"]*)"$/, function(fieldName, value) {
    client.waitForExist('#' + fieldName, 5000);
    client.waitForVisible('#' + fieldName, 5000);
    client.setValue('#' + fieldName, value);
  });

  //This step is necessary when editing fields where maximum selection flexibility is required (e.g. tags)
  this.When(/^I set text field with selector "([^"]*)" to "([^"]*)"$/, function(selector, value) {
    client.waitForExist(selector, 5000);
    client.setValue(selector, value);
  });

  //This step is necessary when editing fields where maximum selection flexibility is required (e.g. tags)
  this.When(/^I set text field with selector "([^"]*)" to "([^"]*)"$/, function(selector, value) {
    client.waitForExist(selector, 5000);
    client.waitForVisible(selector, 5000);
    client.setValue(selector, value);
  });

  this.When(/^I selectize "([^"]*)" to "([^"]*)"$/, function(selector, value) {
    client.waitForExist('select#' + selector + ' + .selectize-control>.selectize-input', 5000);
    client.click('select#' + selector + ' + .selectize-control>.selectize-input');
    client.keys([value]);
    client.waitForExist('select#' + selector + ' + .selectize-control>.selectize-dropdown>.selectize-dropdown-content', 3000);
    client.click('select#' + selector + ' + .selectize-control>.selectize-dropdown>.selectize-dropdown-content>.active');
  });

  this.When(/^I select "([^"]*)" from dropdown field "([^"]*)"$/, function(value, fieldName) {
    client.waitForExist('select[data-schema-key=' + fieldName + ']', 5000);
    client.waitForVisible('select[data-schema-key=' + fieldName + ']', 5000);
    client.click('select[data-schema-key=' + fieldName + ']');
    client.selectByVisibleText('select[data-schema-key=' + fieldName + ']', value);
  });

  this.When(/^I submit the "([^"]*)" form$/, function(formName) {
    client.waitForExist('#' + formName + "Form", 5000);
    client.submitForm('#' + formName + "Form");
  });

  this.When(/^I click confirm on the modal$/, function() {
    client.waitForExist(".modal-footer .btn-primary", 5000);
    client.waitForVisible(".modal-footer .btn-primary", 5000);
    client.scroll(".modal-footer .btn-primary", 0, -60);
    client.click(".modal-footer .btn-primary");
  });

  /***************************************************
                          THEN
  ***************************************************/
  this.Then(/^I should see "([^"]*)"$/, function(id) {
    client.waitForExist(id, 5000);
    client.waitForVisible(id, 5000);
    expect(client.isExisting(id)).toEqual(true);
  });

  this.Then(/^I should not see "([^"]*)"$/, function(id) {
    expect(client.isExisting(id)).toEqual(false);
  });

  this.Then(/^I should see the title "([^"]*)"$/, function(expectedTitle) {
    expect(client.getTitle()).toBe(expectedTitle);
  });

  this.Then(/^I should see the heading "([^"]*)"$/, function(expectedHeading) {
    client.waitForExist('h1*=' + expectedHeading, 5000);
  });

  this.Then(/^I should see a modal$/, function() {
    client.waitForExist('.modal-dialog', 5000);
    client.waitForVisible('.modal-dialog', 5000);
    expect(client.isExisting('.modal-dialog')).toEqual(true);
  });

  this.Then(/^I should not see a modal$/, function() {
    client.executeAsync(function(done) {
      setTimeout(done, 1000);
    });
    expect(client.isVisible('.modal-dialog')).toEqual(false);
  });

  this.Then(/^"([^"]*)" should (say|contain|not contain) "([^"]*)"$/, function(selector, option, desiredText) {
    client.scroll(selector, 0, -60);
    var fieldValue = client.getText(selector);
    if (option === 'say') {
      expect(fieldValue).toEqual(desiredText);
    } else if (option === 'contain') {
      expect(fieldValue).toContain(desiredText);
    } else if (option === 'not contain') {
      expect(fieldValue).not.toContain(desiredText);
    }
  });

  this.Then(/^I should see a modal with title "([^"]*)"$/, function(expectedText) {
    client.waitForExist('.modal-header', 1000);
    client.getText('h4=' + expectedText);
  });

  this.Then(/^the field "([^"]*)" should contain "([^"]*)"$/, function(fieldName, fieldValue) {
    client.waitForExist('input[name=' + fieldName + ']', 5000);
    client.waitForValue('input[name=' + fieldName + ']', 5000);
    client.timeoutsImplicitWait(5000);
    expect(client.getValue('input[name=' + fieldName + ']')).toContain(fieldValue);
  });

  this.Then(/^I should see a toastr with the message "([^"]*)"$/, function(expectedText) {
    client.waitForExist('.toast-message', 5000);
    expect(client.getText('.toast-message')).toContain(expectedText);
  });

  this.Then(/^I should see an? "([^"]*)" toastr with the message "([^"]*)"$/, function(toastrType, expectedText) {
    client.waitForExist('.toast-' + toastrType + ' .toast-message', 5000);
    client.waitForVisible('.toast-' + toastrType + ' .toast-message', 5000);
    expect(client.getText('.toast-' + toastrType + ' .toast-message'))
      .toContain(expectedText);
  });

  this.Then(/^I should see an? "([^"]*)" toastr$/, function(toastrType) {
    client.waitForExist('.toast-' + toastrType + ' .toast-message', 5000);
  });

  // For steps which require max flexibility (e.g. tags)
  this.Then(/^the field with selector "([^"]*)" should (not )?contain "([^"]*)"$/, function(selector, negate, expectedValue) {
    client.waitForExist(selector, 5000);
    client.timeoutsImplicitWait(5000);
    var actualValue = client.getValue(selector);
    if (negate) {
      expect(actualValue).not.toContain(expectedValue);
    } else {
      expect(actualValue).toContain(expectedValue);
    }
  });

  this.Then(/^debug$/, function(menuText) {
    client.debug();
  });
};
