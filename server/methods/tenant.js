Meteor.methods({
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
				AuditLog.remove({});
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
});