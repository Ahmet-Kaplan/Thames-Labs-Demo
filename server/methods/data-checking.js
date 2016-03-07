Meteor.methods({
  tenantLimitReached: function() {
    var tenantId = Partitioner.getUserGroup(this.userId);
    var theTenant = Tenants.findOne({
      _id: tenantId
    });
    var textMessage = "The tenant " + theTenant.name + " (id " + tenantId + ") has reached the limit of records, and their account has been blocked from creating new ones.\n\n" +
      "Please consider contacting them to discuss an upgrade.";
    Email.send({
      to: 'david.mcleary@cambridgesoftware.co.uk',
      from: 'RealTimeCRM <admin@realtimecrm.co.uk>',
      subject: 'Tenant ' + theTenant.name + ' has reached the records limit',
      text: textMessage
    });
  },
  updateTotalRecords: function() {
    var tenantId = Partitioner.getUserGroup(this.userId);
    var totalRecords = Companies.find().count() + Contacts.find().count() + Opportunities.find().count() + Projects.find().count() + PurchaseOrders.find().count();

    Tenants.update(tenantId, {
      $set: {
        "stripe.totalRecords": totalRecords
      }
    });
  }
});