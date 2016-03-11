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

	}
})