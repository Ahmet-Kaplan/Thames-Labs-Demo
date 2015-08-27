Template.dataWarnings.onRendered(function() {

});

Template.dataWarnings.helpers({
  errors: function() {
    var items = this;
    var coll = [];

    _.each(items, function(i) {
      var o = {
        message: i
      }

      coll.push(o);
    });

    return coll;
  },
  count: function() {
    return this.length;
  }
});
