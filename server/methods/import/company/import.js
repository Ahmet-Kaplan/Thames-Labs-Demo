Meteor.methods({
  'data.importCompaniesFromArray': function(parsedData) {
    var errorList = [];
    var user = Meteor.users.findOne({
      _id: this.userId
    });

    if (user) {
      if (Array.isArray(parsedData)) {

        Partitioner.bindGroup(user.group, function() {
          _.each(parsedData, function(c) {
            try {
              Companies.insert(c);
            } catch (e) {
              errorList.push(e);
            }
          });
        });

      }

      return errorList;
    }
  }
});
