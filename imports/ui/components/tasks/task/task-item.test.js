import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import $ from 'jquery';
import { withRenderedTemplate } from '/imports/ui/test-helpers.js';

if (Meteor.isClient) {
  require('./task-item.js');

  describe('task item', function() {

    it("renders a task correctly", function() {
      const data = {
        taskId: "taskId",
        checked: false
      };

      withRenderedTemplate('taskItem', data, (el) => {
        chai.assert.include($(el).html(), '<button class="pull-left task-tick">');
        chai.assert.include($(el).html(), '<i class="fa fa-check">');
      });
    });
  });
}
