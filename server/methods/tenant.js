Meteor.methods({
  'tenant.getPayingUsers': function() {
    var tenants = Tenants.find({
      plan: 'pro',
      'stripe.stripeSubs': {
        $exists: true
      }
    }).fetch();

    var userCount = 0;
    _.each(tenants, function(t) {
      userCount += Meteor.users.find({
        group: t._id
      }).fetch().length;
    });

    return userCount;
  },
  'tenant.getUsersForTenants': function(plan) {
    var tenants = Tenants.find({
      plan: plan
    }).fetch();

    var userCount = 0;
    _.each(tenants, function(t) {
      userCount += Meteor.users.find({
        group: t._id
      }).fetch().length;
    });

    return userCount;
  },
  'tenant.remove': function(tenantId) {
    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      throw new Meteor.Error(403, 'Only superadmins may completely delete a tenant');
    }

    if (!tenantId) return 'Tenant ID not supplied';
    var tenant = Tenants.findOne({
      _id: tenantId
    });
    if (!tenant) return 'Tenant not found';
    try {
      Partitioner.bindGroup(tenantId, function() {
        console.log('Deleting tasks...');
        Tasks.remove({});
        console.log('Deleting tags...');
        Meteor.tags.remove({});
        console.log('Deleting events...');
        //EventLog is not partitioned
        EventLog.remove({
          group: tenantId
        });
        console.log('Deleting companies...');
        Companies.remove({});
        console.log('Deleting contacts...');
        Contacts.remove({});
        console.log('Deleting opportunities...');
        Opportunities.remove({});
        console.log('Deleting projects...');
        Projects.remove({});
        console.log('Deleting purchase order items...');
        PurchaseOrderItems.remove({});
        console.log('Deleting purchase orders...');
        PurchaseOrders.remove({});
        console.log('Deleting chatter...');
        Chatterbox.remove({});
        console.log('Deleting products...');
        Products.remove({});
        console.log('Deleting activities...');
        Activities.remove({});
      });

      console.log('Deleting users...');
      Meteor.users.remove({
        group: tenantId
      });

      console.log('Deleting tenant...');
      Tenants.remove({
        _id: tenantId
      });
    } catch (err) {
      console.log(err);
      return 'Error during tenant removal: ' + err;
    }

    return true;
  },
  setTenantDeletionFlag: function(val) {
    if (!Roles.userIsInRole(this.userId, ['superadmin'])) {
      return;
    }
    ServerSession.set('deletingTenant', val);
  },
  'tenant.getExportData': function(tenantName) {
    var tenant = Tenants.findOne({name: tenantName});

    return Partitioner.bindGroup(tenant._id, function() {
      var data = {
        name: tenant.name,
        createdAt: moment(tenant.createdAt).format('DD/MM/YYYY HH:mm'),
        plan: tenant.plan,
        companies: Companies.find({_groupId: tenant._id}).count(),
        contacts: Contacts.find({_groupId: tenant._id}).count(),
        opportunities: Opportunities.find({_groupId: tenant._id}).count(),
        projects: Projects.find({_groupId: tenant._id}).count(),
        products: Products.find({_groupId: tenant._id}).count(),
        purchaseOrders: PurchaseOrders.find({_groupId: tenant._id}).count(),
        activities: Activities.find({_groupId: tenant._id}).count(),
        tasks: Tasks.find({_groupId: tenant._id}).count(),
        currency: tenant.settings.currency,
        coupon: (tenant.stripe && tenant.stripe.coupon ? tenant.stripe.coupon : '')
      };
      return data;
    });
  }
});
