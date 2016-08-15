import { chai } from 'meteor/practicalmeteor:chai';
import $ from 'jquery';
import { Meteor } from 'meteor/meteor';

import { withRenderedTemplate } from '/imports/ui/test-helpers.js';

if (Meteor.isClient) {
  require('./tag-selectize.js');

  describe('tag selectize', function() {
    it('renders correctly', function() {
      const data = {"tags": ["tag1", "tag2"], "collection": "companies", "entityId": "JWMWg9RM3HSP4ctCK", "permissionToEdit": "CanEditCompanies"};

      withRenderedTemplate('tagSelectize', data, (el) => {
        //Check selectize has been loaded correctly
        chai.assert.include($(el).html(), '<div class="selectize-control tag-input multi">');
        chai.assert.equal($(el).find(".tag-input.selectized").css('display'), 'none');
        //Check tags are shown inside the selectize box
        chai.assert.include($(el).html(), '<div data-value="tag1"><span class="name">tag1</span></div>');
        chai.assert.include($(el).html(), '<div data-value="tag2"><span class="name">tag2</span></div>');
      });
    });
  });
}