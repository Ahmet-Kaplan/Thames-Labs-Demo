Template.customers.helpers({
  addHash: function(str) {
    return '#' + str;
  }
});

AutoForm.hooks({
  insertUserForm: {
    onSuccess: function() {
      Modal.hide();
    }
  }
});
