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

Template.insertProjectActivityModal.helpers({
  currentDateTime: function() {
    return new Date();
  }
});

AutoForm.hooks({
  insertActivityForm: {
    onSuccess: function() {
      Modal.hide();
      $('[data-toggle="tooltip"]').tooltip();
    }
  },
  insertProjectActivityForm: {
    onSuccess: function() {
      Modal.hide();
      $('[data-toggle="tooltip"]').tooltip();
    }
  }
})
