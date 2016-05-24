export function reset() {
  // We call this before EVERY test scenario and at the end of all features
  // It should completely reset the app for test tenants

  // Remove test tenants
  var testTenants = Tenants.find({
    name: { $in: ['Acme Corp', 'Acme Corp Rivals'] }
  });
  _.each(testTenants.fetch(), function(testTenant) {
    const tenantId = testTenant._id;
    // First remove all associated data
    // N.B. we don't need directOperation() as we're already using "direct" to bypass any collection hooks
    // TODO: Ideally this would use bindGroup() but if we then use "direct" it bypasses the partitioner
    Tasks.direct.remove({ _groupId: tenantId });
    Activities.direct.remove({ _groupId: tenantId });
    Meteor.tags.direct.remove({ _groupId: tenantId });
    AuditLog.direct.remove({ _groupId: tenantId });
    Companies.direct.remove({ _groupId: tenantId });
    Contacts.direct.remove({ _groupId: tenantId });
    Projects.direct.remove({ _groupId: tenantId });
    PurchaseOrders.direct.remove({ _groupId: tenantId });
    PurchaseOrderItems.direct.remove({ _groupId: tenantId });
    Chatterbox.direct.remove({ _groupId: tenantId });
    Products.direct.remove({ _groupId: tenantId });

    // N.B. Users uses field "group" rather than "_groupId"!
    Meteor.users.direct.remove({ group: tenantId });

    // Now remove tenant
    Tenants.direct.remove({_id: tenantId});
  });

  // Remove items in unpartitioned collections
  Notifications.direct.remove({});

  // Reset server session variables. At the moment (annoyingly)
  // we can't do something like Mongo.serversession.remove({}) because we have
  // no handle to the collection and meteor doesn't allow us to look up a
  // collection from the mongo name
  ServerSession.set('maintenance', false);
}
