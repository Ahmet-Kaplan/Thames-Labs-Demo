Meteor.methods({
  updateTotalRecords: function() {
    var tenantId = Partitioner.getUserGroup(this.userId);
    var totalRecords = Companies.find().count() + Contacts.find().count();

    Tenants.update(tenantId, {
            $set: {
              "stripe.totalRecords": totalRecords
            }
    });
}
});
