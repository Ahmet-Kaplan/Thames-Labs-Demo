Meteor.methods({
  'searchByCollection': (collectionName, query, options) => {
    return Collections[collectionName].index.search(
      query,
      options
    ).fetch();
  }
});
