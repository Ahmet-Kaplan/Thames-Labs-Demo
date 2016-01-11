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
    if(!this.dueDate) {
      return;
    }
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
        Meteor.subscribe('currentTenantUserData');
        entityData = {
          icon: 'check',
          name: "Personal task",
          permissionToRead: Roles.userIsInRole(Meteor.userId(), [ 'CanReadTasks'])
        }
        break;
      case 'company':
        var handle = Meteor.subscribe("companyById", this.entityId);
        if (handle && handle.ready()) {
          var c = Companies.findOne({_id: this.entityId});
          entityData = {
            icon: 'building',
            name: c.name,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), [ 'CanReadCompanies'])
          };
        }
        break;
      case 'contact':
        var handle = Meteor.subscribe("contactById", this.entityId);
        if (handle && handle.ready()) {
          var c = Contacts.findOne({_id: this.entityId});
          entityData = {
            icon: 'user',
            name: c.forename + " " + c.surname,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), [ 'CanReadContacts'])
          };
        }
        break;
      case 'project':
        var handle = Meteor.subscribe("projectById", this.entityId);
        if (handle && handle.ready()) {
          var p = Projects.findOne({_id: this.entityId});
          entityData = {
            icon: 'sitemap',
            name: p.name,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), [ 'CanReadProjects'])
          };
        }
        break;
      case 'opportunity':
        var handle = Meteor.subscribe("opportunityById", this.entityId);
        if (handle && handle.ready()) {
          var p = Opportunities.findOne({_id: this.entityId});
          entityData = {
            icon: 'lightbulb-o',
            name: p.name,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), [ 'CanReadOpportunities'])
          };
        }
        break;
      default:
        entityData = {
          icon: "check",
          name: "Misc. task",
          permissionToRead: Roles.userIsInRole(Meteor.userId(), [ 'CanReadTasks'])
        };
    }

    return entityData;
  },
  taskAssignee: function() {
    Meteor.subscribe('currentTenantUserData');
    return Meteor.users.findOne({_id: this.assigneeId}).profile.name;
  }
});

Template.task.events({
  'click .task-completed': function(event) {
    event.preventDefault();
    var self = this;
    var listTarget = $(event.target).parents('.list-group-item');
    if (Roles.userIsInRole(Meteor.userId(), ['CanEditTasks'])) {
      var parent = $(event.target).parents('.task-completed');
      if(self.completed) {
        parent.children().remove();
        parent.html('<i class="fa fa-check fa-stack-1x"></i><i class="fa fa-circle-thin fa-stack-2x"></i>');
        parent.removeClass('task-green');
      } else {
        parent.children().remove();
        parent.html('<i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-check fa-stack-1x fa-inverse"></i>');
        parent.addClass('task-green');
      }
      listTarget.fadeOut(1000, 'easeInQuart', function() {
        var taskId = FlowRouter.getRouteName() === 'tasks' ? self.__originalId : self._id;
        if (self.completed) {
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
      })
    }
  }
});
