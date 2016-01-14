Meteor.methods({

  'welcomeTour.createDemoCompany': function() {
    return Partitioner.bindUserGroup(this.userId, () => {
      return Companies.insert({
        name: 'Realtime Tours, Inc.',
        createdBy: this.userId
      });
    });
  },

  'welcomeTour.deleteTourData': function() {
    Partitioner.bindUserGroup(this.userId, () => {
      Companies.remove({
        name: 'Realtime Tours, Inc.'
      });
    });
  }

});