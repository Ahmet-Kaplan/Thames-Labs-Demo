module.exports = function() {

  this.Given(/^an? "([^"]*)" task has been created$/, function(entity, callback) {
    this.client
      .executeAsync(function(entity, done) {
        Meteor.call('add' + entity + 'Task', function(err, data) {
          done(data);
        });
      }, entity)
      .then(function(data) {
        expect(data.value).to.exist;
      })
      .call(callback);
  });

  this.Then(/^the task title should (say|contain|not contain) "([^"]*)"$/, function(option, desiredText, callback) {
    this.client
      .scroll(".task-title", 0, -60)
      .getText(".task-title")
      .then(function(text) {
        if (option === 'say') {
          expect(text).to.equal(desiredText);
        } else if (option === 'contain') {
          expect(text).to.contain(desiredText);
        } else if (option === 'not contain') {
          expect(text).to.not.contain(desiredText);
        }
      })
      .call(callback);
  });
};
