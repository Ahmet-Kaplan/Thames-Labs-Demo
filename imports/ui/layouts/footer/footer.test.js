import { chai } from 'meteor/practicalmeteor:chai';
import $ from 'jquery';

import { withRenderedTemplate } from '/imports/ui/test-helpers.js';

if (Meteor.isClient) {
  import './footer.js';

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