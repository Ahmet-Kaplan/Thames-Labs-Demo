Meteor.methods({

  addCompany: function(name) {
    var companyName = name || 'Test Ltd',
      address = 'Cowley Road',
      city = 'Cambridge',
      postcode = 'CB4',
      country = 'United Kingdom',
      userId = Meteor.userId();

    var data = Companies.insert({
      name: companyName,
      address: address,
      city: city,
      postcode: postcode,
      country: country,
      createdBy: userId,
      customFields: {}
    });

    console.log(data);
    return data;

  },

  addContact: function() {
    var userId = Meteor.userId();
    return Contacts.insert({
      "forename": "Testy",
      "surname": "Surname",
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
    // console.log(companyId);
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
    var projectId = Projects.insert({
      description: 'test project',
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

  addOpportunityLineItem: function() {
    var opp = Opportunities.findOne({});
    Opportunities.update(opp._id, {
      $push: {
        items: {
          id: Random.id(),
          name: "lineItem1"
        }
      }
    });
    return opp;
  }
});
