import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import $ from 'jquery';
import { withRenderedTemplate } from '/imports/ui/test-helpers.js';

if (Meteor.isClient) {
  require('./task-tick.js');

  describe('task tick', function() {

    it("renders an unchecked tick correctly", function() {
      const data = {
        taskId: "taskId",
        checked: false
      };

      withRenderedTemplate('taskTick', data, (el) => {
        chai.assert.include($(el).html(), '<button class="pull-left task-tick">');
        chai.assert.include($(el).html(), '<i class="fa fa-check">');
      });
    });

    it("renders a checked tick correctly", function() {
      const data = {
        taskId: "taskId",
        checked: true
      };

      withRenderedTemplate('taskTick', data, (el) => {
        chai.assert.include($(el).html(), '<button class="pull-left task-tick">');
        chai.assert.include($(el).html(), '<i class="fa fa-check green">');
      });
    });
  });
}
