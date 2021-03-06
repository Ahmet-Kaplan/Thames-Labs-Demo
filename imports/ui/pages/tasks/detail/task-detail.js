import './task-detail.html';
import '/imports/ui/components/tasks/subtasks/subtask-list.js';
import '/imports/ui/components/tasks/task-tick/task-tick.js';
import '/imports/ui/components/tags/tag-input/tag-input.js';
import '/imports/ui/components/tasks/modals/update-task-modal.js';
import '/imports/ui/components/documents/document-container.js';

import { Activities, Companies, Contacts, Jobs, Tasks } from '/imports/api/collections.js';

import bootbox from 'bootbox';

Template.taskDetail.onCreated(function() {
  const taskId = FlowRouter.getParam('id');
  this.subscribe('activityByTaskId', taskId);
  const task = Tasks.findOne({
    _id: taskId
  });
  if (task) {
    if (task.parentTaskId) this.subscribe('taskById', task.parentTaskId);

    switch (task.entityType) {
      case 'company':
        this.subscribe('companyById', task.entityId);
        break;
      case 'contact':
        this.subscribe('contactById', task.entityId);
        break;
      case 'job':
        this.subscribe('jobById', task.entityId);
        break;
    }
  }
});

Template.taskDetail.onRendered(function() {
  this.autorun(() => {
    const taskId = FlowRouter.getParam('id'),
          task = Tasks.findOne({
            _id: taskId
          });
    if (task) {
      if (task.parentTaskId) this.subscribe('taskById', task.parentTaskId);
    }
  });
});

Template.taskDetail.helpers({
  breadcrumbName: function() {
    return (this.sequencedIdentifier ? "Task #" + this.sequencedIdentifier : "Task");
  },
  reminderDetails: function() {
    if(this.remindMe) {
      const reminderArray = this.reminder.split('.');
      let reminderString = this.reminder.replace('.', ' ');
      if(reminderArray[0] === "1") {
        reminderString = reminderString.substring(0, reminderString.length - 1);
      }
      return reminderString + " before";
    }
    return "No reminder set";
  },
  parentTask: function() {
    if (this.parentTaskId) {
      const task = Tasks.findOne({
        _id: this.parentTaskId
      });
      if (task) return task.title;
    }
  },
  taskData: function() {
    const taskId = FlowRouter.getParam('id'),
          task = Tasks.findOne(taskId);
    if (task && task.tags) {
      task.tags.sort();
    }
    return task;
  },
  relativeCompletionDate: function() {
    if (this.isAllDay) {
      const a = moment(new Date()),
            b = moment(this.completedAt);
      a.hour(0);
      a.minute(0);

      if (b.dayOfYear() == a.dayOfYear()) return 'today';
      if (b.dayOfYear() == a.dayOfYear() - 1) return 'yesterday';
      if (b.dayOfYear() == a.dayOfYear() + 1) return 'tomorrow';
      return b.from(a);
    }
    return moment(this.completedAt).fromNow();
  },
  formattedCompletionDate: function() {
    const displayDate = this.isAllDay ? moment(this.completedAt).format('Do MMM YYYY') : moment(this.completedAt).format('Do MMM YYYY, HH:mm');
    return displayDate;
  },
  relativeDueDate: function() {
    if (this.isAllDay) {
      const a = moment(new Date()),
            b = moment(this.dueDate);
      a.hour(0);
      a.minute(0);

      if (b.dayOfYear() == a.dayOfYear()) return 'today';
      if (b.dayOfYear() == a.dayOfYear() - 1) return 'yesterday';
      if (b.dayOfYear() == a.dayOfYear() + 1) return 'tomorrow';
      return b.from(a);
    }
    return moment(this.dueDate).fromNow();
  },
  formattedDueDate: function() {
    const displayDate = this.isAllDay ? moment(this.dueDate).format('Do MMM YYYY') : moment(this.dueDate).format('Do MMM YYYY, HH:mm');
    return displayDate;
  },
  entityDetails: function() {
    let entityData = "",
        handle = null;
    const entityId = this.entityId;

    if (!this || !entityId) return;

    switch (this.entityType) {
      case 'company':
        handle = Template.instance().subscribe("companyById", entityId);
        if (handle && handle.ready()) {
          const c = Companies.findOne(entityId);
          entityData = {
            type: 'Company',
            icon: 'building',
            name: c.name,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadCompanies'])
          };
        }
        break;

      case 'contact':
        handle = Template.instance().subscribe("contactById", entityId);
        if (handle && handle.ready()) {
          const c = Contacts.findOne(entityId);
          entityData = {
            type: 'Contact',
            icon: 'user',
            name: c.forename + " " + c.surname,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadContacts'])
          };
        }
        break;

      case 'job':
        handle = Template.instance().subscribe("jobById", entityId);
        if (handle && handle.ready()) {
          const p = Jobs.findOne(entityId);
          entityData = {
            type: 'Job',
            icon: 'sitemap',
            name: p.name,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadJobs'])
          };
        }
        break;

      default:
        entityData = {
          type: 'Misc. task',
          icon: '',
          name: "No associated entity",
          permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadTasks'])
        };
    }

    return entityData;
  },
  isPersonalTask: function() {
    return this.entityType === "user";
  },
  taskAssignee: function() {
    Meteor.subscribe('currentTenantUserData');
    const assignee = Meteor.users.findOne({
      _id: this.assigneeId
    });
    return assignee.profile.name;
  },
  taskCreator: function() {
    Meteor.subscribe('currentTenantUserData');
    const creator = Meteor.users.findOne({
      _id: this.createdBy
    });
    return creator.profile.name + (this.createdAt ? ", " + moment(this.createdAt).fromNow() : "");
  }
});

Template.taskDetail.events({
  'click #add-activity': function(event) {
    event.preventDefault();
    Modal.show('insertTaskActivityModal', {
      task: this
    });
  },
  'click #edit-task': function(event) {
    event.preventDefault();
    Modal.show('updateTaskModal', this);
  },
  'click #remove-task': function(event) {
    event.preventDefault();
    const taskId = this._id;
    bootbox.confirm("Are you sure you wish to delete this task? Subtasks will not be deleted.", function(result) {
      if (result === true) {
        Tasks.remove(taskId);
        FlowRouter.go('tasks');
      }
    });
  },
  'click .task-completed, click #obvious-task-completion-button': function(event) {
    event.preventDefault();
    if (Roles.userIsInRole(Meteor.userId(), ['CanEditTasks'])) {
      const taskId = FlowRouter.getRouteName() === 'tasks' ? this.__originalId : this._id;
      if (this.completed) {
        Tasks.update(taskId, {
          $set: {
            completed: false
          },
          $unset: {
            completedAt: null
          }
        });
      } else {
        Tasks.update(taskId, {
          $set: {
            completed: true,
            completedAt: new Date()
          }
        });
      }

      // insert activity
      Activities.insert({
        type: 'Note',
        notes: Meteor.user().profile.name + ' marked this task as ' + (this.completed ? "complete" : "incomplete"),
        createdAt: new Date(),
        activityTimestamp: new Date(),
        taskId: this._id,
        primaryEntityId: taskId,
        primaryEntityType: 'tasks',
        primaryEntityDisplayData: this.title,
        createdBy: Meteor.userId()
      });
    }
  },
  'click #fab': function(event) {
    event.preventDefault();
    Modal.show('updateTaskModal', this);
  }
});
