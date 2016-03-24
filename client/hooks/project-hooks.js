AutoForm.hooks({
  newProjectForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project created.');
    },
    after: {
      insert: function(error, result) {
        if (error) {
          toastr.error('Project creation error: ' + error);
          return false;
        }
        FlowRouter.go('/projects/' + result);
      }
    },
    onError: function(formType, error) {
      toastr.error('Project creation error: ' + error);
    }
  },
  newContactProjectForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project created.');
    },
    onError: function(formType, error) {
      toastr.error('Project creation error: ' + error);
    }
  },
  updateProjectForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project details updated.');
    },
    onError: function(formType, error) {
      toastr.error('Project update error: ' + error);
    }
  }
});
