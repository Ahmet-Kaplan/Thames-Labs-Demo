import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import $ from 'jquery';
import sinon from 'sinon';
import { withRenderedTemplate } from '/imports/ui/test-helpers.js';
import { currencyHelpers } from '/imports/api/currency/currency-helpers.js';

if (Meteor.isClient) {
  require('./purchase-order-list-item.js');

  describe('purchase order list item', function() {

    beforeEach(function() {
      sandbox = sinon.sandbox.create();
      sandbox.stub(Meteor, 'userId').returns('userId');
      sandbox.stub(currencyHelpers, 'toDecimal', function(number) {
        return `£${number.toFixed(2)}`;
      });
    });

    afterEach(function() {
      sandbox.restore();
    });

    it("renders correctly", function() {
      const data = {
        "__originalId": "s2ytQrpSfvjGmSkMs",
        "_id": 's2ytQrpSfvjGmSkMs""{}',
        "description": "Starship USS Enterprise",
        "supplierCompanyId": "hehE3y8DLZnrKg74u",
        "supplierReference": "NCC-3333",
        "userId": "vkYdcy8jT4X6zv5WS",
        "status": "Requested",
        "orderDate": "2016-08-17T08:01:16.220Z",
        "paymentMethod": "Cash",
        "notes": "For Mr Spock",
        "createdBy": "vkYdcy8jT4X6zv5WS",
        "sequencedIdentifier": "1",
        "locked": false,
        "totalValue": 0,
        "createdAt": "2016-08-17T08:01:16.220Z"
      };

      withRenderedTemplate('purchaseOrderListItem', data, (el) => {
        //Check title
        chai.assert.include($(el).text(), "Starship USS Enterprise");
        //Check prices are present
        chai.assert.include($(el).text(), "Cost Price: £4200.00");
        chai.assert.include($(el).text(), "Sales Price: £5000.00");
        //Test tags are present
        chai.assert.include($(el).html(), '<span class="badge">space</span>');
      });
    });

    it("highlights searched text in product name when searching", function() {
      const data = {
        __originalId: "oZBjDjqXJWfEuetPx",
        _id: 'oZBjDjqXJWfEuetPx""{}',
        cost: 4200,
        name: "Starship",
        price: 5000,
        tags: ['space'],
        index: {
          getComponentDict() {
            return { get() {
              return "ship";
            }};
          }
        }
      };

      withRenderedTemplate('purchaseOrderListItem', data, (el) => {
        //Check title and highlighted section
        chai.assert.include($(el).html(), '<h4 class="list-group-item-heading">Star<span class="highlighted-search">ship</span></h4>');
        chai.assert.include($(el).text(), "Starship");
        //Check prices are present
        chai.assert.include($(el).text(), "Cost Price: £4200.00");
        chai.assert.include($(el).text(), "Sales Price: £5000.00");
        //Test tags are present
        chai.assert.include($(el).html(), '<span class="badge">space</span>');
      });
    });
  });
}
