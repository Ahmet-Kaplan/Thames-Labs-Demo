module.exports = function() {

  this.Given(/^a job type has been created$/, function() {
    server.call('addDefaultJobType', 'Acme Corp');
  });

  this.Given(/^a limited job type has been created$/, function() {
    server.call('addLimitedJobType', 'Acme Corp');
  });

};
