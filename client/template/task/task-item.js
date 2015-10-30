Template.task.onCreated(function() {
  this.subscribe('taskTags');
});

Template.task.helpers({
  taskId: function() {
    if(FlowRouter.getRouteName() === "tasks") {
      return this.__originalId
    } else {
      return this._id;
    }
  },
  formattedDueDate: function() {
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
  showEntityDetail: function() {
    return (FlowRouter.getRouteName() === "dashboard" || FlowRouter.getRouteName() === "tasks");
  },
  entityDetails: function() {
    var entityData = "";

    switch (this.entityType) {
      case 'user':
        entityData = {
          icon: 'user',
          name: "Personal task"
        }
        break;
      case 'company':
        var handle = Meteor.subscribe("companyById", this.entityId);
        if (handle && handle.ready()) {
          var c = Companies.find({}).fetch()[0];
          entityData = {
            icon: 'building',
            name: c.name
          };
        }
        break;
      case 'contact':
        var handle = Meteor.subscribe("contactById", this.entityId);
        if (handle && handle.ready()) {
          var c = Contacts.find({}).fetch()[0];
          entityData = {
            icon: 'user',
            name: c.forename + " " + c.surname
          };
        }
        break;
      case 'project':
        var handle = Meteor.subscribe("projectById", this.entityId);
        if (handle && handle.ready()) {
          var p = Projects.find({}).fetch()[0];
          entityData = {
            icon: 'sitemap',
            name: p.name
          };
        }
        break;
      case 'opportunity':
        var handle = Meteor.subscribe("opportunityById", this.entityId);
        if (handle && handle.ready()) {
          var p = Opportunities.find({}).fetch()[0];
          entityData = {
            icon: 'lightbulb-o',
            name: p.name
          };
        }
        break;
      default:
        entityData = {
          name: "Misc. task"
        };
    }

    return entityData;
  }
});

Template.task.events({
  'click .task-completed': function(event) {
    event.preventDefault();
    if (Roles.userIsInRole(Meteor.userId(), ['Administrator','CanEditTasks'])) {
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
});
