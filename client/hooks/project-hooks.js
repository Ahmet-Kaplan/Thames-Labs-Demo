AutoForm.hooks({
  newProjectForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project created.');
      //logEvent('info', 'Project created.', 'Project', this.docId);
    },
    after: {
      insert: function(error, result) {
        if (error) {
          toastr.error('An error occurred: Project not created.');
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
      //logEvent('info', 'Contact project created.', 'Contact', this.docId);
    }
  },
  updateProjectForm: {
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project updated.');
      //logEvent('info', 'Project updated.', 'Project', this.docId);
    }
  }
});