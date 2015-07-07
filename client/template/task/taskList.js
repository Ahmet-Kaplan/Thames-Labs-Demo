Session.set('showCompleted', 1);

Template.taskList.helpers({
  showComp: function() {    
    return (Session.get('showCompleted') === 1 ? true : false);
  },
  tasks: function() {
    if (Session.get('showCompleted') === 1) {
      return Tasks.find({});
    } else {
      return Tasks.find({
        completed: false
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
  }
});

Template.taskListEntry.helpers({
  isCompleted: function() {
    return this.completed;
  },
  entityDetails: function() {
    var dataString = "";

    switch (this.entityType) {
      case 'user':
        dataString = "Personal task"
        break;
      case 'company':
        dataString = "Company task"
        break;
      case 'contact':
        dataString = "Contact task"
        break;
      case 'project':
        dataString = "Project task"
        break;
      default:
        dataString = "Misc. task"
    }

    return dataString;
  }
});

Template.taskListEntry.events({
  'click #tskEditTaskListEntry': function() {
    Modal.show('updateTask', this);
  },
  'click #tskDeleteTaskListEntry': function() {
    Tasks.remove(this._id);
  }
});
