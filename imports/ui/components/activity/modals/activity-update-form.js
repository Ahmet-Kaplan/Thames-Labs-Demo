import './activity-update-form.html';

Template.updateActivityModal.helpers({
  IsIEAnd10OrGreater: function() {
    if (bowser.msie && bowser.version > 9) {
      return true;
    }

    return false;
  }
});

AutoForm.hooks({
  updateActivityForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Activity updated.');
    },
    onError: function(formType, error) {
      toastr.error('Activity creation error: ' + error);
    }
  }
});
