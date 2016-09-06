import './task-panel.html';
import './task-panel.css';
import '../modals/insert-task-modal.js';
import '../task-item.js';
import { Tasks } from '/imports/api/collections.js';

function isDashboard() {
  return FlowRouter.getRouteName() === "dashboard";
}

Template.taskDisplay.onCreated(function() {
  this.entityType = this.data.entity_type;
  this.entityId = this.data.entity_id;

  this.showCompleted = ReactiveVar(false);
});

Template.taskDisplay.onRendered(function() {
  Template.instance().showCompleted.set(false);
});

Template.taskDisplay.helpers({
  taskEntityType: function() {
    return Template.instance().entityType;
  },
  showComp: function() {
    return Template.instance().showCompleted.get();
  },
  isDashboard: function() {
    return isDashboard();
  },
  tasks: function() {
    let cutOffDate = moment(new Date()).subtract(1, 'hours').toDate();
    const showCompleted = Template.instance().showCompleted.get();
    if (!showCompleted) cutOffDate = new Date();

    if (isDashboard()) {
      return Tasks.find({
        assigneeId: Meteor.userId(),
        $or: [{
          completed: false
        }, {
          completedAt: {
            $gt: cutOffDate
          }
        }]
      }, {
        sort: {
          completed: 1,
          completedAt: -1,
          dueDate: 1
        }
      });
    }
    return Tasks.find({
      entityId: this.entity_id,
      $or: [{
        completed: false
      }, {
        completedAt: {
          $gt: cutOffDate
        }
      }]
    }, {
      sort: {
        completed: 1,
        completedAt: -1,
        dueDate: 1
      }
    });
  },
  taskAssignee: function() {
    Meteor.subscribe('currentTenantUserData');
    return Meteor.users.findOne({
      _id: this.assigneeId
    }).profile.name;
  },
  formattedDueDate: function() {
    if (this.isAllDay) {
      const a = moment(new Date());
      a.hour(0);
      a.minute(0);

      const b = moment(this.dueDate);
      if (b.dayOfYear() == a.dayOfYear()) return 'today';
      if (b.dayOfYear() == a.dayOfYear() - 1) return 'yesterday';
      if (b.dayOfYear() == a.dayOfYear() + 1) return 'tomorrow';
      return b.from(a);
    }
    return moment(this.dueDate).fromNow();
  }
});

Template.taskDisplay.events({
  'click #btnAddTaskToEntity': function(event) {
    event.preventDefault();

    Modal.show('insertNewTask', {
      entity_id: this.entity_id,
      entity_type: this.entity_type,
      preventNavigateToTask: true
    });
  },
  'click #btnRecentlyCompleted': function(event) {
    event.preventDefault();
    const showCompleted = Template.instance().showCompleted.get();
    Template.instance().showCompleted.set(!showCompleted);
  }
});
