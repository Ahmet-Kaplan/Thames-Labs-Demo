Template.insertUserModal.helpers({
  // Necessary because we're already using the naked ID
  // as the modal's ID
  formId: function() {
    return 'form-' + this._id;
  }
});
