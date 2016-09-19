Meteor.methods({
  'searchByCollection': (collectionName, query, options) => {
    if (!Collections[collectionName]) {
      throw new Meteor.Error('500', 'Collection ' + collectionName + ' not found');
    }
    if (!Collections[collectionName].index) {
      throw new Meteor.Error('500', 'Index for collection ' + collectionName + ' not found');
    }

    return Collections[collectionName].index.search(
      query,
      options
    ).fetch();
  }
});
