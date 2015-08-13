module.exports = function() {

  var url = require('url');

  this.Given(/^a company has been created$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('createTestCompany', function(err, data) {
          if (err) console.log(err);
          done(data);
        });
      })
      .then(function(data) {
        expect(data.value).to.exist;
      })
      .call(callback);
  });

  this.Given(/^a contact has been created$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('createTestContact', function(err, data) {
          if (err) console.log(err);
          done(data);
        });
      })
      .then(function(data) {
        expect(data.value).to.exist;
      })
      .call(callback);
  });

  this.When(/^I search for Cowley Road$/, function(callback) {
    this.client
      .waitForVisible('#geo', 2000)
      .setValue('#geo', 'Cowley Road, Cambridge')
      .waitForVisible('.pac-item')
      .click('.pac-item')
      .call(callback);
  });

  this.When(/^I navigate to a contact page$/, function(callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/contacts'))
      .waitForExist('.list-group-item', 2000)
      .click('.list-group-item')
      .call(callback);
  });

  this.When(/^I create a new contact belonging to a company$/, function(callback) {
    this.client
      .waitForVisible('#add-contact', 2000)
      .click('#add-contact')
      .waitForVisible('.form-group', 5000)
      .selectByIndex('select[name=title]', 5)
      .setValue('input[name=forename]', 'Forename')
      .setValue('input[name=surname]', 'Surname')
      .selectByIndex('#companyId', 1)
      .getCssProperty('#addressWrapper', 'display').then(function(display) {
        expect(display.value).to.equal('none');
      })
      .submitForm('#insertContactForm')
      .call(callback);
  });

  this.Then(/^I leftclick "#new-location-search"$/, function(callback) {
    this.client
      .waitForVisible('#new-location-search', 2000)
      .click('#new-location-search')
      .getCssProperty('#show-map', 'display').then(function(display) {
        expect(display.value).to.equal('none');
      })
      .call(callback);
  });

  this.Then(/^I should not see the address fields$/, function(callback) {
    this.client
      .waitForVisible('#editContactForm', 2000)
      .isExisting('#formatted_address').then(function(isExisting) {
        expect(isExisting).to.be.false;
      })
      .call(callback);
  });

  this.Then(/^I should see the address fields$/, function(callback) {
    this.client
      .waitForVisible('#editContactForm', 2000)
      .isExisting('#formatted_address').then(function(isExisting) {
        expect(isExisting).to.be.true;
      })
      .call(callback);
  });

  this.Then(/^the field "([^"]*)" should contain "([^"]*)"$/, function(fieldName, fieldValue, callback) {
    this.client
      .waitForVisible('input[name=' + fieldName +']', 2000)
      .timeoutsImplicitWait(2000)
      .getValue('input[name=' + fieldName +']').then(function(text) {
        expect(text).to.contain(fieldValue);
      })
      .call(callback);
  });

  this.Then(/^I should see a map$/, function(callback) {
    this.client
      .waitForVisible('.gm-style', 2000)
      .waitForVisible('.gm-style-mtc', 2000)
      .call(callback);
  });

};
