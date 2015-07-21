// For documentation see
// https://github.com/percolatestudio/meteor-migrations

Migrations.add({
   version: 1,
   name: "Adds activityTimestamp to existing activities",
   up: function() {
     ServerSession.set('maintenance', true);
     Partitioner.directOperation(function() {
       Activities.find( { activityTimestamp: null } ).forEach(
         function(doc) {
           Activities.update(doc._id, {$set: {activityTimestamp: doc.createdAt}});
         }
       );
     });
     ServerSession.set('maintenance', false);
   }
});

Migrations.add({
   version: 2,
   name: "Adds createdAt to existing tenants and users",
   up: function() {
     ServerSession.set('maintenance', true);
     var date = new Date();
     Meteor.users.find( { createdAt: null } ).forEach(
       function(doc) {
         Meteor.users.update(doc._id, {$set: {createdAt: date}});
       }
     );
     Tenants.find( { createdAt: null } ).forEach(
       function(doc) {
         Tenants.update(doc._id, {$set: {createdAt: date}});
       }
     );
     ServerSession.set('maintenance', false);
   }
});

Migrations.add({
  version: 3,
  name: "Adds _groupId to tasks created before collection was partitioned",
  up: function() {
    ServerSession.set('maintenance', true);
    Partitioner.directOperation(function() {
      Tasks.find( { _groupId: { $exists: false } } ).forEach(
        function(doc) {
          var userGroup = Partitioner.getUserGroup(doc.createdBy);
          Tasks.update(
            doc._id,
            {$set: {_groupId: userGroup}},
            {filter: false, validate: false}
          );
        }
      );
    });
    ServerSession.set('maintenance', false);
  }
});
