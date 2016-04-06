Template.contactAdminPanel.onRendered(function() {
	var tenant = Tenants.findOne({
		_id: Meteor.user().group
	});
	if (tenant) {
		var options = [];
		var items = [];
		if (tenant.settings.contact.titles) {
			items = tenant.settings.contact.titles.split(',');
			options = _.map(tenant.settings.contact.titles.split(','), function(input) {
				return {
					value: input,
					text: input
				}
			});
		}

		this.$("#contactAdminTitles").selectize({
			create: function(input) {
				return {
					value: input,
					text: input
				}
			},
			items: items,
			options: options
		});
	}
});

Template.contactAdminPanel.events({
	'click #contactAdminUpdateTitles': function(event, template) {
		var values = $('#contactAdminTitles').selectize().val();

		Tenants.update({
			_id: Meteor.user().group
		}, {
			$set: {
				'settings.contact.titles': values
			}
		});

	}
});