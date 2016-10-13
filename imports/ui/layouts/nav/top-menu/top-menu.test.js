import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import $ from 'jquery';
import { withRenderedTemplate } from '/imports/ui/test-helpers.js';

if (Meteor.isClient) {
  require('./top-menu.js');

  describe('top nav', function() {

    it("displays the logo", function() {
      withRenderedTemplate('topMenu', {}, (el) => {
        chai.assert.include($(el).text(), "Thames Labs");
      });
    });
  });
}
