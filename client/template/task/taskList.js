Template.taskList.onRendered(function() {
  $('[data-toggle="tooltip"]').tooltip({
    delay: {"show": 1000, "hide": 100}
  });
Session.set('showCompleted', 1);

Template.taskList.helpers({
  showComp: function() {
    return (Session.get('showCompleted') === 1 ? true : false);
  },
  tasks: function() {
    if (Session.get('showCompleted') === 1) {
      return Tasks.find({}, {
        sort: {
          dueDate: 1
        }
      });
    } else {
      return Tasks.find({
        completed: false
      }, {
        sort: {
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
  }
});

Template.taskListEntry.helpers({
  friendlyDate: function() {
    return moment(this.dueDate).format('MMMM Do YYYY');
  },
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
        dataString = "Company task";
        var handle = Meteor.subscribe("companyById", this.entityId);
        if (handle.ready()) {
          var c = Companies.find({}).fetch()[0];
          dataString += ": " + c.name;
        }
        break;
      case 'contact':
        dataString = "Contact task";
        var handle = Meteor.subscribe("contactById", this.entityId);
        if (handle.ready()) {
          var c = Contacts.find({}).fetch()[0];
          dataString += ": " + c.title + " " + c.forename + " " + c.surname;
        }
        break;
      case 'project':
        dataString = "Project task";
        var handle = Meteor.subscribe("projectById", this.entityId);
        if (handle.ready()) {
          var p = Projects.find({}).fetch()[0];
          dataString += ": " + p.description;
        }
        break;
      default:
        dataString = "Misc. task";
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
})
});
