import '/imports/ui/components/tags/tag-badges/tag-badges.js';
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
          entityData = {
            icon: 'building',
            name: c.name,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadCompanies'])
          };
        }
        break;

      case 'contact':
        handle = Template.instance().subscribe("contactById", taskData.entityId);
        if (handle && handle.ready()) {
          const c = Contacts.findOne({
            _id: taskData.entityId
          });
          entityData = {
            icon: 'user',
            name: c.forename + " " + c.surname,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadContacts'])
          };
        }
        break;

      case 'project':
        handle = Template.instance().subscribe("projectById", taskData.entityId);
        if (handle && handle.ready()) {
          const p = Projects.findOne({
            _id: taskData.entityId
          });
          entityData = {
            icon: 'sitemap',
            name: p.name,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadProjects'])
          };
        }
        break;

      case 'opportunity':
        handle = Template.instance().subscribe("opportunityById", taskData.entityId);
        if (handle && handle.ready()) {
          const p = Opportunities.findOne({
            _id: taskData.entityId
          });
          entityData = {
            icon: 'lightbulb-o',
            name: p.name,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadOpportunities'])
          };
        }
        break;

      default:
        entityData = {
          icon: "check",
          name: "Misc. task",
          permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadTasks'])
        };
    }

    return entityData;
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