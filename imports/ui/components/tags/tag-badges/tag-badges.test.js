import { chai } from 'meteor/practicalmeteor:chai';
import $ from 'jquery';

import { withRenderedTemplate } from '/imports/ui/test-helpers.js';

if (Meteor.isClient) {
  require('./tag-badges.js');

  describe('tags', function() {
    it('tag badges render correctly', function() {
      const data = {
        tags: ['tag1', 'tag2']
      };

      withRenderedTemplate('tagBadges', data, (el) => {
        console.log($(el).text());
        chai.assert.include($(el).text(), "tag1");
        chai.assert.include($(el).text(), "tag2");
      });
    });
  });
}
