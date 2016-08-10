import './task-item.less';
import './task-item.html';

Template.taskItem.onCreated(function() {
  Meteor.subscribe('taskById', this.data.taskId);
  this.taskData = new ReactiveVar({});

  this.autorun(() => {
    this.taskData.set(Tasks.findOne(Template.currentData().taskId));
  });
});

Template.taskItem.helpers({
  task: function() {
    return Template.instance().taskData.get();
  },
  taskAssignee: function() {
    Meteor.subscribe('currentTenantUserData');
    return Meteor.users.findOne({
      _id: Template.instance().taskData.get().assigneeId
    }).profile.name;
  },
  formattedDueDate: function() {
    const taskData = Template.instance().taskData.get();
    if (!taskData.dueDate) {
      return;
    }
    if (taskData.isAllDay) {
      const a = moment(new Date());
      a.hour(0);
      a.minute(0);

      const b = moment(taskData.dueDate);
      if (b.dayOfYear() == a.dayOfYear()) return 'today';
      if (b.dayOfYear() == a.dayOfYear() - 1) return 'yesterday';
      if (b.dayOfYear() == a.dayOfYear() + 1) return 'tomorrow';
      return b.from(a);
    }
    console.log('hi');
    return moment(taskData.dueDate).fromNow();
  },
  formattedCompletionDate: function() {
    const taskData = Template.instance().taskData.get();
    const displayDate = taskData.isAllDay ? moment(taskData.completedAt).format('Do MMM YYYY') : moment(taskData.completedAt).format('Do MMM YYYY, HH:mm');
    return displayDate;
  },
  taskStatusCss: function() {
    const taskData = Template.instance().taskData.get();
    if (!taskData.dueDate) {
      return "";
    }
    const date = moment(taskData.dueDate);
    const daysFromNow = date.diff(new Date(), 'days');
    if (daysFromNow <= 1 && !this.isArchived) {
      return 'red';
    } else if (daysFromNow <= 7 && daysFromNow > 1 && !this.isArchived) {
      return 'orange';
    }
    return '';
  }
});

Template.taskItem.events({
  'click .task-checkbox': function() {
    const taskData = Template.instance().taskData.get();
    if (taskData.completed) {
      Tasks.update(taskData._id, {
        $set: {
          completed: false
        },
        $unset: {
          completedAt: null
        }
      });
    } else {
      Tasks.update(taskData._id, {
        $set: {
          completed: true,
          completedAt: new Date()
        }
      });
    }
  }
});