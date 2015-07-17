module.exports = function() {

  var url = require('url');  this.When(/^I navigate to "([^"]*)"$/, function(relativePath, callback) {    this.client      .url(url.resolve(process.env.ROOT_URL, relativePath))      .call(callback);  });};