Template.task.onCreated(function() {
  this.subscribe('taskTags');
});

Template.task.onRendered(function() {
  if (this.data.parentTaskId) this.subscribe('taskById', this.data.parentTaskId);
});

Template.task.helpers({
  formattedCompletionDate: function() {
    const displayDate = this.isAllDay ? moment(this.completedAt).format('Do MMM YYYY') : moment(this.completedAt).format('Do MMM YYYY, HH:mm');
    return displayDate;
  },
  taskParentName: function() {
    const parent = Tasks.findOne({_id: this.parentTaskId});
    if(parent) return parent.title;
  },
  taskId: function() {
    if (FlowRouter.getRouteName() === "tasks") {
      return this.__originalId;
    }
    return this._id;
  },
  formattedDueDate: function() {
    if (!this.dueDate) {
      return;
    }
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
  },
  showEntityDetail: function() {
    return (FlowRouter.getRouteName() === "dashboard" || FlowRouter.getRouteName() === "tasks");
  },
  entityDetails: function() {
    let entityData = "",
        handle = null;

    switch (this.entityType) {
      case 'user':
        Meteor.subscribe('currentTenantUserData');
        entityData = {
          icon: 'check',
          name: "Personal task",
          permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadTasks'])
        };
        break;

      case 'company':
        handle = Meteor.subscribe("companyById", this.entityId);
        if (handle && handle.ready()) {
          const c = Companies.findOne({
            _id: this.entityId
          });
          entityData = {
            icon: 'building',
            name: c.name,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadCompanies'])
          };
        }
        break;

      case 'contact':
        handle = Meteor.subscribe("contactById", this.entityId);
        if (handle && handle.ready()) {
          const c = Contacts.findOne({
            _id: this.entityId
          });
          entityData = {
            icon: 'user',
            name: c.forename + " " + c.surname,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadContacts'])
          };
        }
        break;

      case 'project':
        handle = Meteor.subscribe("projectById", this.entityId);
        if (handle && handle.ready()) {
          const p = Projects.findOne({
            _id: this.entityId
          });
          entityData = {
            icon: 'sitemap',
            name: p.name,
            permissionToRead: Roles.userIsInRole(Meteor.userId(), ['CanReadProjects'])
          };
        }
        break;

      case 'opportunity':
        handle = Meteor.subscribe("opportunityById", this.entityId);
        if (handle && handle.ready()) {
          const p = Opportunities.findOne({
            _id: this.entityId
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
  },
  taskAssignee: function() {
    Meteor.subscribe('currentTenantUserData');
    return Meteor.users.findOne({
      _id: this.assigneeId
    }).profile.name;
  }
});

Template.task.events({
  'click .task-completed': function(event) {
    event.preventDefault();
    const self = this,
          listTarget = $(event.target).parents('.list-group-item'),
          parent = $(event.target).parents('.task-completed'),
          sub = () => {
            //Checks if viewing as a subtask
            if (Template.parentData()._id !== this._id) return true;
            return false;
          },
          updateTask = () => {
            const taskId = FlowRouter.getRouteName() === 'tasks' ? self.__originalId : self._id;
            if (self.completed) {
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
          };

    if (Roles.userIsInRole(Meteor.userId(), ['CanEditTasks'])) {
      if (self.completed) {
        parent.children().remove();
        parent.html('<i class="fa fa-check fa-stack-1x"></i><i class="fa fa-circle-thin fa-stack-2x"></i>');
        parent.removeClass('task-green');
      } else {
        parent.children().remove();
        parent.html('<i class="fa fa-circle fa-stack-2x"></i><i class="fa fa-check fa-stack-1x fa-inverse"></i>');
        parent.addClass('task-green');
      }
      if (sub) {
        updateTask();
      }else {
        listTarget.fadeOut(1000, 'easeInQuart', function() {
          updateTask();
        });
      }
    }
  }
});

