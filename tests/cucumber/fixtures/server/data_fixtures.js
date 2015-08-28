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
      createdBy: userId
    }, function(err) {
      if(err) {
        console.log(err)
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

  'addOpportunityStages': function(stage) {
    OpportunityStages.insert({
      title: 'Stage 1',
      description: 'test description',
      order: 0
    });
    var data = OpportunityStages.insert({
      title: 'Stage 2',
      description: 'test description',
      order: 1
    });
    return data;
  },

  'addOpportunity': function() {
    var stage = OpportunityStages.findOne({order: 0});
    var date = new Date();
    var companyId = Companies.insert({
      name: "companyName",
      address: "address",
      city: "city",
      postcode: "postcode",
      country: "country",
      createdBy: Meteor.userId()
    });
    var itemId = Random.id();
    var data = Opportunities.insert({
      name: 'test opportunity',
      description: 'test description',
      date: date,
      value: 0,
      currentStageId: stage._id,
      companyId: companyId,
      createdBy: Meteor.userId(),
      items: [
        {
          name: "testLine",
          description: "testDescription",
          id: itemId
        }
      ]
    });
    return data;
  }
});
