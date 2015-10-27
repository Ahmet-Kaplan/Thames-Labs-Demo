////////////////////
// SEARCH INDICES //
////////////////////

UsersIndex = new EasySearch.Index({
  collection: Meteor.users,
  fields: ['profile.name', '_id'],
  engine: new EasySearch.MongoDB({
    fields: (searchObject, options) => {
      return {
        'profile.name': 1
      }
    },
    transform: (doc) => {
      doc.name = doc.profile.name;
      return doc;
    }
  })
});

// EasySearch.createSearchIndex('autosuggestUser', {
//   field: ['_id', 'profile.name'],
//   collection: Meteor.users,
//   limit: 10,
//   use: 'mongo-db',
//   query: function(searchString) {
//     var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);
//     var tenantId = Meteor.users.findOne({}).group;
//
//     if (tenantId) {
//       query.group = {
//         $eq: tenantId
//       };
//     } else {
//       return false;
//     }
//
//     return query;
//   },
//   returnFields: ['_id', 'profile.name'],
//   changeResults: function(data) {
//     data.results = _.map(data.results, function(result) {
//       return {
//         _id: result._id,
//         name: result.profile.name
//       };
//     });
//     return data;
//   }
// });

//////////////////////
// COLLECTION HOOKS //
//////////////////////

Meteor.users.before.insert(function(userId, doc) {
  doc.createdAt = new Date();
});
