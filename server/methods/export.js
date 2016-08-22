Meteor.methods({

  'search.dataDump': function() {
    var collections = ['activities', 'companies', 'contacts', 'opportunities', 'projects', 'products', 'purchaseorders', 'tasks', 'eventLog'];
    var dataArray = [];
    var user = Meteor.users.findOne({
      _id: this.userId
    });

    if (!user) return;

    _.each(collections, function(c) {
      var res = Collections[c].find({
        _groupId: user.group
      }).fetch();

      var data = {
        name: c,
        data: res
      };
      dataArray.push(data);
    });

    return dataArray;
  }

});
