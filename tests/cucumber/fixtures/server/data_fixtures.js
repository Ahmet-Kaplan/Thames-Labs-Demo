Meteor.methods({

  addCompany: function(name) {
    var companyName = name || 'Test Ltd',
        address = 'Cowley Road',
        city = 'Cambridge',
        postcode = 'CB4',
        country = 'United Kingdom',
        userId = Meteor.userId();

    return Companies.insert({
      name: companyName,
      address: address,
      city: city,
      postcode: postcode,
      country: country,
      createdBy: userId,
      customFields: {
        test: {
          dataValue: "velocity",
          dataType: "text"
        }
      }
    });
  },

  addProduct: function() {
    var data = Products.insert({
      name: 'test product',
      description: 'test description',
      createdBy: Meteor.userId()
    });
    return data;
  },

  'addOpportunity': function() {
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

  'addOpportunityLineItem': function() {
    var opp = Opportunities.findOne({});
    Opportunities.update(opp._id, {$push: {items: {
      id: Random.id(),
      name: "lineItem1"
    }}});
    return opp;
  }
});
