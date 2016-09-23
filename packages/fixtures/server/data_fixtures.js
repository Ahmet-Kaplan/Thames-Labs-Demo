Meteor.methods({

  addCompanyActivity: function() {
    const { Activities, Companies } = require('/imports/api/collections.js');
    var entity = Companies.findOne({});
    var data = entity.name;
    Activities.insert({
      type: "Note",
      notes: "Test company activity",
      createdAt: new Date(),
      activityTimestamp: new Date(),
      primaryEntityId: entity._id,
      primaryEntityType: "companies",
      primaryEntityDisplayData: data,
      companyId: entity._id,
      createdBy: this.userId
    });
  },
  addContactActivity: function() {
    const { Activities, Contacts } = require('/imports/api/collections.js');
    var entity = Contacts.findOne({});
    var data = entity.forename + " " + entity.surname;
    Activities.insert({
      type: "Note",
      notes: "Test contact activity",
      createdAt: new Date(),
      activityTimestamp: new Date(),
      primaryEntityId: entity._id,
      primaryEntityType: "contacts",
      primaryEntityDisplayData: data,
      contactId: entity._id,
      createdBy: this.userId
    });
  },
  addOpportunityActivity: function() {
    const { Activities, Opportunities } = require('/imports/api/collections.js');
    var entity = Opportunities.findOne({});
    var data = entity.name;
    Activities.insert({
      type: "Note",
      notes: "Test opportunity activity",
      createdAt: new Date(),
      activityTimestamp: new Date(),
      primaryEntityId: entity._id,
      primaryEntityType: "opportunities",
      primaryEntityDisplayData: data,
      opportunityId: entity._id,
      createdBy: this.userId
    });
  },

  addProjectActivity: function() {
    const { Activities, Projects } = require('/imports/api/collections.js');
    var entity = Projects.findOne({});
    var data = entity.name;
    Activities.insert({
      type: "Note",
      notes: "Test project activity",
      createdAt: new Date(),
      activityTimestamp: new Date(),
      primaryEntityId: entity._id,
      primaryEntityType: "projects",
      primaryEntityDisplayData: data,
      projectId: entity._id,
      createdBy: this.userId
    });
  },
  addPurchaseOrderActivity: function() {
    const { Activities, PurchaseOrders } = require('/imports/api/collections.js');
    var entity = PurchaseOrders.findOne({});
    var data = entity.description;
    Activities.insert({
      type: "Note",
      notes: "Test purchase order activity",
      createdAt: new Date(),
      activityTimestamp: new Date(),
      primaryEntityId: entity._id,
      primaryEntityType: "purchaseorders",
      primaryEntityDisplayData: data,
      purchaseOrderId: entity._id,
      createdBy: this.userId
    });
  },
  addTaskActivity: function() {
    const { Activities, Tasks } = require('/imports/api/collections.js');
    var entity = Tasks.findOne({});
    var data = entity.title;
    Activities.insert({
      type: "Note",
      notes: "Test task activity",
      createdAt: new Date(),
      activityTimestamp: new Date(),
      primaryEntityId: entity._id,
      primaryEntityType: "tasks",
      primaryEntityDisplayData: data,
      taskId: entity._id,
      createdBy: this.userId
    });
  },

  addCompany: function(user, name) {
    var companyName = (name === true) ? 'Clouds Inc.' : (name || 'Test Ltd'),
        address = (name === true) ? '3rd Tower on the left' : 'Cowley Road',
        city = (name === true) ? 'Cloudy' : 'Cambridge',
        postcode = (name === true) ? 'CC1' : 'CB4',
        country = (name === true) ? 'Bespin' : 'United Kingdom';
    let userId = '';
    if(user) {
      userId = user;
    }else {
      userId = this.userId;
    }

    const { Companies } = require('/imports/api/collections.js');
    var data = Companies.insert({
      name: companyName,
      address: address,
      city: city,
      postcode: postcode,
      country: country,
      createdBy: userId,
      customFields: {},
      extendedInformation: [],
      sequencedIdentifier: 1
    });

    if (companyName === 'Test Ltd') {
      Collections.companies.addTag('Company Tag', {
        _id: data
      });
    }
    return data;

  },

  addContact: function(user, forename, surname) {
    const { Contacts } = require('/imports/api/collections.js');
    var contactForename = (forename === true) ? 'Obi-Wan' : (forename || 'Testy'),
        contactSurname = (forename === true) ? 'Kenobi' : (surname || 'Surname'),
        email = (forename === true) ? 'obiwan@kenobi.com' : 'testy@surname.com';
    let userId = '';
    if(user) {
      userId = user;
    }else {
      userId = this.userId;
    }
    var contactId = Contacts.insert({
      forename: contactForename,
      surname: contactSurname,
      email: email,
      address: 'Cowley Road',
      city: 'Cambridge',
      postcode: 'CB4 0WS',
      country: 'United Kingdom',
      createdBy: userId,
      customFields: {},
      extendedInformation: [],
      sequencedIdentifier: 1
    });

    if (contactForename === 'Testy') {
      Collections.contacts.addTag('Contact Tag', {
        _id: contactId
      });
    }

    return contactId;
  },

  addContactForCompany: function() {
    var userId = Meteor.userId();

    const { Companies, Contacts } = require('/imports/api/collections.js');
    var companyId = Companies.insert({
      name: 'Test Ltd',
      address: 'Cowley Road',
      city: 'Cambridge',
      postcode: 'CB4 0WS',
      country: 'United Kingdom',
      createdBy: userId,
      customFields: {},
      extendedInformation: [],
      sequencedIdentifier: 1
    });

    return Contacts.insert({
      forename: "Testy",
      surname: "Surname",
      email: "testy@surname.com",
      createdBy: userId,
      companyId: companyId,
      sequencedIdentifier: 1
    });
  },
  addProject: function(user, additional) {
    const { Companies, Projects } = require('/imports/api/collections.js');
    var companyId = (additional === true) ? Meteor.call('addCompany', user, true) : Companies.findOne({})._id,
        name = (additional === true) ? 'Restore Peace to the galaxy' : 'test project',
        description = (additional === true) ? 'Since the Sith took control, the galaxy is an awful place to live.' :
        'The purpose of this project is only to serve as an example for the tests.',
        value = (additional === true) ? 10000 : 100;
    let userId = '';
    if(user) {
      userId = user;
    }else {
      userId = this.userId;
    }

    var projectId = Projects.insert({
      name: name,
      description: description,
      companyId: companyId,
      userId: userId,
      value: value,
      createdBy: userId,
      projectTypeId: 0,
      projectMilestoneId: 0,
      sequencedIdentifier: 1
    });

    if (name === 'test project') {
      Collections.projects.addTag('Project Tag', {
        _id: projectId
      });
    }

    return projectId;
  },

  addDefaultProjectType: function(tenantName) {
    var projectType = {
      id: 0,
      name: "Standard Project",
      milestones: [{
        name: "Inception",
        description: "This is a newly-created project",
        id: 0
      }, {
        name: "Completion",
        description: "This project has been completed",
        id: 1
      }]
    };
    const { Tenants } = require('/imports/api/collections.js');
    Tenants.update({
      name: tenantName
    }, {
      $set: {
        "settings.project.types": [projectType]
      }
    });
  },
  addLimitedProjectType: function(tenantName) {
    var projectType = {
      id: 0,
      name: "Standard Project",
      milestones: []
    };

    const { Tenants } = require('/imports/api/collections.js');
    Tenants.update({
      name: tenantName
    }, {
      $set: {
        "settings.project.types": [projectType]
      }
    });
  },

  addOpportunity: function(user, additional) {
    var stages = [];
    stages.push({
      title: 'Stage 1',
      description: 'test description',
      id: 0
    });
    stages.push({
      title: 'Stage 2',
      description: 'test description',
      id: 1
    });
    var stage = stages[0];
    const { Tenants, Opportunities } = require('/imports/api/collections.js');
    Tenants.update(Partitioner.group(), {
      $set: {
        'settings.opportunity.stages': stages
      }
    });

    var date = new Date();
    var companyId = Meteor.call('addCompany', user, additional);
    var name = (additional === true) ? 'Destroy Death Star' : 'test opportunity',
        description = (additional === true) ? 'This is no moon!' : 'test description',
        value = (additional === true) ? 5000 : 40;

    let userId = '';
    if(user) {
      userId = user;
    }else {
      userId = this.userId;
    }

    var data = Opportunities.insert({
      name: name,
      description: description,
      date: date,
      value: value,
      currentStageId: stage.id,
      companyId: companyId,
      createdBy: userId,
      items: [],
      sequencedIdentifier: 1
    });

    if (name === 'test opportunity') {
      Collections.opportunities.addTag('Opp Tag', {
        _id: data
      });
    }

    return data;
  },
  addPurchaseOrder: function(user, additional) {

    const { Companies, PurchaseOrders } = require('/imports/api/collections.js');
    var name = (additional === true) ? 'Jawa Inc.' : "Test Ltd",
        address = (additional === true) ? 'Banthas Road' : "address",
        city = (additional === true) ? 'Mos Eisley' : "city",
        postcode = (additional === true) ? 'ME1' : "postcode",
        country = (additional === true) ? 'Tatooine' : "country";
    let userId = '';
    if(user) {
      userId = user;
    }else {
      userId = this.userId;
    }
    var companyId = Companies.insert({
      name: name,
      address: address,
      city: city,
      postcode: postcode,
      country: country,
      createdBy: userId,
      sequencedIdentifier: 1
    });

    var description = (additional === true) ? 'R2 type Droid' : "Test Purchase Order",
        status = (additional === true) ? 'Approved' : 'Requested';

    var data = PurchaseOrders.insert({
      userId: userId,
      description: description,
      supplierCompanyId: companyId,
      status: status,
      createdBy: userId,
      sequencedIdentifier: 1
    });

    return data;

  },
  addOpportunityLineItem: function() {
    const { Opportunities } = require('/imports/api/collections.js');
    var opp = Opportunities.findOne({});
    Opportunities.update(opp._id, {
      $push: {
        items: {
          id: Random.id(),
          name: "lineItem1",
          value: 42.0
        }
      }
    });
    return opp;
  }
});
