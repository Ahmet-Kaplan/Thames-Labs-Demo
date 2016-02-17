Meteor.methods({
  'search.export': function(collectionName, searchDefinition, searchOptions) {
    if (!Collections[collectionName] || !Collections[collectionName].index) {
      throw new Meteor.Error('500', 'Search index not found');
    }
    searchOptions.limit = 99999;
    if (!searchOptions.props) searchOptions.props = {};
    searchOptions.props.export = true;
    var index = Collections[collectionName].index;
    var result = index.search(searchDefinition, searchOptions).fetch();
    return result;
  },
  'search.dataDump': function() {
    var collections = ['activities', 'companies', 'contacts', 'opportunities', 'projects', 'products', 'purchaseorders', 'tasks', 'auditLog'];
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
      }
      dataArray.push(data);
    });

    return dataArray;
  }
});