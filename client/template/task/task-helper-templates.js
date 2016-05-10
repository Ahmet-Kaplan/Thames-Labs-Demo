function isDashboard() {
  return FlowRouter.getRouteName() === "dashboard";
}

Template.taskDisplay.onCreated(function() {
  this.entityType = this.data.entity_type;
  this.entityId = this.data.entity_id;

  Session.set('entityDescriptor', "");
});

Template.taskDisplay.onRendered(function() {
  Session.set('showCompleted', 0);
  Session.set('entityDescriptor', $('.entity-name').text());
});

Template.taskDisplay.helpers({
  taskEntityType: function() {
    return Template.instance().entityType;
  },
  showComp: function() {
    return Session.get('showCompleted') === 1;
  },
  isDashboard: function() {
    return isDashboard();
  },
  tasks: function() {
    var cutOffDate = moment(new Date()).subtract(1, 'hours').toDate();
    if (Session.get('showCompleted') === 0) cutOffDate = new Date();

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
      var a = moment(new Date());
      a.hour(0);
      a.minute(0);

      var b = moment(this.dueDate);
      if (b.dayOfYear() == a.dayOfYear()) return 'today';
      if (b.dayOfYear() == a.dayOfYear() - 1) return 'yesterday';
      if (b.dayOfYear() == a.dayOfYear() + 1) return 'tomorrow';
      return b.from(a);
    }
    return moment(this.dueDate).fromNow();
  },
});

Template.taskDisplay.events({
  'click #btnAddTaskToEntity': function(event) {
    event.preventDefault();
    Modal.show('insertNewTask', this);
  },
  'click #btnRecentlyCompleted': function(event) {
    event.preventDefault();
    if (Session.get('showCompleted') === 1) {
      Session.set('showCompleted', 0);
    } else {
      Session.set('showCompleted', 1);
    }
  },
  'click .task-completed': function(event) {
    event.preventDefault();
    var self = this;
    if (Roles.userIsInRole(Meteor.userId(), ['CanEditTasks'])) {
      var taskId = self._id;
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
    }
    //Hack to artificially refresh display if completed are not showed
    if (Session.get('showCompleted') === 0) {
      $(event.target).parents('.list-group-item').fadeOut(500, () => {
        Session.set('showCompleted', 1);
        Session.set('showCompleted', 0);
      })
    }
  },

  'click #task-template': function(event, template) {
    var headers = [
      'title',
      'description',
      'assignee',
      'dueDate',
      'record',
      'recordType'
    ].join(',');

    var sampleValues = [
      'Sample ' + template.entityType + ' task',
      'A simple example of how a ' + template.entityType + ' task should be imported',
      Meteor.user().profile.name,
      moment().format('YYYY-MM-DDTHH:mm:ss'),
      Session.get('entityDescriptor'),
      template.entityType
    ].join(',');

    var fileData = headers + '\n' + sampleValues;
    var blob = new Blob([fileData], {
      type: "text/csv;charset=utf-8"
    });
    saveAs(blob, 'task-template.csv');
  },
  'click #task-template-help': function(event) {
    event.preventDefault();
    Modal.show('importTaskHelpModal');
  },
  'click #task-data-upload-link': function() {
    document.getElementById('task-data-upload').click();
  },
  'change #task-data-upload': function() {
    var file = event.target.files[0];
    if (!file) return;

    var reader = new FileReader();

    reader.onerror = function(error) {
      toastr.error('File processing error: ' + error);
    };
    reader.onload = function() {
      var data = reader.result;
      var options = {
        delimiter: "",
        newline: "",
        header: true,
        skipEmptyLines: true
      };
      var unprocessed = Papa.parse(data, options);
      var tasksToImport = unprocessed.data;

      //Do some interesting things here
      Meteor.call('tasks.import', tasksToImport, function(err, res) {
        if (err) throw new Meteor.Error(err);
        if (res.exitCode === 0) {
          toastr.success('Tasks successfully imported.');
        } else {
          toastr.error(res.message);
          Modal.show('importTaskFailuresModal', res.errorData);
        }
      })
    };

    reader.readAsText(file);
    $('#task-data-upload').val('');
  }
});