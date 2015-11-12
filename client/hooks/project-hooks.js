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
    }
  },
  newContactProjectForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project created.');
    }
  },
  updateProjectForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project details updated.');
    }
  }
});
