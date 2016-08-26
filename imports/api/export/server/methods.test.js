import { assert } from 'meteor/practicalmeteor:chai';

import { getRowForExport } from './methods.js';

describe("exporting records", () => {
  beforeEach(function() {
    //Stub out required functions
    //TODO: refactor this!
    Tenants = {
      findOne() {
        return { settings: {
          opportunity: {
            stages: [{ id: 0, title: "Investigate subspace transmissions"}]
          },
          project: {
            types: [{ id: 0, name: "Build starship", milestones: [{ id: 0, name: "Construct warp drive"}]}]
          }
        }};
      }
    };
    Partitioner.group = () => "id";
    Meteor.users = {
      findOne() {
        return { id: "wqmRLP4RAbpD34iAL", profile: {
          name: "Montgomery Scott"
        }};
      }
    };
    Companies = {
      findOne() {
        return { _id: "bmMLEbBHoRMAKXuQ6", name: "Starfleet Headquarters" };
      }
    };

    Contacts = { findOne() {
      return {
        _id: "fQodfHhv2wQCiHgHx",
        name() {
          return "Mr Spock";
        }};
    }};
  });

  it("returns the correct row for an activity record", function() {

    const record = {
      _id: 'GhQFkerCw6NPF3tHb',
      type: 'Email',
      notes: "Emailed <b>Captain Kirk</b> on the <span style='font-color: green'>USS Enterprise</span> about his missing captain's log",
      activityTimestamp: new Date("November 11, 2011 11:11:11"),
      primaryEntityId: 'WcxPgRmBGZxFeXqAD',
      primaryEntityType: 'companies',
      primaryEntityDisplayData: 'Starfleet Headquarters',
      companyId: 'WcxPgRmBGZxFeXqAD',
      contactId: null,
      projectId: null,
      purchaseOrderId: null,
      opportunityId: null,
      taskId: null,
      createdBy: 'z42CCZ69d9SSmFczq'
    };

    const actualResult = getRowForExport(record, 'activities');

    const expectedResult = {
      type: 'Email',
      notes: "Emailed Captain Kirk on the USS Enterprise about his missing captain's log",
      createdAt: '',
      activityTimestamp: '11/11/11 11:11',
      recordType: 'companies',
      recordName: 'Starfleet Headquarters'
    };

    assert.deepEqual(actualResult, expectedResult);
  });

  it("returns the correct row for a company record", function() {

    const record = {
      _id: '3aGR3yMsWTM7BgjSZ',
      name: 'Starfleet Headquarters',
      website: 'http://www.starfleet.com',
      address: '42 Enterprise Way',
      city: 'London',
      county: 'United Kingdom',
      postcode: '13627',
      country: 'Earth',
      lat: '52.54508999999999',
      lng: '13.31768',
      createdBy: 'z42CCZ69d9SSmFczq',
      sequencedIdentifier: 38,
      createdAt: new Date("November 11, 2011 11:11:11"),
      metadata: {
        clearbit: {
          id: 'f323bfa4-434d-4e8d-8b0f-dfb7e308801a',
        }
      }
    };

    const actualResult = getRowForExport(record, 'companies');

    const expectedResult = {
      name: 'Starfleet Headquarters',
      address: '42 Enterprise Way',
      address2: '',
      city: 'London',
      county: 'United Kingdom',
      country: 'Earth',
      postcode: '13627',
      phone: '',
      website: 'http://www.starfleet.com',
      tags: '',
      createdAt: '11/11/11'
    };

    assert.deepEqual(actualResult, expectedResult);
  });

  it("returns the correct row for a contact record", function() {

    const record = { _id: '4HmT9fiF9wjigXA9R',
      forename: 'James',
      surname: 'Kirk',
      jobtitle: 'Captain',
      phone: '0113 398 2587',
      mobile: '0879 567 0294',
      email: "james.kirk@starfleet.com",
      companyId: "bmMLEbBHoRMAKXuQ6",
      createdBy: 'wqmRLP4RAbpD34iAL',
      createdAt: new Date("November 11, 2011 11:11:11"),
    };

    const actualResult = getRowForExport(record, 'contacts');

    const expectedResult = {
      forename: "James",
      surname: "Kirk",
      companyName: "Starfleet Headquarters",
      jobtitle: "Captain",
      phone: "0113 398 2587",
      mobile: "0879 567 0294",
      email: "james.kirk@starfleet.com",
      address: "",
      address2: "",
      city: "",
      county: "",
      country: "",
      postcode: "",
      tags: "",
      createdAt: "11/11/11"
    };

    assert.deepEqual(actualResult, expectedResult);
  });

  it("returns the correct row for an opportunity record", function() {

    const record = {
      _id: 'GPm8DpAkXvjBr6TNh',
      name: 'Build USS Enterprise-A',
      description: 'Opportunity to build a new starship',
      date: new Date("11/11/11 11:11"),
      estCloseDate: new Date("11/11/11 11:11"),
      value: 234,
      companyId: 'bmMLEbBHoRMAKXuQ6',
      contactId: 'fQodfHhv2wQCiHgHx',
      salesManagerId: 'wqmRLP4RAbpD34iAL',
      currentStageId: 0,
      createdBy: 'z42CCZ69d9SSmFczq',
      sequencedIdentifier: 1,
      createdAt: new Date("November 11, 2011 11:11:11"),
      tags: ['starship', 'construction']
    };

    const actualResult = getRowForExport(record, 'opportunities');

    const expectedResult = {
      name: 'Build USS Enterprise-A',
      description: 'Opportunity to build a new starship',
      stage: 'Investigate subspace transmissions',
      date: '11/11/11',
      estCloseDate: '11/11/11',
      value: '234.00',
      salesManager: 'Montgomery Scott',
      companyName: 'Starfleet Headquarters',
      contactName: 'Mr Spock',
      tags: ['starship', 'construction']
    };

    assert.deepEqual(actualResult, expectedResult);
  });

  it("returns the correct row for a product record", function() {

    const record = {
      name: "USS Enterprise",
      description: "The flagship starship",
      price: 1200,
      cost: 1100,
      _id: 'RN2AQmbKEp85wv5Tm',
      createdBy: 'cR2qt7PxpsuqwuX7T',
      sequencedIdentifier: 1
    };

    const actualResult = getRowForExport(record, 'products');

    const expectedResult = {
      name: "USS Enterprise",
      description: "The flagship starship",
      salePrice: 1200,
      costPrice: 1100
    };

    assert.deepEqual(actualResult, expectedResult);
  });

  it("returns the correct row for an project record", function() {

    const record = { _id: 'cry35QNYLwA4Cf2QJ',
      name: 'Test',
      description: 'sdff',
      companyId: 'bmMLEbBHoRMAKXuQ6',
      contactId: 'fQodfHhv2wQCiHgHx',
      userId: 'gMf7vDudKrt2ZWqex',
      value: 213,
      staff: [ 'wqmRLP4RAbpD34iAL' ],
      createdBy: 'z42CCZ69d9SSmFczq',
      projectTypeId: 0,
      sequencedIdentifier: 2,
      active: true,
      projectMilestoneId: 0,
      createdAt: new Date("November 11, 2011 11:11:11")
    };

    const actualResult = getRowForExport(record, 'projects');

    const expectedResult = { name: 'Test',
      description: 'sdff',
      projectType: 'Build starship',
      milestone: 'Construct warp drive',
      value: 213,
      dueDate: '',
      staff: 'Montgomery Scott',
      active: 'Yes',
      tags: '',
      companyName: 'Starfleet Headquarters',
      contactName: 'Mr Spock'
    };

    assert.deepEqual(actualResult, expectedResult);
  });

  it("returns the correct row for a purchase order record", function() {

    const record = {
      _id: 'yacA3koe22iT3DsJh',
      description: 'Plasma injectors',
      supplierCompanyId: 'bmMLEbBHoRMAKXuQ6',
      supplierContactId: 'fQodfHhv2wQCiHgHx',
      supplierReference: 'Live long and prosper',
      userId: 'z42CCZ69d9SSmFczq',
      status: 'Requested',
      orderDate: new Date("11/11/11 11:11"),
      paymentMethod: 'Cash',
      notes: 'Ordering plasma injectors for the new USS Enterprise',
      createdBy: 'z42CCZ69d9SSmFczq',
      sequencedIdentifier: '2',
      locked: false,
      totalValue: 0,
      createdAt: new Date("November 11, 2011 11:11:11")
    };

    const actualResult = getRowForExport(record, 'purchaseorders');

    const expectedResult = {
      description: 'Plasma injectors',
      status: 'Requested',
      orderDate: '11/11/11',
      paymentMethod: 'Cash',
      notes: 'Ordering plasma injectors for the new USS Enterprise',
      locked: 'No',
      totalValue: 0,
      supplier: 'Starfleet Headquarters',
      supplierContact: 'Mr Spock',
      supplierReference: 'Live long and prosper',
      tags: '',
      createdAt: '11/11/11'
    };

    assert.deepEqual(actualResult, expectedResult);
  });

  it("returns the correct row for a task record", function() {

    const record = {
      _id: '6diNv2b8GsJ5cwNKc',
      title: 'Improve plasma injectors',
      description: 'Mr Spock has logically asked for the plasma injectors to be improved',
      dueDate: new Date("11/11/11 11:11"),
      isAllDay: false,
      assigneeId: 'wqmRLP4RAbpD34iAL',
      completed: false,
      entityType: 'contact',
      entityId: 'fQodfHhv2wQCiHgHx'
    };

    const actualResult = getRowForExport(record, 'tasks');

    const expectedResult = {
      title: 'Improve plasma injectors',
      description: 'Mr Spock has logically asked for the plasma injectors to be improved',
      dueDate: '11/11/11 11:11',
      isAllDay: 'No',
      completed: 'No',
      assignee: 'Montgomery Scott',
      relatedRecord: 'Mr Spock',
      relatedRecordType: 'contact'
    };

    assert.deepEqual(actualResult, expectedResult);
  });
});