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
    var companyName = name || 'Test Ltd',
      address = 'Cowley Road',
      city = 'Cambridge',
      postcode = 'CB4',
      country = 'United Kingdom',
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

    return data;

  },

  addContact: function(forename, surname) {
    var contactForename = forename || 'Testy',
      contactSurname = surname || 'Surname',
      userId = Meteor.userId();
    return Contacts.insert({
      "forename": contactForename,
      "surname": contactSurname,
      "email": "testy@surname.com",
      "createdBy": userId,
      "customFields": {}
    });
  },

  addContactForCompany: function() {
    var companyId = Companies.insert({
      name: "Test Ltd",
      address: "address",
      city: "city",
      postcode: "postcode",
      country: "country",
      createdBy: Meteor.userId()
    });

    return Contacts.insert({
      forename: "Testy",
      surname: "Surname",
      email: "testy@surname.com",
      createdBy: Meteor.userId(),
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

  addProject: function() {
    var companyId = Companies.findOne({})._id;
    var projectId = Projects.insert({
      name: 'test project',
      description: 'The purpose of this project is only to serve as an example for the tests.',
      companyId: companyId,
      userId: Meteor.userId(),
      value: 100,
      createdBy: Meteor.userId()
    });
    return projectId;
  },

  addOpportunity: function() {
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
      name: "Test Ltd",
      address: "address",
      city: "city",
      postcode: "postcode",
      country: "country",
      createdBy: Meteor.userId()
    });
    //  var itemId = Random.id();
    var data = Opportunities.insert({
      name: 'test opportunity',
      description: 'test description',
      date: date,
      value: 0,
      currentStageId: stage.id,
      companyId: companyId,
      createdBy: Meteor.userId(),
      items: []
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
    for (var i = 0; i < MAX_RECORDS / 2; i++) {
      Meteor.call('addContact', 'Test ' + i, 'Surnamer');
      Meteor.call('addCompany', 'Test ' + i + ' Ltd');
    }

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
    });
    return taskId;
  },

  addContactTask: function() {
    var contactId = Contacts.insert({
      "title": "Mr",
      "forename": "Obi-Wan",
      "surname": "Kenobi",
      "email": "obiwan@screwthedarkside.com",
      "createdBy": Meteor.userId(),
      "customFields": {
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
      dueDate: new Date(),
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
      name: "Test Ltd",
      address: "address",
      city: "city",
      postcode: "postcode",
      country: "country",
      createdBy: Meteor.userId()
    });

    var oppId = Opportunities.insert({
      name: 'test opportunity',
      description: 'test description',
      date: date,
      value: 0,
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
      name: "Test Ltd",
      address: "address",
      city: "city",
      postcode: "postcode",
      country: "country",
      createdBy: Meteor.userId()
    });

    var projectId = Projects.insert({
      name: 'test project',
      companyId: companyId,
      userId: Meteor.userId(),
      value: 100,
      createdBy: Meteor.userId()
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
