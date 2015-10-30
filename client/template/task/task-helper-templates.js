var isDashboard = function() {
  return FlowRouter.getRouteName() === "dashboard";
};

Template.taskDisplay.onRendered(function() {
  Session.set('showCompleted', 0);
});

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
