Meteor.methods({

  // We call this before EVERY test scenario - it should completely reset the app
  reset: function() {

    // Reset unpartitioned collections
    Tenants.remove({});
    Meteor.users.remove({});
    Notifications.remove({});
    AuditLog.remove({});

    // Reset partitioned collections
    Partitioner.directOperation(function() {
      Companies.remove({});
      Contacts.remove({});
      Activities.remove({});
      Projects.remove({});
      PurchaseOrders.remove({});
      PurchaseOrderItems.remove({});
      Chatterbox.remove({});
      Meteor.tags.remove({});
      Tasks.remove({});
      Products.remove({});
    });

    // Reset server session variables. At the moment (annoyingly)
    // we can't do something like Mongo.serversession.remove({}) because we have
    // no handle to the collection and meteor doesn't allow us to look up a
    // collection from the mongo name
    ServerSession.set('maintenance', false);

  }

});
