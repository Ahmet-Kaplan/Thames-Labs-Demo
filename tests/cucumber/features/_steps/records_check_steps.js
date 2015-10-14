module.exports = function() {

  this.Given(/^I have reached the limit of records$/, function() {
    client.executeAsync(function(done) {
      for(var i = 0; i < 25; i++) {
        Meteor.call('addContact', 'Test ' + i, 'Surnamer');
        Meteor.call('addCompany', 'Test ' + i + ' Ltd');
        setTimeout(function() {
          done();
        }, 1000);
      }
    });
  });

  this.Given(/^I am a blocked user$/, function() {
    server.call('setBlockedTenant');
  });
};
