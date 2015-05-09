// Use materialize theme
AutoForm.setDefaultTemplate('materialize');

// Add post submit hook to all forms
AutoForm.addHooks(null, {
  onSuccess: function(formType, result) {
    $('.modal').closeModal();
  }
});
