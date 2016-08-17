import { Meteor } from 'meteor/meteor';
import { chai } from 'meteor/practicalmeteor:chai';
import $ from 'jquery';
import sinon from 'sinon';
import { Template } from 'meteor/templating';
import { withRenderedTemplate } from '/imports/ui/test-helpers.js';
import { currencyHelpers } from '/imports/api/currency/currency-helpers.js';
import { Products } from '/imports/api/collections.js';

if (Meteor.isClient) {
  require('./product-details-panel.js');

  describe('product details', function() {

    beforeEach(function() {
      sandbox = sinon.sandbox.create();
      sandbox.stub(currencyHelpers, 'toDecimal', function(number) {
        return `£${number.toFixed(2)}`;
      });
      Template.registerHelper('setPageTitle', () => {});
      Template.registerHelper('decimal', (i) => currencyHelpers.toDecimal(i));
    });

    afterEach(function() {
      Template.deregisterHelper('setPageTitle');
      Template.deregisterHelper('decimal');
      sandbox.restore();
    });

    it("renders correctly", function() {
      const data = {
        productData: {
          _id: 'oZBjDjqXJWfEuetPx',
          cost: 4200,
          name: "USS Enterprise",
          description: "To explore strange new worlds and civilisations",
          price: 5000,
          tags: ['starship']
        }
      };

      withRenderedTemplate('productDetailsPanel', data, (el) => {
        //Check name
        chai.assert.include($(el).find('.list-group-item[data-field="name"]').html(), '<h4><i class="fa fa-fw fa-file-o"></i> Name</h4>');
        chai.assert.include($(el).find('.list-group-item[data-field="name"]').text(), 'USS Enterprise');
        //Check description
        chai.assert.include($(el).find('.list-group-item[data-field="description"]').html(), '<h4><i class="fa fa-fw fa-align-left"></i> Description</h4>');
        chai.assert.include($(el).find('.list-group-item[data-field="description"]').text(), 'To explore strange new worlds and civilisations');
        //Check prices are present
        chai.assert.include($(el).find('.list-group-item[data-field="cost"]').html(), '<h4><i class="fa fa-fw fa-gbp"></i> Cost Price</h4>');
        chai.assert.include($(el).find('.list-group-item[data-field="cost"]').text(), '£4200');
        chai.assert.include($(el).find('.list-group-item[data-field="price"]').html(), '<h4><i class="fa fa-fw fa-credit-card"></i> Sale Price</h4>');
        chai.assert.include($(el).find('.list-group-item[data-field="price"]').text(), '£5000');
        //Check tags are present
        chai.assert.include($(el).html(), '<span class="badge">starship</span>');
      });
    });

    it("shows the edit button if user has permission", function() {
      const data = {
        productData: {
          _id: 'oZBjDjqXJWfEuetPx',
          name: "USS Enterprise"
        }
      };

      Template.registerHelper('isInRole', (permission) => {
        if (permission == "CanEditProducts") return true;
      });

      withRenderedTemplate('productDetailsPanel', data, (el) => {
        chai.assert.include($(el).find('.btn-group.pull-right').html(), '<a href="#" id="edit-product" class="btn btn-info btn-xs"><i class="fa fa-fw fa-pencil"></i>Edit</a>');
      });
    });

    it("hides the edit button if user doesn't have permission", function() {
      const data = {
        productData: {
          _id: 'oZBjDjqXJWfEuetPx',
          name: "USS Enterprise"
        }
      };

      Template.registerHelper('isInRole', (permission) => {
        if (permission == "CanEditProducts") return false;
      });

      withRenderedTemplate('productDetailsPanel', data, (el) => {
        chai.assert.notInclude($(el).find('.btn-group.pull-right').html(), '<a href="#" id="edit-product" class="btn btn-info btn-xs"><i class="fa fa-fw fa-pencil"></i>Edit</a>');
      });
    });

    it("shows the delete button if user has permission", function() {
      const data = {
        productData: {
          _id: 'oZBjDjqXJWfEuetPx',
          name: "USS Enterprise"
        }
      };

      Template.registerHelper('isInRole', (permission) => {
        if (permission == "CanDeleteProducts") return true;
      });

      withRenderedTemplate('productDetailsPanel', data, (el) => {
        chai.assert.include($(el).find('.btn-group.pull-right').html(), '<a href="#" id="delete-product" class="btn btn-danger btn-xs"><i class="fa fa-fw fa-times"></i>Delete</a>');
      });
    });

    it("hides the delete button if user doesn't have permission", function() {
      const data = {
        productData: {
          _id: 'oZBjDjqXJWfEuetPx',
          name: "USS Enterprise"
        }
      };

      Template.registerHelper('isInRole', (permission) => {
        if (permission == "CanDeleteProducts") return false;
      });

      withRenderedTemplate('productDetailsPanel', data, (el) => {
        chai.assert.notInclude($(el).find('.btn-group.pull-right').html(), '<a href="#" id="delete-product" class="btn btn-danger btn-xs"><i class="fa fa-fw fa-times"></i>Delete</a>');
      });
    });

    it("allows a user to delete a product", function(done) {
      const data = {
        productData: {
          _id: 'oZBjDjqXJWfEuetPx',
          name: "USS Enterprise"
        }
      };

      Template.registerHelper('isInRole', (permission) => {
        if (permission == "CanDeleteProducts") return true;
      });

      sandbox.stub(Products, 'remove', (id) => {
        chai.assert.equal(id, "oZBjDjqXJWfEuetPx");
        done();
      });

      withRenderedTemplate('productDetailsPanel', data, (el) => {
        chai.assert.include($(el).find('.btn-group.pull-right').html(), '<a href="#" id="delete-product" class="btn btn-danger btn-xs"><i class="fa fa-fw fa-times"></i>Delete</a>');
        $(el).find('#delete-product').click();
        console.log($(el).html());
      });
    });
  });
}
