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
