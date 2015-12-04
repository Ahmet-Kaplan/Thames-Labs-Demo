Meteor.methods({

  // We call this before EVERY test scenario - it should completely reset the app
  reset: function() {

    // Reset unpartitioned collections
    Tenants.direct.remove({});
    Meteor.users.direct.remove({});
    Notifications.direct.remove({});

    // Reset partitioned collections
    Partitioner.directOperation(function() {
      //Entities dependent on other entities should be first
      Tasks.direct.remove({});
      Activities.direct.remove({});
      Meteor.tags.direct.remove({});
      AuditLog.direct.remove({});
      Companies.direct.remove({});
      Contacts.direct.remove({});
      Projects.direct.remove({});
      PurchaseOrders.direct.remove({});
      PurchaseOrderItems.direct.remove({});
      Chatterbox.direct.remove({});
      Products.direct.remove({});
    });

    // Reset server session variables. At the moment (annoyingly)
    // we can't do something like Mongo.serversession.remove({}) because we have
    // no handle to the collection and meteor doesn't allow us to look up a
    // collection from the mongo name
    ServerSession.set('maintenance', false);

  }
});
