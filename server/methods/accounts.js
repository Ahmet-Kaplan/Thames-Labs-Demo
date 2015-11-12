Meteor.methods({

  'accounts.checkGoogleService': function() {
    return Partitioner.directOperation(function() {
      var user = Meteor.users.findOne({
        _id: this.userId
      });
      if (user) {
        if (user.services === undefined || user.services.google === undefined) {
          return false;
        }
        return true;
      }
      return false;
    });
  },

});

AccountsMerge.onMerge = function(winner, loser) {
  Partitioner.directOperation(function() {
    var user = Meteor.users.findOne({
      _id: winner._id
    });

    var group = user.group;
    Partitioner.setUserGroup(loser._id, group);
    Partitioner.bindGroup(group, function() {
      Meteor.users.remove(loser._id);
    });
  })
};
