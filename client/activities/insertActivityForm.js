Template.insertActivityModal.helpers({
  currentDateTime: function() {
    return new Date();
  },
  contactsAsOptions: function() {
    return this.company.contacts().map(function(contact) {
      return {
        'label': contact.name(),
        'value': contact._id
      };
    });
  }
});

AutoForm.hooks({
  insertActivityForm: {
    onSuccess: function() {
      Modal.hide();
      $('[data-toggle="tooltip"]').tooltip();
    }
  }
})
