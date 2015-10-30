Session.set('showCompleted', 1);

Template.taskList.onCreated(function() {
  // Redirect if read permission changed
  this.autorun(function() {
    redirectWithoutPermission(Meteor.userId(), 'CanReadTasks');
  });
});

Template.taskList.helpers({
  showComp: function() {
    return (Session.get('showCompleted') === 1 ? true : false);
  },
  tasks: function() {
    if (Session.get('showCompleted') === 1) {
      return Tasks.find({}, {
        sort: {
          completed: 1,
          completedAt: -1,
          dueDate: 1
        }
      });
    } else {
      return Tasks.find({
        completed: false
      }, {
        sort: {
          completed: 1,
          completedAt: -1,
          dueDate: 1
        }
      });
    }
  }
});

Template.taskList.events({
  'click #tskToggleCompleted': function() {
    if (Session.get('showCompleted') === 1) {
      Session.set('showCompleted', 0);
    } else {
      Session.set('showCompleted', 1);
    }
  },
  'click #tskDeleteAllCompleted': function() {

    var ct = Tasks.find({
      completed: true
    }).fetch();

    _.each(ct, function(t) {
      Tasks.remove(t._id);
    })
  },
  'click .add-task': function(e) {
    var entityType = $(e.target).attr('id');
    Modal.show('insertNewTask', {
      entity_type: entityType
    })
  }
});
