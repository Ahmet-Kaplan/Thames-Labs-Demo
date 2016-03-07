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

		//check tenant pay status and handle accordingly here

		try {
			Partitioner.bindGroup(tenantId, function() {
				Tasks.remove({});
				Activities.remove({});
				Meteor.tags.remove({});
				AuditLog.remove({});
				Companies.remove({});
				Contacts.remove({});
				Opportunities.remove({});
				Projects.remove({});
				PurchaseOrders.remove({});
				PurchaseOrderItems.remove({});
				Chatterbox.remove({});
				Products.remove({});
			});

			Meteor.users.remove({
				group: tenantId
			});

			Tenants.remove({
				_id: tenantId
			});
		} catch (err) {
			return 'Error during tenant removal: ' + err;
		}

		return true;
	}
});