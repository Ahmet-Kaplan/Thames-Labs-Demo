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

Template.taskDisplay.onRendered(function() {
  Session.set('showCompleted', 0);
})

Template.taskDisplay.helpers({
  showComp: function() {
    return (Session.get('showCompleted') === 1 ? true : false);
  },
  isDashboard: function() {
    return isDashboard();
  },
  tasks: function() {
    var cutOffDate = moment(new Date()).subtract(1, 'hours').toDate();
    if (Session.get('showCompleted') === 0) cutOffDate = new Date();

    if (isDashboard()) {
      return Tasks.find({
        assigneeId: Meteor.userId(),
        $or: [{ completed: false }, { completedAt: { $gt: cutOffDate }}]
      }, {
        sort: {
          completed: 1,
          completedAt: -1,
          dueDate: 1
        }
      });
    } else {
      return Tasks.find({
        entityId: this.entity_id,
        $or: [{ completed: false }, { completedAt: { $gt: cutOffDate }}]
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

Template.taskDisplay.events({
  'click #btnAddTaskToEntity': function(event) {
    event.preventDefault();
    Modal.show('insertNewTask', this);
  },
  'click #btnRecentlyCompleted': function(event) {
    event.preventDefault();
    if (Session.get('showCompleted') === 1) {
      Session.set('showCompleted', 0);
    } else {
      Session.set('showCompleted', 1);
    }
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
      case 'opportunity':
        dataString = "Opportunity";
        var handle = Meteor.subscribe("opportunityById", this.entityId);
        if (handle && handle.ready()) {
          var p = Opportunities.find({}).fetch()[0];
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
