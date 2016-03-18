Template.taskDetail.onCreated(function() {
  var taskId = FlowRouter.getParam('id');
  this.subscribe('activityByTaskId', taskId);
})

Template.taskDetail.helpers({
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

    switch (this.entityType) {
      case 'company':
        var handle = Template.instance().subscribe("companyById", this.entityId);
        if (handle && handle.ready()) {
          var c = Companies.findOne(this.entityId);
          entityData = {
            type: 'Company',
            icon: 'building',
            name: c.name,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), [ 'CanReadCompanies'])
          };
        }
        break;
      case 'contact':
        var handle = Template.instance().subscribe("contactById", this.entityId);
        if (handle && handle.ready()) {
          var c = Contacts.findOne(this.entityId);
          entityData = {
            type: 'Contact',
            icon: 'user',
            name: c.forename + " " + c.surname,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadContacts'])
          };
        }
        break;
      case 'project':
        var handle = Template.instance().subscribe("projectById", this.entityId);
        if (handle && handle.ready()) {
          var p = Projects.findOne(this.entityId);
          entityData = {
            type: 'Project',
            icon: 'sitemap',
            name: p.name,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadProjects'])
          };
        }
        break;
      case 'opportunity':
        var handle = Template.instance().subscribe("opportunityById", this.entityId);
        if (handle && handle.ready()) {
          var p = Opportunities.findOne(this.entitythis.entityId);
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
    var assignee = Meteor.users.findOne({_id: this.assigneeId});
    return assignee.profile.name;
  },
  taskCreator: function() {
    Meteor.subscribe('currentTenantUserData');
    var creator = Meteor.users.findOne({_id: this.createdBy});
    return creator.profile.name;
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
    Modal.show('updateTask', this);
  },
  'click #remove-task': function(event) {
    event.preventDefault();
    var taskId = this._id;
    bootbox.confirm("Are you sure you wish to delete this task?", function(result) {
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
        Tasks.update(taskId, { $set: {
          completed: false
        }, $unset: {
          completedAt: null
        }});
      } else {
        Tasks.update(taskId, { $set: {
          completed: true,
          completedAt: new Date()
        }});
      }
    }
  }
})
