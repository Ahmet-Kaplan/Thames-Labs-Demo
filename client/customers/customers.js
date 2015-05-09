Template.customers.onRendered(function() {
  $('.modal-trigger').leanModal();
});

Template.customers.helpers({
  addHash: function(str) {
    return '#' + str;
  }
});
