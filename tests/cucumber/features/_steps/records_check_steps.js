module.exports = function() {

  this.Given(/^I have reached the limit of records$/, function() {
    client.executeAsync(function(done) {
      Meteor.call('addRecordsToLimit', done);
    });
  });

  this.Given(/^I am a blocked user$/, function() {
    server.call('setBlockedTenant');
  });
};
