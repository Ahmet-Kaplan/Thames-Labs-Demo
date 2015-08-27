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

  this.Given(/^I am not blocked$/, function(callback) {
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

  this.Then(/^I can fill the contact form and sumbit$/, function(callback) {
    this.client
      .waitForVisible('#insertContactForm', 2000)
      .selectByIndex('select[name=title]', 5)
      .setValue('input[name=forename]', 'Marie')
      .setValue('input[name=surname]', 'Curie')
      .setValue('#geo', '4 Place Jussieu, Paris 75005')
      .waitForVisible('.pac-item')
      .click('.pac-item')
      .submitForm('#insertContactForm')
      .call(callback);
  });

  this.Then(/^I should see the contact's page$/, function(callback) {
    this.client
      .waitForVisible('#contact-details', 2000)
      .getText('#contact-details').then(function(text) {
        expect(text).to.be.not.empty;
      })
      .call(callback)
  })
};
