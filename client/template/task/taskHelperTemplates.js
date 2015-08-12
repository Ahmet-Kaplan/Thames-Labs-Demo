Template.insertNewTask.helpers({
  usersAsOptions: function() {
    return Meteor.users.find({}).map(function(user) {
      return {
        'label': user.profile.name,
        'value': user._id
      };
    });
  },
  getEntityType: function() {
    return this.entity_type;
  },
  getEntityId: function() {
    return this.entity_id;
  },
  isUserTask: function() {
    return (this.entity_type === "user" ? true : false);
  },
  getCurrentUserId: function() {
    return Meteor.userId();
  }
});

<<<<<<< HEAD
=======
Template.insertNewTask.onRendered(function() {
  Meteor.subscribe('currentTenantUserData', Partitioner.group());
});

Template.updateTask.onRendered(function() {
  Meteor.subscribe('currentTenantUserData', Partitioner.group());
});

>>>>>>> master
Template.updateTask.helpers({
  usersAsOptions: function() {
    return Meteor.users.find({}).map(function(user) {

      return {
        'label': user.profile.name,
        'value': user._id
      };
    });
  },
  isUserTask: function() {
    return (this.entityType === "user" ? true : false);
  },
  getCurrentUserId: function() {
    return Meteor.userId();
  }
});

var isDashboard = function() {
  return FlowRouter.getRouteName() === "dashboard";
};

Template.taskDisplay.helpers({
  isDashboard: function() {
    return isDashboard();
  },
  tasks: function() {
    if (isDashboard()) {
      return Tasks.find({
        assigneeId: Meteor.userId(),
        completed: false
      }, {
        sort: {
          dueDate: 1
        }
      });
    } else {
      return Tasks.find({
        entityId: this.entity_id,
        completed: false
      }, {
        sort: {
          dueDate: 1
        }
      });
    }
  }
});

Template.taskDisplay.events({
  'click #btnAddTaskToEntity': function(event) {
    event.preventDefault();
    Modal.show('insertNewTask', this);
  }
});

Template.taskDisplayItem.helpers({
  friendlyDate: function() {
    return moment(this.dueDate).format('MMMM Do YYYY, h:mma');
  },
  isDashboard: function() {
    return (FlowRouter.getRouteName() === "dashboard" ? true : false);
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
        if (handle && handle.ready()) {
          var c = Companies.find({}).fetch()[0];
          dataString += ": " + c.name;
        }
        break;
      case 'contact':
        dataString = "Contact task";
        var handle = Meteor.subscribe("contactById", this.entityId);
        if (handle && handle.ready()) {
          var c = Contacts.find({}).fetch()[0];
          dataString += ": " + c.title + " " + c.forename + " " + c.surname;
        }
        break;
      case 'project':
        dataString = "Project task";
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

Template.taskDisplayItem.events({
  'click #btnEditEntityTask': function(event) {
    event.preventDefault();
    Modal.show('updateTask', this);
  },
  'click #btnDeleteEntityTask': function(event) {
    event.preventDefault();
    var taskId = this._id;

    bootbox.confirm("Are you sure you wish to delete this task?", function(result) {
      if (result === true) {
        Tasks.remove(taskId);
      }
    });
  },
  'click .displayedTaskHeading': function() {
    $('.displayedTaskBody').scrollTop($('.displayedTaskBody').prop("scrollHeight"));
  }
});
