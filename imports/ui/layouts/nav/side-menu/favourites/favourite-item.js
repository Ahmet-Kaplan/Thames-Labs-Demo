import './favourite-item.html';
import './modals/update-favourite-modal.js';
import bootbox from 'bootbox';

Template.favouriteItem.events({
  'click .edit-favourite': function() {
    Modal.show('updateFavourite', this);
  },
  'click .remove-favourite': function() {

    bootbox.confirm("Are you sure you wish to delete this favourite?", (result) => {
      if (result === true) {

        var profile = Meteor.users.findOne(Meteor.userId()).profile;

        var favList = profile.favourites;
        var index;

        for (i = 0; i < favList.length; i++) {
          if (favList[i].url === this.url) {
            index = i;
            break;
          }
        }

        if (index > -1) {
          favList.splice(index, 1);
          profile.favourites = favList;
        }

        Meteor.users.update(Meteor.userId(), {
          $set: {
            profile: profile
          }
        });

        bootbox.hideAll();
      }
    });


  }
});