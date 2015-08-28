Meteor.methods({

  addCompany: function(name) {
    var companyName = name || 'Test Ltd',
        address = 'Cowley Road',
        city = 'Cambridge',
        postcode = 'CB4',
        country = 'United Kingdom',
        userId = Meteor.users.findOne({})._id;

    Companies.insert({
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
  }

});
