import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import $ from 'jquery';
import { withRenderedTemplate } from '/imports/ui/test-helpers.js';

if (Meteor.isClient) {
  require('./product-detail.js');

  describe('product details', function() {

    beforeEach(function() {
      //stub out FlowRouter.subsReady, FlowRouter.getParam('id')
      //Move permission-helpers.js redirectWithoutPermission
      //UniHTML whatever that is
      //Products.findOne
      //Products.remove
      //Modal.show()
    });

    afterEach(function() {

    });

    it("displays the logo", function() {
      withRenderedTemplate('topMenu', {}, (el) => {
        chai.assert.include($(el).text(), "RealTime");
        chai.assert.include($(el).text(), "CRM");
      });
    });
  });
}
