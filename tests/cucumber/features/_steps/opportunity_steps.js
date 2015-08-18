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
};
