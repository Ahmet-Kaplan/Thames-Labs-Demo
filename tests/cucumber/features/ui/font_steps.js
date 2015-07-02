module.exports = function () {

  var url = require('url');

  this.Then(/^I see a pretty font$/, function(callback) {
    this.client
      .getCssProperty('.navbar-brand','font-family')
      .then(function(font){
        font.value.should.equal('source sans pro');
      })
      .call(callback);
  });

}
