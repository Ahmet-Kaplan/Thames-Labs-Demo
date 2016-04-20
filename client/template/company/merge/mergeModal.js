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
	'click #initiateMerge': function(event, template) {
		var deleteRecord = $('#cbDelete').prop('checked');
		var companyId = this._id;
		var targetCompanyId = $('#select-entity').val();
		Meteor.call('company.findById', targetCompanyId, function(err, res) {
			if (res) targetName = res;
		});

		if (targetCompanyId === "") {
			toastr.warning('Please select a target company');
			return;
		}

		bootbox.confirm("Are you sure you wish to merge these companies? This action cannot be undone.", function(result) {
			if (result === true) {
				Meteor.call('company.merge', companyId, targetCompanyId, deleteRecord, function(err, res) {
					if (err) throw new Meteor.Error(err);

					if (res) {
						if (res === 0) {
							toastr.success('Merge successful.')
							Modal.hide();
						} else {
							toastr.error(res.source + ": " + res.error)
						}
					}

				});
			}
		});
	}
});