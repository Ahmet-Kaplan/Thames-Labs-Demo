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