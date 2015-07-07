module.exports = function () {

  var url = require('url');

  this.Then(/^I see the app name in the header$/, function(callback) {
    this.client
      .getText('.navbar-brand').then(function (text){
        text.should.contain('RealTime');
      })
      .call(callback);
  });

  this.Then(/^I see the dashboard on the sidebar$/, function(callback) {
    this.client
      .getText('#id-common > div > table > tr > td > a').then(function (text){
        text.should.contain('Dashboard');
      })
      .call(callback);
  });

  this.Given(/^I am on a mobile$/, function(callback){
    this.client
      .setViewportSize({
        width: 400,
        height: 800
      })
      .call(callback);
  });

  this.Given(/^I am on a desktop$/, function(callback){
    this.client
      .setViewportSize({
        width: 980,
        height: 800
      })
      .call(callback);
  });

  this.Then(/^I cannot see the menu$/, function(callback) {
    this.client
      .getCssProperty("#id-view-sidemenu", 'left')
      .then(function(leftValue) {
        leftValue.value.should.equal('-250px');
      })
      .call(callback);
  });

  this.Then(/^I can see the menu$/, function(callback) {
    this.client
      .getCssProperty("#id-view-sidemenu", 'left')
      .then(function(leftValue) {
        leftValue.value.should.equal('0px');
      })
      .call(callback);
  });
}
