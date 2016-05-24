Template.taskDetail.onCreated(function() {
  var taskId = FlowRouter.getParam('id');
  this.subscribe('activityByTaskId', taskId);
  var task = Tasks.findOne({
    _id: taskId
  });
  if (task) {
    if (task.parentTaskId) this.subscribe('taskById', task.parentTaskId);

    switch (task.entityType) {
      case 'company':
        this.subscribe('companyById', task.entityId);
      case 'contact':
        this.subscribe('contactById', task.entityId);
      case 'project':
        this.subscribe('projectById', task.entityId);
      case 'opportunity':
        this.subscribe('opportunityById', task.entityId);
    }
  }
});

Template.taskDetail.onRendered(function() {
  this.autorun(() => {
    var taskId = FlowRouter.getParam('id');
    var task = Tasks.findOne({
      _id: taskId
    });
    if (task) {
      if (task.parentTaskId) this.subscribe('taskById', task.parentTaskId);
    }
  });
});

Template.taskDetail.helpers({
  subTasks: function() {
    var subs = ReactiveMethod.call("tasks.getSubTasks", this._id);
    if (subs && subs.length > 0) return subs;
  },
  parentTask: function() {
    if (this.parentTaskId) {
      var task = Tasks.findOne({
        _id: this.parentTaskId
      });
      if (task) return task.title;
    }
  },
  taskData: function() {
    var taskId = FlowRouter.getParam('id');
    var task = Tasks.findOne(taskId);
    if (task && task.tags) {
      task.tags.sort();
    }
    return task;
  },
  relativeDueDate: function() {
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
  formattedDueDate: function() {
    var displayDate = this.isAllDay ? moment(this.dueDate).format('Do MMM YYYY') : moment(this.dueDate).format('Do MMM YYYY, HH:mm');
    return displayDate;
  },
  entityDetails: function() {
    var entityData = "";
    var entityId = this.entityId;

    if (!this || !entityId) return;

    switch (this.entityType) {
      case 'company':
        var handle = Template.instance().subscribe("companyById", entityId);
        if (handle && handle.ready()) {
          var c = Companies.findOne(entityId);
          entityData = {
            type: 'Company',
            icon: 'building',
            name: c.name,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadCompanies'])
          };
        }
        break;
      case 'contact':
        var handle = Template.instance().subscribe("contactById", entityId);
        if (handle && handle.ready()) {
          var c = Contacts.findOne(entityId);
          entityData = {
            type: 'Contact',
            icon: 'user',
            name: c.forename + " " + c.surname,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadContacts'])
          };
        }
        break;
      case 'project':
        var handle = Template.instance().subscribe("projectById", entityId);
        if (handle && handle.ready()) {
          var p = Projects.findOne(entityId);
          entityData = {
            type: 'Project',
            icon: 'sitemap',
            name: p.name,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadProjects'])
          };
        }
        break;
      case 'opportunity':
        var handle = Template.instance().subscribe("opportunityById", entityId);
        if (handle && handle.ready()) {
          var p = Opportunities.findOne(entityId);
          entityData = {
            type: 'Opportunity',
            icon: 'lightbulb-o',
            name: p.name,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadOpportunities'])
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
    var assignee = Meteor.users.findOne({
      _id: this.assigneeId
    });
    return assignee.profile.name;
  },
  taskCreator: function() {
    Meteor.subscribe('currentTenantUserData');
    var creator = Meteor.users.findOne({
      _id: this.createdBy
    });
    return creator.profile.name;
  }
});

Template.taskDetail.events({
  'click #create-sub-task': function(event, template) {
    event.preventDefault();
    Modal.show('insertNewTask', {
      _id: this._id,
      entity_type: this.entityType,
      entity_id: this.entityId
    });
  },
  'click #add-activity': function(event) {
    event.preventDefault();
    Modal.show('insertTaskActivityModal', {
      task: this
    });
  },
  'click #edit-task': function(event) {
    event.preventDefault();
    Modal.show('updateTask', this);
  },
  'click #remove-task': function(event) {
    event.preventDefault();
    var taskId = this._id;
    bootbox.confirm("Are you sure you wish to delete this task? Sub-tasks will not be deleted.", function(result) {
      if (result === true) {
        Tasks.remove(taskId);
        FlowRouter.go('tasks');
      }
    });
  },
  'click .task-completed': function(event) {
    event.preventDefault();
    if (Roles.userIsInRole(Meteor.userId(), ['CanEditTasks'])) {
      var taskId = FlowRouter.getRouteName() === 'tasks' ? this.__originalId : this._id;
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
    }
  }
});

Template.subTaskItem.onCreated(function() {
  this.subscribe('taskById', this.data._id);
this.state = new ReactiveVar(this.data.completed);
});

Template.subTaskItem.onRendered(function() {
  var self = this;
  var myId = this.data._id;

  this.autorun(function() {
    var subTask = Tasks.findOne({
      _id: myId
    });
    if (subTask) {
      Template.instance().state.set(subTask.completed);
    }
  });
});

Template.subTaskItem.helpers({
  subTaskCompleted: function() {
    return Template.instance().state.get();
  },
  subTaskName: function() {
    return this.title;
  }
});