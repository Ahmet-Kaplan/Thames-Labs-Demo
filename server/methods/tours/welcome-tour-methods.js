Meteor.methods({

  'welcomeTour.createDemoCompany': function() {
    var user = Meteor.users.findOne({
      _id: this.userId
    });

    return Partitioner.bindGroup(user.group, function() {
      return Companies.insert({
        name: 'Realtime Tours, Inc.',
        createdBy: user._id
      });
    });
  }

});
