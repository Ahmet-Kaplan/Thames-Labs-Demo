Meteor.methods({

  addCompanyActivity: function() {
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
    var entity = Contacts.findOne({});
    var data = entity.forename + " " + entity.surname;
    Activities.insert({
      type: "Note",
      notes: "Test contact activity",
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
    var entity = PurchaseOrders.findOne({});
    var data = entity.description;
    Activities.insert({
      type: "Note",
      notes: "Test purchase order activity",
      createdAt: new Date(),
      activityTimestamp: new Date(),
      primaryEntityId: entity._id,
      primaryEntityType: "purchaseOrders",
      primaryEntityDisplayData: data,
      purchaseOrderId: entity._id,
      createdBy: this.userId
    });
  },
  addTaskActivity: function() {
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

  addCompany: function(name) {
    var companyName = (name === true) ? 'Clouds Inc.' : (name || 'Test Ltd'),
      address = (name === true) ? '3rd Tower on the left' : 'Cowley Road',
      city = (name === true) ? 'Cloudy' : 'Cambridge',
      postcode = (name === true) ? 'CC1' : 'CB4',
      country = (name === true) ? 'Bespin' : 'United Kingdom',
      userId = this.userId;

    var data = Companies.insert({
      name: companyName,
      address: address,
      city: city,
      postcode: postcode,
      country: country,
      createdBy: userId,
      customFields: {}
    });

    if(companyName === 'Test Ltd') {
      Collections.companies.addTag('Company Tag', {
        _id: data
      });
    }
    return data;

  },

  addContact: function(forename, surname) {
    var contactForename = (forename === true) ? 'Obi-Wan' : (forename || 'Testy'),
        contactSurname = (forename === true) ? 'Kenobi' : (surname || 'Surname'),
        email = (forename === true) ? 'obiwan@kenobi.com' : 'testy@surname.com'
        userId = Meteor.userId();

    var contactId = Contacts.insert({
      forename: contactForename,
      surname: contactSurname,
      email: email,
      createdBy: userId,
      customFields: {}
    });

    if(contactForename === 'Testy') {
      Collections.contacts.addTag('Contact Tag', {
        _id: contactId
      });
    }

    return contactId;
  },

  addContactForCompany: function() {
    var userId = Meteor.userId();
    var companyId = Companies.insert({
      name: 'Test Ltd',
      address: 'Cowley Road',
      city: 'Cambridge',
      postcode: 'CB4 0WS',
      country: 'United Kingdom',
      createdBy: userId,
      customFields: {}
    });

    return Contacts.insert({
      forename: "Testy",
      surname: "Surname",
      email: "testy@surname.com",
      createdBy: userId,
      companyId: companyId
    });
  },

  addProduct: function() {
    var productId = Products.insert({
      name: 'test product',
      description: 'test description',
      createdBy: Meteor.userId()
    });
    return productId;
  },

  addProject: function(additional) {
    var companyId = (additional === true) ? Meteor.call('addCompany', true) : Companies.findOne({})._id,
        name = (additional === true) ? 'Restore Peace to the galaxy' : 'test project',
        description = (additional === true) ? 'Since the Sith took control, the galaxy is an awful place to live.' :
                                              'The purpose of this project is only to serve as an example for the tests.',
        value = (additional === true) ? 10000 : 100;

    var projectId = Projects.insert({
      name: name,
      description: description,
      companyId: companyId,
      userId: Meteor.userId(),
      value: value,
      createdBy: Meteor.userId(),
      projectTypeId: 0,
      projectMilestoneId: 0
    });

    if(name === 'test project') {
      Collections.projects.addTag('Project Tag', {
        _id: projectId
      });
    }

    return projectId;
  },

  addDefaultProjectType: function() {
    var userTenant = Tenants.findOne({});
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

    Tenants.update({
      _id: userTenant._id
    }, {
      $set: {
        "settings.project.types": [projectType]
      }
    });
  },
	addLimitedProjectType: function() {
    var userTenant = Tenants.findOne({});
    var projectType = {
      id: 0,
      name: "Standard Project",
      milestones: []
    };

    Tenants.update({
      _id: userTenant._id
    }, {
      $set: {
        "settings.project.types": [projectType]
      }
    });
  },

  addOpportunity: function(additional) {
    var userTenant = Tenants.findOne({});
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
    Tenants.update(userTenant._id, {
      $set: {
        'settings.opportunity.stages': stages
      }
    });

    var date = new Date();
    var companyId = Meteor.call('addCompany', additional);
    var name = (additional === true) ? 'Destroy Death Star' : 'test opportunity',
        description = (additional === true) ? 'This is no moon!' : 'test description',
        value = (additional === true) ? 5000 : 40;

    var data = Opportunities.insert({
      name: name,
      description: description,
      date: date,
      value: value,
      currentStageId: stage.id,
      companyId: companyId,
      createdBy: Meteor.userId(),
      items: []
    });

    if(name === 'test opportunity') {
      Collections.opportunities.addTag('Opp Tag', {
        _id: data
      });
    }

    return data;
  },

  addPurchaseOrder: function(additional) {

    var name = (additional === true) ? 'Jawa Inc.' : "Test Ltd",
        address = (additional === true) ? 'Banthas Road' : "address",
        city = (additional === true) ? 'Mos Eisley' : "city",
        postcode = (additional === true) ? 'ME1' : "postcode",
        country = (additional === true) ? 'Tatooine' : "country";

    var companyId = Companies.insert({
      name: name,
      address: address,
      city: city,
      postcode: postcode,
      country: country,
      createdBy: Meteor.userId()
    });

    var description = (additional === true) ? 'R2 type Droid' : "Test Purchase Order",
        status = (additional === true) ? 'Approved': 'Requested';

    var data = PurchaseOrders.insert({
      userId: this.userId,
      description: description,
      supplierCompanyId: companyId,
      status: status,
      createdBy: this.userId
    });

    return data;

  },

  addEvent: function() {

    var data = AuditLog.insert({
      token: "P2vxnjD2fgyZvuFNc",
      date: "2015-11-18T10:17:24.346Z",
      source: "client",
      level: "info",
      message: "A new task has been created: test (Company: Test Ltd)",
    });

    return data;
  },

  addOpportunityLineItem: function() {
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
  },

  addRecordsToLimit: function() {
    var Future = Npm.require('fibers/future');
    var done = new Future()
    var control = _.after(MAX_RECORDS, function() {
      done.return(true);
    });
    var nComp = MAX_RECORDS - 20;
    for(var i = 0; i < 20; i++) {
      Meteor.call('addContact', 'Test ' + i, 'Surnamer', function(err, res) {
        control();
      });
    }
    for(var j = 0; j < nComp; j++) {
      Meteor.call('addCompany', 'Test ' + i + ' Ltd', function(err, res) {
        control();
      });
    }
    return done.wait();
  },

  addCompanyTask: function() {
    var companyId = Companies.insert({
      name: "Test Ltd",
      address: "address",
      city: "city",
      postcode: "postcode",
      country: "country",
      createdBy: Meteor.userId()
    });

    var taskId = Tasks.insert({
      title: 'test task',
      description: 'test description',
      assigneeId: Meteor.userId(),
      isAllDay: true,
      dueDate: new Date(),
      entityType: 'company',
      entityId: companyId,
      createdBy: Meteor.userId()
    }, function(err, _id) {
      Collections.tasks.addTag('Company Task', {
        _id: id
      });
    });
    return taskId;
  },

  addContactTask: function() {
    var contactId = Contacts.insert({
      forename: "Obi-Wan",
      surname: "Kenobi",
      email: "obiwan@screwthedarkside.com",
      createdBy: Meteor.userId(),
      customFields: {
        test: {
          dataValue: "velocity",
          dataType: "text"
        }
      }
    });

    var taskId = Tasks.insert({
      title: 'test task',
      description: 'test description',
      assigneeId: Meteor.userId(),
      isAllDay: true,
      dueDate: moment().add(7, 'days').toDate(),
      entityType: 'contact',
      entityId: contactId,
      createdBy: Meteor.userId()
    });
    return taskId;
  },

  addOpportunityTask: function() {
    var userTenant = Tenants.findOne({});
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
    Tenants.update(userTenant._id, {
      $set: {
        'settings.opportunity.stages': stages
      }
    });

    var date = new Date();
    var companyId = Companies.insert({
      name: "Test Task Ltd",
      address: "address",
      city: "city",
      postcode: "postcode",
      country: "country",
      createdBy: Meteor.userId()
    });

    var oppId = Opportunities.insert({
      name: 'Test opportunity for Task',
      description: 'test description',
      date: date,
      value: 100,
      currentStageId: stage.id,
      companyId: companyId,
      createdBy: Meteor.userId(),
      items: []
    });

    var taskId = Tasks.insert({
      title: 'test task',
      description: 'test description',
      assigneeId: Meteor.userId(),
      isAllDay: true,
      dueDate: new Date(),
      entityType: 'opportunity',
      entityId: oppId,
      createdBy: Meteor.userId()
    });
    return taskId;
  },

  addProjectTask: function() {
    var companyId = Companies.insert({
      name: "Test Task Ltd",
      address: "address",
      city: "city",
      postcode: "postcode",
      country: "country",
      createdBy: Meteor.userId()
    });

    var projectId = Projects.insert({
      name: 'test project for task',
      companyId: companyId,
      userId: Meteor.userId(),
      value: 200,
      createdBy: Meteor.userId(),
      projectTypeId: 0,
      projectMilestoneId: 0
    });

    var taskId = Tasks.insert({
      title: 'test task',
      description: 'test description',
      assigneeId: Meteor.userId(),
      isAllDay: true,
      dueDate: new Date(),
      entityType: 'project',
      entityId: projectId,
      createdBy: Meteor.userId()
    });
    return taskId;
  }
});
