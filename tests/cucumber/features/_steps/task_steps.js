module.exports = function() {

  this.Given(/^an? "([^"]*)" task has been created$/, function(entity) {
    browser.executeAsync(function(entity, done) {
        Meteor.call('add' + entity + 'Task', function(err, data) {
          done();
        });
      }, entity);
  });

  this.Then(/^the task title should (say|contain|not contain) "([^"]*)"$/, function(option, desiredText) {
    browser.scroll("#displayedTaskHeading", 0, -60)
    var text = browser.getText("#displayedTaskHeading");
    if (option === 'say') {
      expect(text).toEqual(desiredText);
    } else if (option === 'contain') {
      expect(text).toContain(desiredText);
    } else if (option === 'not contain') {
      expect(text).not.toContain(desiredText);
    }
  });
};
