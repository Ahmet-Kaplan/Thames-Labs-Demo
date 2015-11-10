Meteor.users.helpers({
  name: function() {
    return Meteor.users.findOne(this._id).profile.name
  }
});

Collections.users = Meteor.users;

Collections.users.subscriptionById = 'allUserData';

////////////////////
// SEARCH INDICES //
////////////////////
Collections.users.index = UsersIndex = new EasySearch.Index({
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
    },
    selector: function(searchObject, options, aggregation) {
      var selector = this.defaultConfiguration().selector(searchObject, options, aggregation);
      if (options.search.props.searchById) {
        selector._id = options.search.props.searchById;
      }
      console.log(selector)
      return selector;
    }
  })
});

//////////////////////
// COLLECTION HOOKS //
//////////////////////

Meteor.users.before.insert(function(userId, doc) {
  doc.createdAt = new Date();
});
