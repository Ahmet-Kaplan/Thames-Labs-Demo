module.exports = function() {

  var url = require('url');

  this.Given(/^a company has been created$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('createTestCompany', function(err, data) {
          done(data);
        });
      })
      .then(function(data) {
        expect(data.value).to.exist;
      })
      .call(callback);
  });

  this.When(/^I navigate to a company page$/, function(callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/companies'))
      .waitForExist('#mchCompany', 2000)
      .click('#mchCompany')
      .call(callback);
  });

  this.Then(/^I should see a panel with title "([^"]*)"$/, function(panelTitle, callback) {
    this.client
      .waitForExist('#entity-custom-fields', 2000)
      .getText('h5.panel-title=' + panelTitle)
      .call(callback);
  });

  this.When(/^I click the "Add Custom Field" button$/, function(callback) {
    this.client
      .waitForExist('#add-custom-field', 2000)
      .scroll('#add-custom-field')
      .click('#add-custom-field')
      .call(callback);
  });

  this.Then(/^I should see a modal with header "([^"]*)"$/, function(expectedTitle, callback) {
    this.client
      .waitForExist('.modal', 5000)
      .getText('h5').then(function(text) {
        expect(text).to.contain(expectedTitle);
      })
      .call(callback);
  });

  this.When(/^I add a new custom field$/, function(callback) {
    this.client
      .waitForExist('.modal-dialog', 5000)
      .setValue('#custom-field-name', 'velocity')
      .setValue('#custom-field-value', 'cucumber')
      .click('#submit-custom-field')
      .call(callback);
  });

  this.Then(/^I should see the custom field "([^"]*)" in the list$/, function(expectedText, callback) {
    this.client
      .waitForExist('.custom-field-display-item', 2000)
      .getText('.custom-field-display-item').then(function(text) {
        expect(text).to.contain(expectedText);
      })
      .call(callback);
  })

  this.When(/^I can see the "([^"]*)" custom field$/, function(expectedText, callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('createTestCustomField', function(err, data) {
          done(data);
        });
      })
      .waitForExist('.custom-field-display-item', 2000)
      .getText('.custom-field-display-item').then(function(text) {
        expect(text).to.contain(expectedText);
      })
      .call(callback);
  });

  this.When(/^I click the "Edit" button$/, function(callback) {
    this.client
      .waitForExist('#edit-custom-field', 2000)
      .click('#edit-custom-field')
      .call(callback);
  });

  this.When(/^I make a change$/, function(callback) {
    this.client
      .waitForExist('.modal-dialog', 5000)
      .setValue('#custom-field-value', 'cucumber test')
      .click('#submit-custom-field')
      .call(callback);
  });

  this.Then(/^I should see the updated custom field "([^"]*)" in the list$/, function(expectedText, callback) {
    this.client
      .waitForExist('.custom-field-display-item', 2000)
      .getText('.custom-field-display-item').then(function(text) {
        expect(text).to.contain(expectedText);
      })
      .call(callback);
  });

  this.When(/^I click the "Delete" button$/, function(callback) {
    this.client
      .waitForExist('#delete-custom-field', 2000)
      .click('#delete-custom-field')
      .call(callback);
  });

  this.Then(/^I should no longer see the custom field "([^"]*)" in the list$/, function(expectedText, callback) {
    this.client
      .waitForExist('.custom-field-display-item', 2000, true)
      .call(callback);
  })
};
