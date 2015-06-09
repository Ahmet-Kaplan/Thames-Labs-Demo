AutoForm.hooks({
  insertTaskForm: {
    before: {
      insert: function(doc){
        doc.userId = Meteor.userId();
        return doc;
      }
    },
    onSuccess: function() {
      Modal.hide();
      toastr.success('Project created.');
    }
  }
});

Template.insertTaskModal.helpers({
  currentUser: function(){
    return Meteor.userId();
  },
  usersAsOptions: function() {
    return Meteor.users.find({}).map(function(user) {
      return {
        'label': user.profile.name,
        'value': user._id
      };
    });
  },
  currentDateTime:function(){
    return moment().format('dd/mm/yyyy');
  }
});
