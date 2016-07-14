module.exports = function() {

  this.Given(/^I have subscribed to the paying plan$/, function() {
    browser
      .executeAsync(function(done) {
        Stripe.card.createToken({
          number: '4242424242424242',
          exp_month: '01',
          exp_year: 2022,
          cvc: '123',
          name: 'Test Smith'
        }, function(status, response) {
          if (response.error) {
            return;
          }
          var userEmail = 'test@domain.com';
          Meteor.call('stripe.createCustomer', response.id, userEmail, 'premierGBP', function(error, result) {
            if (error || !result) {
              return false;
            }
            done(result);
          });
        });
      });
  });

  this.Given(/^I have unsubscribed from the paying plan$/, function() {
    browser
      .executeAsync(function(done) {
        Meteor.call('stripe.cancelSubscription', function(error, result) {
          if (error) {
            return false;
          }
          done(result);
        });
      });
  });

  this.Then(/^I should see a bootbox$/, function() {
    browser
      .execute(function() {
        Modal.hide();
      });
    browser.waitForExist('.bootbox-body', 20000);
    browser.waitForVisible('.bootbox-body', 5000);
    expect(browser.isExisting('.modal-dialog')).toEqual(true);
  });

  this.Then(/^the Stripe field "([^"]*)" should say "([^"]*)"$/, function(field, desiredText) {
    browser.waitForExist(field, 5000);
    browser.waitUntil( function() {
      return this.getText(field) === desiredText;
    });
  });

  this.Then(/^delete stripe customer$/, function() {
    browser
      .executeAsync(function(done) {
        Meteor.call('deleteStripeTestCustomer', function(err, res) {
          done(res);
        });
      });
  });
};
