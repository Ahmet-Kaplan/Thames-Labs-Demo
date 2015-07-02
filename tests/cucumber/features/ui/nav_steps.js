module.exports = function () {

  var url = require('url');

  this.Then(/^I see the app name in the header$/, function(callback) {
    this.client
      .getText('.navbar-brand').then(function (text){
        text.should.equal('RealTimeCRM alpha');
      })
      .call(callback);
  });

  this.Then(/^I see the dashboard on the sidebar$/, function(callback) {
    this.client
      .getText('#id-dashboard > div > h4 > a').then(function (text){
        text.should.equal('Dashboard');
      })
      .call(callback);
  });

}
