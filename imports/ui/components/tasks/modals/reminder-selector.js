import './reminder-selector.html';

Template.reminderSelector.onRendered(function() {
  if (this.data.reminder) {
    const reminderValue = this.data.reminder.split('.')[0],
          reminderUnit = this.data.reminder.split('.')[1];
    $('#reminderValue').val(reminderValue);
    $('#reminderUnit').val(reminderUnit);
  }
});
