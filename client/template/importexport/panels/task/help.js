Template.importTaskFailuresModal.helpers({
  errorMessages: function() {
    var arr = [];
    _.each(this, function(m) {
      var message = {
        description: m
      }
      arr.push(message);
    });
    return arr;
  }
});
