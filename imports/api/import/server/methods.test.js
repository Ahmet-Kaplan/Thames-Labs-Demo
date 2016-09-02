import { chai } from 'meteor/practicalmeteor:chai';
import sinon from 'sinon';
import { Meteor } from 'meteor/meteor';
import { importRows } from './methods.js';
import { Tenants, Products } from '/imports/api/collections.js';
import { UserSession } from 'meteor/benjaminrh:user-session';
import { Partitioner } from 'meteor/local:partitioner';

describe("importing records", () => {
  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    sandbox.stub(Meteor.users, 'findOne', function(data) {
      return { _id: 'userId', group: 'groupId'};
    });

    const tenantData = {
      settings: {
        product: { defaultNumber: 0 }
      }
    };

    sandbox.stub(Tenants, 'findOne').returns(tenantData);
    sandbox.stub(UserSession, 'set').returns("");
    sandbox.stub(UserSession, 'get').returns([]);
    sandbox.stub(Partitioner, 'bindUserGroup', function(userId, callback) {
      callback();
    });
  });

  afterEach(function() {
    sandbox.restore();
  });

  //Once other collections have been modularised, use this structure to write more tests
  it("adds products from import data set", function() {
    const importData = [
      { name: 'new product',
        description: 'Test product 1',
        salePrice: '2',
        costPrice: '1' },
      { name: 'new product 2',
        description: 'Test product 2',
        salePrice: '3',
        costPrice: '2' }
    ];

    const fieldMap = [
      { schemaField: 'name', importField: 'name' },
      { schemaField: 'description', importField: 'description' },
      { schemaField: 'price', importField: 'salePrice' },
      { schemaField: 'cost', importField: 'costPrice' }
    ];

    sandbox.stub(Products, 'findOne', (product) => null);

    let i = 0;
    sandbox.stub(Products, 'insert', (data, done) => {
      chai.assert.equal(data.name, importData[i].name);
      chai.assert.equal(data.description, importData[i].description);
      chai.assert.equal(data.price, importData[i].salePrice);
      chai.assert.equal(data.cost, importData[i].costPrice);
      i++;
      done();
    });

    importRows(importData, 'products', fieldMap, 'userId', {}, {});
  });
});