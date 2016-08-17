import './update-task-modal.html';
import './reminder-selector.js';

Template.updateTaskModal.onRendered(function() {
  Session.set('showRemindMe', this.data.remindMe);
  Session.set('hasDueDate', typeof this.data.dueDate !== "undefined");
});

Template.updateTaskModal.helpers({
  exclusions: function() {
    const excludes = [];

    excludes.push(this._id);

    const subs = ReactiveMethod.call("tasks.getSubTasks", this._id);
    if (subs && subs.length > 0) {
      _.each(subs, (s) => {
        excludes.push(s._id);
      });
    }
    return excludes.join(',');
  },
  hasDueDate: function() {
    return Session.get('hasDueDate');
  },
  showRemindMe: function() {
    return Session.get('showRemindMe');
  }
});

Template.updateTaskModal.events({
  'change input[name=dueDate]': function(e) {
    e.preventDefault();
    if ($('input[name=dueDate]').val()) {
      Session.set('hasDueDate', true);
    } else {
      Session.set('hasDueDate', false);
    }
  },
  'change input[name=remindMe]': function(e) {
    e.preventDefault();
    const remindMe = $('input[name=remindMe]').prop('checked');
    Session.set('showRemindMe', remindMe);
  }
});
