import { chai } from 'meteor/practicalmeteor:chai';
import $ from 'jquery';

import { withRenderedTemplate } from '/imports/ui/test-helpers.js';

if (Meteor.isClient) {
  require('./tag-badges.js');

  describe('tag badge', function() {
    it('renders correctly', function() {
      const data = {
        tags: ['tag1', 'tag2']
      };

      withRenderedTemplate('tagBadges', data, (el) => {
        chai.assert.include($(el).html(), '<a href="#"><span class="badge">tag1</span></a>');
        chai.assert.include($(el).html(), '<a href="#"><span class="badge">tag2</span></a>');
      });
    });

    it('renders correctly with an active search filter', function() {
      const data = {
        tags: ['selectedTag', 'tag2'],
        index: {
          getComponentDict() {
            return { get() {
              return {"props": {"tags": "selectedTag"}, "limit": 10};
            }};
          }
        }
      };
      withRenderedTemplate('tagBadges', data, (el) => {
        //Check selectedTag is active
        chai.assert.include($(el).html(), '<a href="#"><span class="badge active">selectedTag</span></a>');
        chai.assert.notInclude($(el).html(), '<a href="#"><span class="badge">selectedTag</span></a>');
        //Check tag 2 isn't active
        chai.assert.include($(el).html(), '<a href="#"><span class="badge">tag2</span></a>');
        chai.assert.notInclude($(el).html(), '<a href="#"><span class="badge active">tag2</span></a>');
      });
    });

    it('allows clicking to add a filter to a search', function(done) {
      const data = {
        tags: ['tag1'],
        index: {
          getComponentDict() {
            return { get() {
              return {"props": {}, "limit": 10};
            }};
          },
          getComponentMethods() {
            return { addProps(entity, tags) {
              chai.assert.include(entity, 'tags');
              chai.assert.include(tags, 'tag1');
              done();
            }};
          }
        }
      };

      withRenderedTemplate('tagBadges', data, (el) => {
        chai.assert.include($(el).html(), '<a href="#"><span class="badge">tag1</span></a>');
        $(el).find("a").click();
      });
    });

    it('allows clicking to remove one of one tag filters from a search', function(done) {
      const data = {
        tags: ['tag1'],
        index: {
          getComponentDict() {
            return { get() {
              return {"props": {"tags": "tag1"}, "limit": 10};
            }};
          },
          getComponentMethods() {
            return { removeProps(entity) {
              chai.assert.include(entity, 'tags');
              done();
            }};
          }
        }
      };

      withRenderedTemplate('tagBadges', data, (el) => {
        chai.assert.include($(el).html(), '<a href="#"><span class="badge active">tag1</span></a>');
        $(el).find("a").click();
      });
    });

    it('allows clicking to remove one of two tag filters from a search', function(done) {
      const data = {
        tags: ['tag1'],
        index: {
          getComponentDict() {
            return { get() {
              return {"props": {"tags": "tag1,tag2"}, "limit": 10};
            }};
          },
          getComponentMethods() {
            return { addProps(entity, tags) {
              chai.assert.include(entity, 'tags');
              chai.assert.notInclude(tags, 'tag1');
              chai.assert.include(tags, 'tag2');
              done();
            }};
          }
        }
      };

      withRenderedTemplate('tagBadges', data, (el) => {
        chai.assert.include($(el).html(), '<a href="#"><span class="badge active">tag1</span></a>');
        $(el).find("a").click();
      });
    });
  });
}
