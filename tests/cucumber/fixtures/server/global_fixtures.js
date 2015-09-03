Meteor.methods({

  // We call this before EVERY test scenario - it should completely reset the app
  reset: function() {

    // Reset unpartitioned collections
    Tenants.remove({});
    Meteor.users.remove({});
    Notifications.remove({});

    // Reset partitioned collections
    Partitioner.directOperation(function() {
      //Entities dependent on other entities should be first
      Tasks.remove({});
      Activities.remove({});
      Meteor.tags.remove({});
      AuditLog.remove({});

      Companies.remove({});
      Contacts.remove({});
      Projects.remove({});
      PurchaseOrders.remove({});
      PurchaseOrderItems.remove({});
      Chatterbox.remove({});
      Products.remove({});
    });

    // Reset server session variables. At the moment (annoyingly)
    // we can't do something like Mongo.serversession.remove({}) because we have
    // no handle to the collection and meteor doesn't allow us to look up a
    // collection from the mongo name
    ServerSession.set('maintenance', false);

  }
});
