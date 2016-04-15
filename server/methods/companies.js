Meteor.methods({
	'company.checkExistsByName': function(companyName) {
		var user = Meteor.users.findOne({
			_id: this.userId
		});
		var company = Companies.findOne({
			name: companyName,
			_groupId: user.group
		});
		if (company) return true;
		return false;

	},
	'company.getMergeTargets': function(companyId) {
		return Companies.find({
			_id: {
				$ne: companyId
			}
		}, {
			fields: {
				name: 1
			}
		}).fetch();
	}
});