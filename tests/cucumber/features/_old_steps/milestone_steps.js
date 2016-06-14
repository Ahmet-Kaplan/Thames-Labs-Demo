module.exports = function() {

  this.Given(/^a project type has been created$/, function() {
    server.call('addDefaultProjectType', 'Acme Corp');
  });

  this.Given(/^a limited project type has been created$/, function() {
    server.call('addLimitedProjectType', 'Acme Corp');
  });

};
