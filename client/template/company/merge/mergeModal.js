Template.mergeModal.onCreated(function() {
	var currentCompany = this.data;

	this.autorun(() => {
		var companies = ReactiveMethod.call('company.getMergeTargets', currentCompany._id, function(err, res) {
			if (err) throw new Meteor.Error(err);
			return res;
		});
		if (companies) {
			var options = _.map(companies, function(cmp) {
				return {
					value: cmp._id,
					text: cmp.name
				}
			});

			$('#select-entity').selectize({
				create: false,
				allowEmptyOption: false,
				options: options
			});
		}
	});
});

Template.mergeModal.onRendered(function() {

});

Template.mergeModal.onDestroyed(function() {

});

Template.mergeModal.helpers({

});

Template.mergeModal.events({
	'change #select-entity': function(event, template) {
		var selectedCompany = $('#select-entity').val();
		console.log(selectedCompany);
	}
});