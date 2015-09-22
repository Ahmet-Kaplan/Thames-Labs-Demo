Meteor.methods({
  tenantLimitReached: function() {
    var tenantId = Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({_id: tenantId});
    var textMessage = "The tenant " + theTenant.name + " (id " + tenantId + ") has reached the limit of records.\n\n" +
                      "Please consider contacting them or blocking their ability to create records.";
    Email.send({
      to: 'david.mcleary@cambridgesoftware.co.uk',
      from: 'admin@realtimecrm.co.uk',
      subject: 'Tenant ' + theTenant.name + ' has reached the records limit',
      text: textMessage
    });
  },
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
