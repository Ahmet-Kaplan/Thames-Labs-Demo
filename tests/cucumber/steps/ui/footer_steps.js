module.exports = function () {

  var url = require('url');

  this.Then(/^I see a footer$/, function(callback) {
    this.client
      .getText('.footer > .pull-left > a').then(function (text){
        text.should.equal('Cambridge Software Ltd');
      })
      .call(callback);
  });

}
