module.exports = function() {

  var url = require('url');

  this.Given(/^a product has been created$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('createTestProduct', function(err, data) {
          done(data);
        });
      })
      .then(function(data) {
        expect(data.value).to.exist;
      })
      .call(callback);
  });

  this.When(/^I enter product details$/, function(callback) {
    this.client
      .waitForVisible('#insertProductForm', 2000)
      .setValue('#name-field', 'test product 2')
      .executeAsync(function(done) {
        //Set value for medium text editor because it isn't a standard input
        $("#desc-field").html("<p>test description</p>");
        done();
      })
      .submitForm('#insertProductForm')
      .call(callback);
  });

  this.Then(/^a new product should exist$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('getProductByName', 'test product 2', function(err, data) {
          done(data);
        });
      })
      .then(function(data) {
        expect(data.value).to.exist;
      })
      .call(callback);
  });

  this.When(/^I navigate to a product page$/, function(callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/products'))
      .waitForVisible('.product-item', 2000)
      .click('.product-item')
      .call(callback);
  });

  this.When(/^I enter updated product details$/, function(callback) {
    this.client
      .waitForVisible('#updateProductForm', 2000)
      .setValue('#name-field', 'test product 2')
      .submitForm('#updateProductForm')
      .call(callback);
  });

  this.Then(/^I should see the updated product$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('getProductByName', 'test product 2', function(err, data) {
          done(data);
        });
      })
      .then(function(data) {
        expect(data.value).to.exist;
      })
      .executeAsync(function(done) {
        Meteor.call('getProductByName', 'test product', function(err, data) {
          done(data);
        });
      })
      .then(function(data) {
        expect(data.value).to.not.exist;
      })
      .call(callback);
  });

  this.Then(/^the product should not exist$/, function(callback) {
    this.client
      .executeAsync(function(done) {
        Meteor.call('getProductByName', 'test product', function(err, data) {
          done(data);
        });
      })
      .then(function(data) {
        expect(data.value).to.not.exist;
      })
      .call(callback);
  });

  this.When(/^I delete a product$/, function(callback) {
    this.client
      .waitForVisible("#delete-product", 2000)
      .click("#delete-product")
      .waitForVisible(".modal-content", 2000)
      .click(".modal-footer .btn-primary")
      .call(callback);
  })

};
