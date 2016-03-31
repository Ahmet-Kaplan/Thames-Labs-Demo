// Migrations.add({
//   version: 23,
//   name: "Adds activityTimestamp to existing activities",
//   up: function() {
//     ServerSession.set('maintenance', true);

//     // MIGRATION CODE

//     ServerSession.set('maintenance', false);
//   }
// });

Migrations.add({
  version: 1,
  name: "Does absolutely nowt (to keep Circle happy)",
  up: function() {
    ServerSession.set('maintenance', true);

    // MIGRATION CODE

    ServerSession.set('maintenance', false);
  }
});