import { chai } from 'meteor/practicalmeteor:chai';
import $ from 'jquery';

import { withRenderedTemplate } from '/imports/ui/test-helpers.js';
if (Meteor.isClient) {
  require('./menu-button.js');

  describe('menu button', function() {

    beforeEach(function() {
      //Stub meteor/alanning:roles
      Roles.userIsInRole = (userId, permissionList) => {
        if (permissionList == 'validPermission') return true;
        return false;
      };
    });

    it("is shown if user has permission", function() {
      const data = {
        title: 'Companies',
        page: 'companies',
        icon: 'building',
        permissions: 'validPermission',
        activeRoutes: 'companies|company'
      };

      withRenderedTemplate('menuButton', data, (el) => {
        chai.assert.include($(el).find('.menu-button').text(), data.title);
      });
    });

    it("isn't shown if user doesn't have permission", function() {
      const data = {
        title: 'Companies',
        page: 'companies',
        icon: 'building',
        permissions: 'invalidPermission',
        activeRoutes: 'companies|company'
      };

      withRenderedTemplate('menuButton', data, (el) => {
        chai.assert.notInclude($(el).find('.menu-button').text(), data.title);
      });
    });
  });
}