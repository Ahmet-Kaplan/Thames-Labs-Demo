Migrations.add({
  version: 20,
  name: "It's dangerous to go alone.....",
  up: function() {
    ServerSession.set('maintenance', true);
    console.log('.....take this *DO-DO-DO-DOOOO*');
    ServerSession.set('maintenance', false);
  }
});

Migrations.add({
  version: 23,
  name: "Fix sequencing system",
  up: function() {
    ServerSession.set('maintenance', true);

    var tenants = Tenants.find({}).fetch();

    _.each(tenants, function(tenant) {
      Partitioner.bindGroup(tenant._id, function() {
        var companyCount = Companies.find({
          sequencedIdentifier: {
            $exists: true
          }
        }).count();
        var contactCount = Contacts.find({
          sequencedIdentifier: {
            $exists: true
          }
        }).count();
        var opportunitiesCount = Opportunities.find({
          sequencedIdentifier: {
            $exists: true
          }
        }).count();
        var projectCount = Projects.find({
          sequencedIdentifier: {
            $exists: true
          }
        }).count();
        var purchaseOrderCount = PurchaseOrders.find({
          sequencedIdentifier: {
            $exists: true
          }
        }).count();
        var productCount = Products.find({
          sequencedIdentifier: {
            $exists: true
          }
        }).count();

        Tenants.update({
          _id: tenant._id
        }, {
          $set: {
            'settings.company.defaultNumber': companyCount,
            'settings.contact.defaultNumber': contactCount,
            'settings.opportunity.defaultNumber': opportunitiesCount,
            'settings.project.defaultNumber': projectCount,
            'settings.purchaseorder.defaultNumber': purchaseOrderCount,
            'settings.product.defaultNumber': productCount,
          }
        });

        var pos = PurchaseOrders.find({
          sequencedIdentifier: {
            $exists: true
          }
        }).fetch();
        var prefix = tenant.settings.purchaseorder.defaultPrefix;
        _.each(pos, function(po) {
          if (po.sequencedIdentifier) {
            if (po.sequencedIdentifier.indexOf('undefined') > -1) {
              var newID = po.sequencedIdentifier.replace('undefined', prefix);
              PurchaseOrders.update({
                _id: po._id
              }, {
                $set: {
                  sequencedIdentifier: newID
                }
              });
            }
          }
        });
      });
    });
  }
});