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
  this.Given(/^a user exists$/, function(callback) {
    this.server.call('createTestTenant');
    this.server.call('createTestUser');
    this.client.call(callback);
  });

  this.Given(/^a superadmin exists$/, function(callback) {
    this.server.call('createTestSuperAdmin');
    this.client.call(callback);
  });

  this.Given(/^a tenant exists$/, function(callback) {
    this.server.call('createTestTenant');
    this.client.call(callback);
  });

  this.Given(/^I am a logged out user$/, function(callback) {
    this.client
      .url(process.env.ROOT_URL)
      .executeAsync(logout)
      .call(callback);
  });

  this.Given(/^I am a logged in user$/, function(callback) {
    this.client
      .url(process.env.ROOT_URL)
      .executeAsync(login, 'test@domain.com', 'goodpassword')
      .call(callback);
  });

  this.Given(/^I am a logged in superadmin user$/, function(callback) {
    this.client
      .url(process.env.ROOT_URL)
      .executeAsync(login, 'admin@cambridgesoftware.co.uk', 'admin')
      .call(callback);
  });

  this.Given(/^a "([^"]*)" has been created$/, function(entity, callback) {
    this.client
      .executeAsync(function(entity, done) {
        Meteor.call('add' + entity, function(err, data) {
          done(data);
        });
      }, entity)
      .then(function(data) {
        expect(data.value).to.exist;
      })
      .call(callback);
  });

  this.Given(/^an "([^"]*)" has been created$/, function(entity, callback) {
    this.client
      .executeAsync(function(entity, done) {
        Meteor.call('add' + entity, function(err, data) {
          done(data);
        });
      }, entity)
      .then(function(data) {
        expect(data.value).to.exist;
      })
      .call(callback);
  });

/***************************************************
                        WHEN
***************************************************/

  this.When(/^I navigate to "([^"]*)"$/, function(relativePath, callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, relativePath))
      .call(callback);
  });

  this.When(/^I click "([^"]*)"$/, function(id, callback) {
  this.client
    .waitForVisible(id, 2000)
    .scroll(id)
    .click(id)
    .call(callback);
  });

  this.When(/^I set rich text field "([^"]*)" to "([^"]*)"$/, function(fieldName, value, callback) {
    this.client
      .waitForVisible('div[data-schema-key='+ fieldName + ']', 2000)
      .executeAsync(function(fieldName, value, done) {
        //Set value for medium text editor because it isn't a standard input
        $('div[data-schema-key='+ fieldName + ']').html(value);
        done();
      }, fieldName, value)
      .call(callback);
  });

  this.When(/^I set text field "([^"]*)" to "([^"]*)"$/, function(fieldName, value, callback) {
    this.client
      .waitForVisible('input[data-schema-key='+ fieldName + ']', 2000)
      .setValue('input[data-schema-key='+ fieldName + ']', value)
      .call(callback);
  });
  //This step is necessary when editing fields within an array (eg Opportunites, field items.0.name)
  this.When(/^I set text field with id "([^"]*)" to "([^"]*)"$/, function(fieldName, value, callback) {
    this.client
      .waitForVisible('#'+ fieldName, 2000)
      .setValue('#'+ fieldName, value)
      .call(callback);
  });

  this.When(/^I select "([^"]*)" from dropdown field "([^"]*)"$/, function(value, fieldName, callback) {
    this.client
      .waitForVisible('select[data-schema-key='+ fieldName + ']', 5000)
      .click('select[data-schema-key='+ fieldName + ']')
      .selectByVisibleText('select[data-schema-key='+ fieldName + ']', value)
      .call(callback);
  });

  this.When(/^I submit the "([^"]*)" form$/, function(formName, callback) {
    this.client
      .waitForVisible('#' + formName + "Form", 2000)
      .submitForm('#' + formName + "Form")
      .call(callback);
  });

  this.When(/^I click confirm on the modal$/, function(callback) {
    this.client
      .waitForVisible(".modal-content", 2000)
      .click(".modal-footer .btn-primary")
      .call(callback);
  });

  /***************************************************
                          THEN
  ***************************************************/
  this.Then(/^I should see "([^"]*)"$/, function(id, callback) {
    this.client
      .isExisting(id)
      .then(function(isExisting) {
          expect(isExisting).to.equal(true);
      })
      .call(callback);
  });

  this.Then(/^I should not see "([^"]*)"$/, function(id, callback) {
    this.client
      .isExisting(id)
      .then(function(isExisting) {
          expect(isExisting).to.equal(false);
      })
      .call(callback);
  });

  this.Then(/^I should see the title "([^"]*)"$/, function(expectedTitle, callback) {
    this.client
      .getTitle().should.become(expectedTitle)
      .notify(callback);
  });

  this.Then(/^I should see the heading "([^"]*)"$/, function(expectedHeading, callback) {
    this.client
      .waitForVisible('h1*=' + expectedHeading, 2000)
      .getText('h1*=' + expectedHeading)
      .call(callback);
  });

  this.Then(/^I should see a modal$/, function(callback) {
    this.client
      //.waitForVisible('.modal-dialog', 5000)
      .isExisting('.modal-dialog')
      .then(function(isExisting) {
          expect(isExisting).to.equal(true);
      })
      .call(callback);
  });

  this.Then(/^I should not see a modal$/, function(callback) {
    this.client
      .waitForExist('.modal-dialog', 5000, true)
      .isExisting('.modal-dialog')
      .then(function(isExisting) {
          expect(isExisting).to.equal(false);
      })
      .call(callback);
  });

  this.Then(/^"([^"]*)" should say "([^"]*)"$/, function(selector, desiredText, callback) {
    this.client
      .getText("#" + selector)
      .then(function(text) {
        expect(text).to.equal(desiredText);
      })
      .call(callback);
  })

  this.Then(/^I should see a modal with title "([^"]*)"$/, function(expectedText, callback) {
    this.client
      .waitForVisible('.modal-header', 5000)
      .getText('h4=' + expectedText)
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

  this.Then(/^debug$/, function(menuText, callback) {
    this.client
      .debug()
      .call(callback);
  });
};
