//////////////////////
// COLLECTION HOOKS //
//////////////////////

Meteor.users.before.insert(function(userId, doc) {
  doc.createdAt = new Date();
});
