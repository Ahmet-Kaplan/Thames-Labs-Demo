import './task-tick.less';
import './task-tick.html';

Template.taskTick.events({
  'click .task-tick': function() {
    const taskId = Template.currentData().taskId;
    if (Template.currentData().checked) {
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
});