Template.insertActivityModal.helpers({
  currentDateTime: function() {
  return moment();
  },
  contactsAsOptions: function() {
    return this.company.contacts().map(function(contact) {
      return {
        'label': contact.name(),
        'value': contact._id
      };
    });
  },
  currentUser: function(){
    return Meteor.userId();
  },
});

Template.insertProjectActivityModal.helpers({
  currentDateTime: function() {
  return moment();
  },
  currentUser: function(){
    return Meteor.userId();
  },
});

Template.insertPurchaseOrderActivityModal.helpers({
  currentDateTime: function() {
  return moment();
  },
  currentUser: function(){
    return Meteor.userId();
  },
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
  },
  insertPurchaseOrderActivityModal: {
    onSuccess: function() {
      Modal.hide();
      $('[data-toggle="tooltip"]').tooltip();
    }
  }
})
