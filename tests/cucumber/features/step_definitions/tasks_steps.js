module.exports = function() {

  var url = require('url');

  var login = function(done) {
    Meteor.loginWithPassword("test@domain.com", "goodpassword", done)
  };

  this.Given(/^I am a logged in user$/, function(callback) {
    this.client
      .url(url.resolve(process.env.ROOT_URL, '/'))
      .executeAsync(login)
      .call(callback);
  });

  this.Then(/^I see the task container$/, function(callback) {
    this.client
      .waitForExist("#entityTaskList")
      .call(callback)
  });

  this.Then(/^I see an empty task list$/, function(callback) {
    this.client
      .waitForExist("#taskContainer")
      .getText('#taskContainer > li:first-child', function(err, text) {
        text.should.contain('No tasks added');
      })
      .call(callback)
  });

  this.When(/^I create a new task$/, function(callback) {
    this.client
      .click('#btnAddTaskToEntity')
      .waitForExist('#newTaskModal')
      .setValue('#taskTitle', 'Cucumber Task')
      .setValue('#taskDescription', 'A task created with Cucumber')
      .submitForm('#newTaskModal')
      .call(callback)
  });

  this.Then(/^I see the task in the task list$/, function(callback) {
    this.client
      .waitForExist('#displayedTask')
      .call(callback)
  });
}
