import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import $ from 'jquery';
import { withRenderedTemplate } from '/imports/ui/test-helpers.js';

if (Meteor.isClient) {
  require('./product-list-item.js');

  describe('product list item', function() {

    beforeEach(function() {
    });

    afterEach(function() {

    });

    it("renders correctly", function() {
      const data = {
        __originalId: "oZBjDjqXJWfEuetPx",
        _id: 'oZBjDjqXJWfEuetPx""{}',
        cost: 4200,
        name: "Starship",
        price: 5000,
        index: {
          getComponentDict() {
            return { get() {
              return "";
            }};
          }
        }
      };

      withRenderedTemplate('productListItem', data, (el) => {
        chai.assert.include($(el).text(), "RealTime");
        chai.assert.include($(el).text(), "CRM");
      });
    });

    it("highlights searched text in product name when searching", function() {
      const data = {
        __originalId: "oZBjDjqXJWfEuetPx",
        _id: 'oZBjDjqXJWfEuetPx""{}',
        cost: 4200,
        name: "Starship",
        price: 5000,
        index: {
          getComponentDict() {
            return { get() {
              return "ship";
            }};
          }
        }
      };

      withRenderedTemplate('productListItem', data, (el) => {
        chai.assert.include($(el).text(), "RealTime");
        chai.assert.include($(el).text(), "CRM");
      });
    });
  });
}
