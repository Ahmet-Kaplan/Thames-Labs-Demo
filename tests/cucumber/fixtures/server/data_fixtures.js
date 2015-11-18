Meteor.methods({

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
    var stage = OpportunityStages.insert({
      title: 'Stage 1',
      description: 'test description',
      order: 0
    });
    OpportunityStages.insert({
      title: 'Stage 2',
      description: 'test description',
      order: 1
    });
    var stage = OpportunityStages.findOne({
      order: 0
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
      currentStageId: stage._id,
      companyId: companyId,
      createdBy: Meteor.userId(),
      items: []
    });
    return data;
  },

  addPurchaseOrder: function() {

    var data = PurchaseOrders.insert({
      userId: this.userId,
      description: "Test Purchase Order",
      supplierCompanyId: "Test Ltd",
      status: "Requested",
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
  for(var i = 0; i < MAX_RECORDS / 2; i++) {
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
      "forename": "Testy",
      "surname": "Surname",
      "email": "testy@surname.com",
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
    var stage = OpportunityStages.insert({
      title: 'Stage 1',
      description: 'test description',
      order: 0
    });
    OpportunityStages.insert({
      title: 'Stage 2',
      description: 'test description',
      order: 1
    });
    var stage = OpportunityStages.findOne({order: 0});
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
      currentStageId: stage._id,
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
