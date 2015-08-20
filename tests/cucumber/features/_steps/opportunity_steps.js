module.exports = function() {

  var url = require('url');

  this.Given(/^opportunity stages have been created$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('createTestOpportunityStages', function(err, data) {
          done(data);
        });
      })
      .then(function(data) {
        expect(data.value).to.exist;
      })
      .call(callback);
  });

  this.Given(/^an opportunity has been created$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('createTestOpportunity', function(err, data) {
          done(data);
        });
      })
      .then(function(data) {
        expect(data.value).to.exist;
      })
      .call(callback);
  });

  this.When(/^I enter opportunity details$/, function(callback) {
    this.client
      .waitForVisible('#insertOpportunityForm', 2000)
      .setValue('input[name=name]', 'test opportunity 2')
      .setValue('input[name=description]', 'test opportunity description')
      .setValue('input[name=date]','08/08/2008 8:08 PM')
      //So that the date picker loses focus
      .click('input[name=name]')
      .selectByIndex('select[name=companyId]', 1)
      .submitForm('#insertOpportunityForm')
      .call(callback);
  });

  this.Then(/^a new opportunity should exist$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('getOpportunityByName', 'test opportunity 2', function(err, data) {
          done(data);
        });
      })
      .then(function(data) {
        expect(data.value).to.exist;
      })
      .call(callback);
  });

  this.When(/^I navigate to an opportunity page$/, function(callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/opportunities'))
      .waitForExist('.list-group-item', 2000)
      .click('.list-group-item')
      .call(callback);
  });

  this.When(/^I enter updated opportunity details$/, function(callback) {
    this.client
      .waitForVisible('#editOpportunityForm', 2000)
      .setValue('input[name=name]', 'test opportunity 2')
      .submitForm('#editOpportunityForm')
      .call(callback);
  });

  this.Then(/^I should see the updated opportunity$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('getOpportunityByName', 'test opportunity 2', function(err, data) {
          done(data);
        });
      })
      .then(function(data) {
        expect(data.value).to.exist;
      })
      .executeAsync(function(done) {
        Meteor.call('getOpportunityByName', 'test opportunity', function(err, data) {
          done(data);
        });
      })
      .then(function(data) {
        expect(data.value).to.not.exist;
      })
      .call(callback);
  });

  this.Then(/^the opportunity should not exist$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('getOpportunityByName', 'test opportunity', function(err, data) {
          done(data);
        });
      })
      .then(function(data) {
        expect(data.value).to.not.exist;
      })
      .call(callback);
  });

  this.When(/^I delete an opportunity$/, function(callback) {
    this.client
      .waitForVisible("#removeOpportunity", 2000)
      .click("#removeOpportunity")
      .waitForVisible(".modal-content", 2000)
      .click(".modal-footer .btn-primary")
      .call(callback);
  });

  this.Then(/^I should be on the next opportunity stage$/, function(callback) {
    this.client
      .isExisting("#btnPrevStage")
      .then(function(isExisting) {
        isExisting.should.equal(true);
      })
      .call(callback);
  });

  this.Then(/^I should be on the first opportunity stage$/, function(callback) {
    this.client
      .isExisting("#btnPrevStage")
      .then(function(isExisting) {
        isExisting.should.equal(false);
      })
      .call(callback);
  });

  this.When(/^I lose an opportunity$/, function(callback) {
    this.client
      .waitForVisible("#btnLostOpportunity", 2000)
      .click("#btnLostOpportunity")
      .waitForVisible(".modal-content", 2000)
      .click(".modal-footer .btn-primary")
      .call(callback);
  });

  this.Then(/^I should see that the opportunity has been lost$/, function(callback) {
    this.client
      .waitForVisible('h3*=lost', 2000)
      .getText('h3*=lost')
      .call(callback);
  });

  this.When(/^I win an opportunity$/, function(callback) {
    this.client
      .waitForVisible("#btnWonOpp", 2000)
      .click("#btnWonOpp")
      .waitForVisible(".modal-content", 2000)
      .click(".modal-footer .btn-primary")
      .call(callback);
  });

  this.Then(/^I should see that the opportunity has been won$/, function(callback) {
    this.client
      .waitForVisible('h3*=won', 2000)
      .getText('h3*=won')
      .call(callback);
  });

  this.When(/^I enter line item details for an opportunity$/, function(callback) {
    this.client
      .waitForVisible("#insertOpportunityItemForm")
      .setValue('input[name=name]', 'testItem')
      .setValue('input[name=description]', 'test item description')
      .setValue('input[name=value]', 1)
      .submitForm("#insertOpportunityItemForm")
      .call(callback);
  });

  this.Then(/^I should see a new line item in an opportunity$/, function(callback) {
    this.client
      .waitForVisible(".btnEditOppItem")
      .getText('h4*=testItem')
      .call(callback);
  });

  this.When(/^I create a new line item for an opportunity$/, function(callback) {
    this.client
      .waitForVisible("#btnAddLine", 2000)
      .click("#btnAddLine")
      .waitForVisible("#insertOpportunityItemForm")
      .setValue('input[name=name]', 'testItem')
      .setValue('input[name=description]', 'test item description')
      .setValue('input[name=value]', 1)
      .submitForm("#insertOpportunityItemForm")
      .call(callback);
  });

  this.When(/^I enter updated line item details for an opportunity$/, function(callback) {
    this.client
      .waitForVisible('.modal-backdrop', 2000, true)
      .waitForVisible(".btnEditOppItem", 2000)
      .click(".btnEditOppItem")
      .waitForVisible("#editOpportunityItemForm")
      .setValue('#name-field', 'testItem2')
      .submitForm("#editOpportunityItemForm")
      .call(callback);
  });

  this.Then(/^I should see an updated line item in an opportunity$/, function(callback) {
    this.client
      .waitForVisible(".btnEditOppItem")
      .getText('h4*=testItem2')
      .call(callback);
  });

  this.When(/^I delete a line item from an opportunity$/, function(callback) {
    this.client
      .waitForVisible('.modal-backdrop', 2000, true)
      .waitForVisible(".btnDeleteOppItem", 2000)
      .click(".btnDeleteOppItem")
      .waitForVisible(".modal-content", 2000)
      .click(".modal-footer .btn-primary")
      .call(callback);
  });

  this.Then(/^I should not see a line item in an opportunity$/, function(callback) {
    this.client
    //  .getText('h4*=testItem')
      .call(callback);
  });
};
