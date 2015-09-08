Template.task.events({
  'click .edit-task': function(event) {
    event.preventDefault();
    Modal.show('updateTask', this);
  },
  'click .task-title': function(event) {
    event.preventDefault();
    Modal.show('updateTask', this);
  },
  'click .delete-task': function(event) {
    event.preventDefault();

    bootbox.confirm("Are you sure you wish to delete this task?", function(result) {
      if (result === true) {
        Tasks.remove(taskId);
      }
    });
  },
  'click .task-completed': function(event, template) {
    if (Roles.userIsInRole(Meteor.userId(), ['Administrator','CanEditTasks'])) {
      var id = this._id
      var isComplete = $('#task-completed-' + id + ' > input').is(':checked');
      if (isComplete) {
        Tasks.update(id, { $set: {
          completed: isComplete,
          completedAt: new Date()
        }});
      } else {
        Tasks.update(id, { $set: {
          completed: isComplete
        }, $unset: {
          completedAt: null
        }});
      }
    }
  }
});

Template.task.helpers({
  formattedDueDate: function() {
    if (this.isAllDay) {
      var a = moment(new Date());
      a.hour(0);
      a.minute(0);

      var b = moment(this.dueDate);
      if (b.dayOfYear() == a.dayOfYear()) return 'today';
      if (b.dayOfYear() == a.dayOfYear() - 1) return 'yesterday';
      if (b.dayOfYear() == a.dayOfYear() + 1) return 'tomorrow';
      return b.from(a);
    } else {
      return moment(this.dueDate).fromNow();
    }
  },
  showEntityDetail: function() {
    if (FlowRouter.getRouteName() === "dashboard" ? true : false) return true;
    if (FlowRouter.getRouteName() === "tasks" ? true : false) return true;
  },
  entityDetails: function() {
    var dataString = "";

    switch (this.entityType) {
      case 'user':
        dataString = "Personal task"
        break;
      case 'company':
        dataString = "Company";
        var handle = Meteor.subscribe("companyById", this.entityId);
        if (handle && handle.ready()) {
          var c = Companies.find({}).fetch()[0];
          dataString += ": " + c.name;
        }
        break;
      case 'contact':
        dataString = "Contact";
        var handle = Meteor.subscribe("contactById", this.entityId);
        if (handle && handle.ready()) {
          var c = Contacts.find({}).fetch()[0];
          dataString += ": " + c.title + " " + c.forename + " " + c.surname;
        }
        break;
      case 'project':
        dataString = "Project";
        var handle = Meteor.subscribe("projectById", this.entityId);
        if (handle && handle.ready()) {
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
