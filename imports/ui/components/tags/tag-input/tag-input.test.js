import { chai } from 'meteor/practicalmeteor:chai';
import $ from 'jquery';
import { Meteor } from 'meteor/meteor';
import sinon from 'sinon';

import { withRenderedTemplate } from '/imports/ui/test-helpers.js';

if (Meteor.isClient) {
  require('./tag-input.js');

  describe('tag input', function() {
    beforeEach(function() {
      sandbox = sinon.sandbox.create();
      sandbox.stub(Roles, 'userIsInRole', function(userId, permissionList) {
        if (permissionList == 'validPermission') return true;
        return false;
      });
      sandbox.stub(Meteor, 'userId').returns('userId');
    });

    afterEach(function() {
      sandbox.restore();
    });

    it('renders correctly', function() {
      const data = {"tags": ["tag1", "tag2"], "collection": "companies", "entityId": "JWMWg9RM3HSP4ctCK", "permissionToEdit": "invalidPermission"};

      withRenderedTemplate('tagInput', data, (el) => {
        chai.assert.include($(el).html(), '<div id="tag-list-display"');
        chai.assert.include($(el).html(), '<a href="#"><span class="badge">tag1</span></a>');
        chai.assert.include($(el).html(), '<a href="#"><span class="badge">tag2</span></a>');
      });
    });

    it('shows the edit button if user has got permission', function() {
      const data = {"tags": ["tag1", "tag2"], "collection": "companies", "entityId": "JWMWg9RM3HSP4ctCK", "permissionToEdit": "validPermission"};

      withRenderedTemplate('tagInput', data, (el) => {
        chai.assert.include($(el).html(), '<a href="#" class="pull-right badge editTags"><i class="fa fa-fw fa-tag"></i></a>');
      });
    });

    it('hides the edit button if user has not got permission', function() {
      const data = {"tags": ["tag1", "tag2"], "collection": "companies", "entityId": "JWMWg9RM3HSP4ctCK", "permissionToEdit": "invalidPermission"};

      withRenderedTemplate('tagInput', data, (el) => {
        chai.assert.notInclude($(el).html(), '<a href="#" class="pull-right badge editTags"><i class="fa fa-fw fa-tag"></i></a>');
      });
    });
  });
}