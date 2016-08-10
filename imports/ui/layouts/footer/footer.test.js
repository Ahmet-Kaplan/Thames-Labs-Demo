import { chai } from 'meteor/practicalmeteor:chai';
import $ from 'jquery';

import { withRenderedTemplate } from '/imports/ui/test-helpers.js';

if (Meteor.isClient) {
  /*
    Note: uses require so that import can happen inside if statement
    Meteor guide allows use of require 'when requiring client or server-only code from a common file'
    https://guide.meteor.com/structure.html#using-require
  */
  require('./footer.js');

  describe('footer', function() {
    it('renders correctly', function() {
      withRenderedTemplate('footer', {}, (el) => {
        chai.assert.include($(el).text(), "Made with ♥ by Cambridge Software Ltd");
        chai.assert.include($(el).text(), "RealTimeCRM");
        chai.assert.include($(el).text(), "Terms and Conditions");
      });
    });
  });

}
