import { assert } from 'meteor/practicalmeteor:chai';
import { $ } from 'meteor/jquery';

import { withRenderedTemplate } from 'imports/ui/test-helpers.js';
import './menu-button.js';


describe("menu button", () => {
  it('renders correctly with simple data', function() {
    const data = {
      title: 'Activities',
      page: 'activities',
      icon: 'history',
      permissions: '',
      proFeature: false
    };

    withRenderedTemplate('menuButton', data, (el) => {
      assert.equal($(el).find('#menuLinkactivities').text(), data.title);
      assert.equal($(el).find('.fa.fa-fw.fa-history').length, 0);
    });
  });

  it('renders incorrectly with simple data', function() {
    const data = {
      title: 'Chicken',
      page: 'activities',
      icon: 'history',
      permissions: '',
      proFeature: false
    };

    withRenderedTemplate('menuButton', data, (el) => {
      assert.equal($(el).find('#menuLinkactivities').text(), data.title);
      assert.equal($(el).find('.fa.fa-fw.fa-history').length, 0);
    });
  });
});