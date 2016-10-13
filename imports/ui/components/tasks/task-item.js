import { Companies, Contacts, Jobs, Tasks } from '/imports/api/collections.js';

import './task-tick/task-tick.js';
import '/imports/ui/components/tags/tag-badges/tag-badges.js';

import './task-item.less';
import './task-item.html';

Template.taskItem.onCreated(function() {
  this.taskData = new ReactiveVar({});
});

Template.taskItem.onRendered(function() {
  if (Template.currentData().__originalId) {
    this.autorun(() => {
      const data = Template.currentData();
      data._id = data.__originalId;
      this.taskData.set(data);
    });
  } else {
    Meteor.subscribe('taskById', this.data.taskId);
    const taskId = Template.currentData().taskId;
    this.autorun(() => {
      const data = Tasks.findOne(taskId);
      this.taskData.set(data);
    });
  }
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
  showAssignee: function() {
    return !(FlowRouter.getRouteName() === "dashboard");
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
  },
  showEntity: function() {
    return (FlowRouter.getRouteName() === "dashboard" || FlowRouter.getRouteName() === "tasks");
  },
  entityDetails: function() {
    const taskData = Template.instance().taskData.get();
    let entityData = "",
        handle = null;

    if (taskData) {
      switch (taskData.entityType) {
        case 'user':
          Template.instance().subscribe('currentTenantUserData');
          entityData = {
            icon: 'check',
            name: "Personal task",
            permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadTasks'])
          };
          break;

        case 'company':
          handle = Template.instance().subscribe("companyById", taskData.entityId);
          if (handle && handle.ready()) {
            const c = Companies.findOne({
              _id: taskData.entityId
            });
            if (c) {
              entityData = {
                icon: 'building',
                name: c.name,
                permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadCompanies'])
              };
            }
          }
          break;

        case 'contact':
          handle = Template.instance().subscribe("contactById", taskData.entityId);
          if (handle && handle.ready()) {
            const c = Contacts.findOne({
              _id: taskData.entityId
            });
            if (c) {
              entityData = {
                icon: 'user',
                name: c.forename + " " + c.surname,
                permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadContacts'])
              };
            }
          }
          break;

        case 'job':
          handle = Template.instance().subscribe("jobById", taskData.entityId);
          if (handle && handle.ready()) {
            const p = Jobs.findOne({
              _id: taskData.entityId
            });
            if (p) {
              entityData = {
                icon: 'sitemap',
                name: p.name,
                permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadJobs'])
              };
            }
          }
          break;

        default:
          entityData = {
            icon: "check",
            name: "Misc. task",
            permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadTasks'])
          };
      }
    }

    return entityData;
  },
  isListView: function() {
    return (FlowRouter.getRouteName() === "tasks");
  }
});
