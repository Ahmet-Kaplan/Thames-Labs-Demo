Template.updateFavourite.onRendered(function() {
	$('#favouriteName').val(this.data.name);
});

Template.updateFavourite.events({
	'click #update-favourite': function(event, template) {
		if ($('#favouriteName').val() === "") {
			toastr.warning('Please enter a name.');
			return;
		}

		var profile = Meteor.users.findOne(Meteor.userId()).profile;

		var favList = profile.favourites;
		var index = -1;

		for (i = 0; i < favList.length; i++) {
			if (favList[i].url === this.url) {
				index = i;
				break;
			}
		}
		if (index > -1) {
			favList[index].name = $('#favouriteName').val();

			profile.favourites = favList;

			Meteor.users.update(Meteor.userId(), {
				$set: {
					profile: profile
				}
			});

			toastr.success('Favourite changed successfully.');
			Modal.hide();
		}
	}
});