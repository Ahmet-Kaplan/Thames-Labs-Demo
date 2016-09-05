import { chai } from 'meteor/practicalmeteor:chai';
import sinon from 'sinon';
import { Meteor } from 'meteor/meteor';
import { importRows } from './methods.js';
import { Companies, Contacts, Opportunities, Products, Projects, PurchaseOrders, Tenants } from '/imports/api/collections.js';
import { UserSession } from 'meteor/benjaminrh:user-session';
import { Partitioner } from 'meteor/local:partitioner';

/// HELP: if you get a 'timeout exceeded' message for a below failing test
///       it means one of the assertions inside the Collection.insert callback has failed.
describe("importing records", () => {
  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    sandbox.stub(Meteor.users, 'findOne', function(data) {
      return { _id: 'userId', group: 'groupId'};
    });

    const tenantData = {
      settings: {
        company: { defaultNumber: 0 },
        contact: { defaultNumber: 0 },
        opportunity: { defaultNumber: 0 },
        product: { defaultNumber: 0 },
        project: { defaultNumber: 0 },
        purchaseorder: { defaultNumber: 0 }
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

  it("adds companies from an import data set", function(done) {
    const importData = [{
      name: 'Starfleet Headquarters',
      address: '42 Enterprise Way',
      city: 'London',
      county: 'United Kingdom',
      country: 'Earth',
      postcode: '13627',
      url: 'http://www.starfleet.com'
    }];

    const fieldMap = [
      { schemaField: 'name', importField: 'name' },
      { schemaField: 'address', importField: 'address' },
      { schemaField: 'city', importField: 'city' },
      { schemaField: 'county', importField: 'county' },
      { schemaField: 'country', importField: 'country' },
      { schemaField: 'postcode', importField: 'postcode' },
      { schemaField: 'website', importField: 'url' }
    ];

    sandbox.stub(Companies, 'findOne', (company) => null);

    let i = 0;
    sandbox.stub(Companies, 'insert', (data) => {
      chai.assert.equal(data.name, importData[i].name);
      chai.assert.equal(data.address, importData[i].address);
      chai.assert.equal(data.city, importData[i].city);
      chai.assert.equal(data.county, importData[i].county);
      chai.assert.equal(data.country, importData[i].country);
      chai.assert.equal(data.postcode, importData[i].postcode);
      chai.assert.equal(data.website, importData[i].url);
      chai.assert.equal(data.sequencedIdentifier, 1);
      i++;
      done();
    });

    importRows(importData, 'companies', fieldMap, 'userId');
  });

  it("adds contacts from an import data set", function(done) {
    const importData = [
      {
        forename: "James",
        surname: "Kirk",
        company: "Starfleet Headquarters",
        jobtitle: "Captain",
        phone: "0113 398 2587",
        mobile: "0879 567 0294",
        email: "james.kirk@starfleet.com",
      }
    ];

    const fieldMap = [
      { schemaField: 'forename', importField: 'forename' },
      { schemaField: 'surname', importField: 'surname' },
      { schemaField: 'jobtitle', importField: 'jobtitle' },
      { schemaField: 'email', importField: 'email' },
      { schemaField: 'companyName', importField: 'company' },
      { schemaField: 'mobile', importField: 'mobile' },
      { schemaField: 'phone', importField: 'phone' },
    ];

    sandbox.stub(Contacts, 'findOne', (contact) => null);
    sandbox.stub(Companies, 'findOne', function(a) {
      return { _id: 'companyId', name: 'Company Name'};
    });

    let i = 0;
    sandbox.stub(Contacts, 'insert', (data) => {
      chai.assert.equal(data.forename, importData[i].forename);
      chai.assert.equal(data.surname, importData[i].surname);
      chai.assert.equal(data.jobtitle, importData[i].jobtitle);
      chai.assert.equal(data.email, importData[i].email);
      chai.assert.equal(data.mobile, importData[i].mobile);
      chai.assert.equal(data.phone, importData[i].phone);
      chai.assert.equal(data.companyId, "companyId");
      chai.assert.equal(data.sequencedIdentifier, 1);
      i++;
      done();
    });

    importRows(importData, 'contacts', fieldMap, 'userId');
  });

  it("adds opportunities from an import data set", function(done) {
    const importData = [
      {
        name: 'Build USS Enterprise-A',
        description: 'Opportunity to build a new starship',
        date: '11/11/11',
        estCloseDate: '11/11/11',
        value: '234.00',
        salesManager: 'Montgomery Scott',
        companyName: 'Starfleet Headquarters'
      }
    ];

    const fieldMap = [
      { schemaField: 'name', importField: 'name' },
      { schemaField: 'description', importField: 'description' },
      { schemaField: 'date', importField: 'date' },
      { schemaField: 'estCloseDate', importField: 'estCloseDate' },
      { schemaField: 'value', importField: 'value' },
      { schemaField: 'salesManager', importField: 'salesManager' },
      { schemaField: 'companyName', importField: 'companyName' }
    ];

    sandbox.stub(Opportunities, 'findOne', (opp) => null);
    sandbox.stub(Companies, 'findOne', function(a) {
      return { _id: 'companyId', name: 'Starfleet Headquarters'};
    });

    let i = 0;
    sandbox.stub(Opportunities, 'insert', (data) => {
      chai.assert.equal(data.name, importData[i].name);
      chai.assert.equal(data.description, importData[i].description);
      chai.assert.equal(data.value, importData[i].value);
      chai.assert.equal(data.salesManagerId, "userId");
      chai.assert.equal(data.companyId, "companyId");
      chai.assert.equal(data.sequencedIdentifier, 1);
      i++;
      done();
    });

    importRows(importData, 'opportunities', fieldMap, 'userId');
  });

  it("adds products from an import data set", function(done) {
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
    sandbox.stub(Products, 'insert', (data) => {
      chai.assert.equal(data.name, importData[i].name);
      chai.assert.equal(data.description, importData[i].description);
      chai.assert.equal(data.price, importData[i].salePrice);
      chai.assert.equal(data.cost, importData[i].costPrice);
      chai.assert.equal(data.sequencedIdentifier, 1);
      i++;
      done();
    });

    importRows(importData, 'products', fieldMap, 'userId', {}, {});
  });

  it("adds projects from an import data set", function(done) {
    const importData = [
      {
        name: 'Test',
        description: 'sdff',
        value: 213,
        companyName: 'Starfleet Headquarters'
      }
    ];

    const fieldMap = [
      { schemaField: 'name', importField: 'name' },
      { schemaField: 'description', importField: 'description' },
      { schemaField: 'value', importField: 'value' },
      { schemaField: 'companyName', importField: 'companyName' }
    ];

    sandbox.stub(Projects, 'findOne', () => null);
    sandbox.stub(Companies, 'findOne', function(a) {
      return { _id: 'companyId', name: 'Starfleet Headquarters'};
    });

    let i = 0;
    sandbox.stub(Projects, 'insert', (data) => {
      chai.assert.equal(data.name, importData[i].name);
      chai.assert.equal(data.description, importData[i].description);
      chai.assert.equal(data.value, importData[i].value);
      chai.assert.equal(data.companyId, "companyId");
      chai.assert.equal(data.sequencedIdentifier, 1);
      i++;
      done();
    });

    importRows(importData, 'projects', fieldMap, 'userId');
  });

  it("adds purchase orders from an import data set", function(done) {
    const importData = [
      {
        description: 'Plasma injectors',
        status: 'Requested',
        paymentMethod: 'Cash',
        notes: 'Ordering plasma injectors for the new USS Enterprise',
        supplier: 'Starfleet Headquarters',
        supplierReference: 'Live long and prosper'
      }
    ];

    const fieldMap = [
      { schemaField: 'status', importField: 'status' },
      { schemaField: 'description', importField: 'description' },
      { schemaField: 'paymentMethod', importField: 'paymentMethod' },
      { schemaField: 'supplier', importField: 'supplier' },
      { schemaField: 'supplierReference', importField: 'supplierReference' },
      { schemaField: 'notes', importField: 'notes' }
    ];

    sandbox.stub(PurchaseOrders, 'findOne', () => null);
    sandbox.stub(Companies, 'findOne', function() {
      return { _id: 'companyId', name: 'Starfleet Headquarters'};
    });

    let i = 0;
    sandbox.stub(PurchaseOrders, 'insert', (data) => {
      chai.assert.equal(data.description, importData[i].description);
      chai.assert.equal(data.notes, importData[i].notes);
      chai.assert.equal(data.status, importData[i].status);
      chai.assert.equal(data.paymentMethod, importData[i].paymentMethod);
      chai.assert.equal(data.supplierReference, importData[i].supplierReference);
      chai.assert.equal(data.supplierCompanyId, "companyId");
      chai.assert.equal(data.sequencedIdentifier, 1);
      i++;
      done();
    });

    importRows(importData, 'purchaseorders', fieldMap, 'userId');
  });
});