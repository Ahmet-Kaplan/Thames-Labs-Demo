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

//////////////////////
// COLLECTION HOOKS //
//////////////////////

Meteor.users.before.insert(function(userId, doc) {
  doc.createdAt = new Date();
});
