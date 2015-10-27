Meteor.methods({
  'search.export': function(searchDefinition, searchOptions) {
    searchOptions.limit = 99999;
    var result = CompaniesIndex.search(searchDefinition, searchOptions).fetch();
    return result;
  }
});
